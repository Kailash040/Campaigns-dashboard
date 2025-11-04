const campaignService = require('../services/campaignService');
const { validateCampaign, validateCampaignUpdate } = require('../utils/validation');

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};

// Get campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await campaignService.getCampaignById(id);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
};

// Create new campaign
exports.createCampaign = async (req, res) => {
  try {
    const validationError = validateCampaign(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const campaign = await campaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const validationError = validateCampaignUpdate(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const campaign = await campaignService.updateCampaign(id, req.body);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await campaignService.deleteCampaign(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};

