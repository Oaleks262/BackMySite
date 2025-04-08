const express = require('express');
const router = express.Router();
const { getSections, createSection, updateSection, deleteSection } = require('../controllers/sectionController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.get('/', getSections);
router.post('/', auth, role('admin'), createSection);
router.put('/:id', auth, role('admin'), updateSection);
router.delete('/:id', auth, role('admin'), deleteSection);

module.exports = router;