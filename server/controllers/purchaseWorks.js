import mongoose from 'mongoose';
import User from '../models/User.js';
import Work from '../models/Work.js';

export const purchaseWorks = async (req, res) => {
  try {
    const { workIds } = req.body;
    const userId = req.userId;

    // Валидация входных данных
    if (!workIds || !Array.isArray(workIds) || workIds.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'No works selected for purchase.' 
      });
    }

    // Проверяем, что все workIds являются валидными ObjectId
    if (workIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid work IDs format.'
      });
    }

    const [user, works] = await Promise.all([
      User.findById(userId),
      Work.find({ _id: { $in: workIds } })
    ]);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found.' 
      });
    }

    if (works.length !== workIds.length) {
      const foundIds = works.map(w => w._id.toString());
      const missingIds = workIds.filter(id => !foundIds.includes(id));
      
      return res.status(404).json({
        success: false,
        message: 'Some works not found.',
        missingWorks: missingIds
      });
    }

    // Фильтруем работы, которых еще нет у пользователя
const newWorks = works.filter(work =>
  !user.works.some(userWorkId => userWorkId.equals(work._id))
);

if (newWorks.length === 0) {
  return res.status(400).json({
    success: false,
    message: 'You already own all selected works.'
  });
}

// Добавляем новые работы
user.works.push(...newWorks.map(work => work._id));
await user.save();

return res.status(200).json({
  success: true,
  message: 'Works purchased successfully.',
  purchasedWorks: newWorks,
  alreadyOwned: workIds.filter(id => 
    !newWorks.some(nw => nw._id.equals(id)))
});


  } catch (error) {
    console.error('Error purchasing works:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during purchase.'
    });
  }
};