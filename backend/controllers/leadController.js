import Lead from '../models/Lead.js';

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res) => {
  try {
    const { name, phone, email, budget, propertyType, sourcePage, message } = req.body;

    const lead = new Lead({
      name,
      phone,
      email,
      budget,
      propertyType,
      sourcePage,
      message,
    });

    const createdLead = await lead.save();
    res.status(201).json({ message: 'Lead submitted successfully', lead: createdLead });
  } catch (error) {
    res.status(400).json({ message: 'Invalid lead data', error: error.message });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private (Agent)
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id/status
// @access  Private (Agent)
export const updateLeadStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (lead) {
      if (status) lead.status = status;
      if (notes !== undefined) lead.notes = notes;

      const updatedLead = await lead.save();
      res.json(updatedLead);
    } else {
      res.status(404).json({ message: 'Lead not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating lead', error: error.message });
  }
};
