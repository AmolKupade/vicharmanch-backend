const Application = require('../models/Application');

exports.submitApplication = async (req, res) => {
  try {
    const newApp = await Application.create(req.body);
    res.status(201).json({ success: true, message: 'Application submitted!', data: newApp });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};