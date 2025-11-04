const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

// GET /api/campaigns - Get all campaigns
router.get('/', campaignController.getAllCampaigns);

// GET /api/campaigns/:id - Get a specific campaign
router.get('/:id', campaignController.getCampaignById);

// POST /api/campaigns - Create a new campaign
router.post('/', campaignController.createCampaign);

// PUT /api/campaigns/:id - Update a campaign
router.put('/:id', campaignController.updateCampaign);

// DELETE /api/campaigns/:id - Delete a campaign
router.delete('/:id', campaignController.deleteCampaign);

module.exports = router;

