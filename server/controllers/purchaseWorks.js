import { purchaseWorksService } from '../services/purchaseService.js';

export const purchaseWorks = async (req, res) => {
  try {
    const result = await purchaseWorksService(req.userId, req.body.workIds);
    res.status(200).json({
      success: true,
      message: 'Works purchased successfully.',
      purchasedWorks: result.purchasedWorks,
      alreadyOwned: result.alreadyOwned
    });
  } catch (error) {
    console.error(error);
    if (error.message === 'User not found.') {
      res.status(404).json({ success: false, message: error.message });
    } else if (error.message === 'Some works not found.') {
      res.status(404).json({ success: false, message: error.message, missingWorks: error.missingWorks });
    } else if (error.message === 'No works selected for purchase.' || error.message === 'Invalid work IDs format.' || error.message === 'You already own all selected works.') {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error during purchase.' });
    }
  }
};
