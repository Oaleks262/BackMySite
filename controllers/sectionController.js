const Section = require('../models/Section');

exports.getSections = async (req, res) => {
  try {
    const sections = await Section.find().sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get sections', error: err.message });
  }
};

exports.createSection = async (req, res) => {
  try {
    const { title, content, image, order } = req.body;
    const newSection = new Section({ title, content, image, order });
    await newSection.save();
    res.status(201).json(newSection);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create section', error: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const updated = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update section', error: err.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete section', error: err.message });
  }
};