import mongoose from 'mongoose';
import User from '../models/User.js';
import Work from '../models/Work.js';

export const purchaseWorksService = async (userId, workIds) => {
  if (!workIds || !Array.isArray(workIds) || workIds.length === 0) {
    throw new Error('No works selected for purchase.');
  }

  if (workIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
    throw new Error('Invalid work IDs format.');
  }

  const [user, works] = await Promise.all([
    User.findById(userId),
    Work.find({ _id: { $in: workIds } }).populate('author'),
  ]);

  if (!user) throw new Error('User not found.');

  if (works.length !== workIds.length) {
    const foundIds = works.map(w => w._id.toString());
    const missingIds = workIds.filter(id => !foundIds.includes(id));
    const err = new Error('Some works not found.');
    err.missingWorks = missingIds;
    throw err;
  }

  // Фильтруем работы, которых ещё нет у пользователя
  const newWorks = works.filter(work =>
    !user.works.some(userWorkId => userWorkId.equals(work._id))
  );

  if (newWorks.length === 0) {
    throw new Error('You already own all selected works.');
  }

  user.works.push(...newWorks.map(work => work._id));
  await user.save();

  // Обновляем профили продавцов, удаляя проданные работы
  const sellersToUpdate = {};
  newWorks.forEach(work => {
    const sellerId = work.author._id.toString();
    if (!sellersToUpdate[sellerId]) sellersToUpdate[sellerId] = [];
    sellersToUpdate[sellerId].push(work._id);
  });

  await Promise.all(
    Object.keys(sellersToUpdate).map(async sellerId => {
      await User.findByIdAndUpdate(sellerId, {
        $pull: { works: { $in: sellersToUpdate[sellerId] } }
      });
    })
  );

  return {
    purchasedWorks: newWorks,
    alreadyOwned: workIds.filter(id => !newWorks.some(nw => nw._id.equals(id)))
  };
};
