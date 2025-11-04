const campaignRepository = require('../repositories/campaignRepository');

// Get all campaigns
exports.getAllCampaigns = async () => {
  return await campaignRepository.findAll();
};

// Get campaign by ID
exports.getCampaignById = async (id) => {
  return await campaignRepository.findById(id);
};

// Create new campaign
exports.createCampaign = async (campaignData) => {
  const newCampaign = {
    id: await generateId(),
    name: campaignData.name,
    type: campaignData.type,
    description: campaignData.description,
    status: campaignData.status || 'Active',
    sent: campaignData.sent || 0,
    replies: campaignData.replies || 0,
    createdAt: campaignData.createdAt || new Date().toISOString().split('T')[0],
  };

  return await campaignRepository.create(newCampaign);
};

// Update campaign
exports.updateCampaign = async (id, updateData) => {
  const existingCampaign = await campaignRepository.findById(id);
  if (!existingCampaign) {
    return null;
  }

  const updatedCampaign = {
    ...existingCampaign,
    ...updateData,
    id: existingCampaign.id, // Ensure ID cannot be changed
  };

  return await campaignRepository.update(id, updatedCampaign);
};

// Delete campaign
exports.deleteCampaign = async (id) => {
  return await campaignRepository.delete(id);
};

// Generate unique ID
async function generateId() {
  const campaigns = await campaignRepository.findAll();
  const maxId = campaigns.reduce((max, campaign) => {
    const idNum = parseInt(campaign.id) || 0;
    return idNum > max ? idNum : max;
  }, 0);
  return String(maxId + 1);
}

