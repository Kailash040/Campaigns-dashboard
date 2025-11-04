// Validate campaign data for creation
exports.validateCampaign = (data) => {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
    return 'Campaign name is required and must be at least 3 characters long';
  }

  if (!data.type || (data.type !== 'Email' && data.type !== 'WhatsApp')) {
    return 'Campaign type must be either Email or WhatsApp';
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
    return 'Description is required and must be at least 10 characters long';
  }

  return null; // No validation errors
};

// Validate campaign data for update
exports.validateCampaignUpdate = (data) => {
  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim().length < 3) {
      return 'Campaign name must be at least 3 characters long';
    }
  }

  if (data.type !== undefined) {
    if (data.type !== 'Email' && data.type !== 'WhatsApp') {
      return 'Campaign type must be either Email or WhatsApp';
    }
  }

  if (data.description !== undefined) {
    if (typeof data.description !== 'string' || data.description.trim().length < 10) {
      return 'Description must be at least 10 characters long';
    }
  }

  if (data.status !== undefined) {
    const validStatuses = ['Active', 'Paused', 'Completed'];
    if (!validStatuses.includes(data.status)) {
      return `Status must be one of: ${validStatuses.join(', ')}`;
    }
  }

  if (data.sent !== undefined && (typeof data.sent !== 'number' || data.sent < 0)) {
    return 'Sent must be a non-negative number';
  }

  if (data.replies !== undefined && (typeof data.replies !== 'number' || data.replies < 0)) {
    return 'Replies must be a non-negative number';
  }

  return null; // No validation errors
};

