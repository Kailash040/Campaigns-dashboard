const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../../data/campaigns.json');

// Ensure data directory exists
const dataDir = path.dirname(dataFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize campaigns data if file doesn't exist
const defaultCampaigns = [
  {
    id: '1',
    name: 'Q4 Product Launch',
    type: 'Email',
    description: 'Launch campaign for new product',
    status: 'Active',
    sent: 450,
    replies: 32,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Customer Retention',
    type: 'WhatsApp',
    description: 'Re-engage existing customers',
    status: 'Active',
    sent: 230,
    replies: 18,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Holiday Special',
    type: 'Email',
    description: 'Special holiday promotion campaign',
    status: 'Completed',
    sent: 560,
    replies: 45,
    createdAt: '2023-12-01',
  },
];

// Helper function to read campaigns from file
function readCampaigns() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    } else {
      // Create file with default data
      writeCampaigns(defaultCampaigns);
      return defaultCampaigns;
    }
  } catch (error) {
    console.error('Error reading campaigns file:', error);
    return defaultCampaigns;
  }
}

// Helper function to write campaigns to file
function writeCampaigns(campaigns) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(campaigns, null, 2));
  } catch (error) {
    console.error('Error writing campaigns file:', error);
    throw error;
  }
}

// Find all campaigns
exports.findAll = async () => {
  return readCampaigns();
};

// Find campaign by ID
exports.findById = async (id) => {
  const campaigns = readCampaigns();
  return campaigns.find(c => c.id === id) || null;
};

// Create new campaign
exports.create = async (campaign) => {
  const campaigns = readCampaigns();
  campaigns.push(campaign);
  writeCampaigns(campaigns);
  return campaign;
};

// Update campaign
exports.update = async (id, updatedCampaign) => {
  const campaigns = readCampaigns();
  const index = campaigns.findIndex(c => c.id === id);
  
  if (index === -1) {
    return null;
  }
  
  campaigns[index] = updatedCampaign;
  writeCampaigns(campaigns);
  return updatedCampaign;
};

// Delete campaign
exports.delete = async (id) => {
  const campaigns = readCampaigns();
  const index = campaigns.findIndex(c => c.id === id);
  
  if (index === -1) {
    return false;
  }
  
  campaigns.splice(index, 1);
  writeCampaigns(campaigns);
  return true;
};

