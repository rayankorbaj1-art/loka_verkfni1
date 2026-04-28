const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.get('/', workoutController.renderIndex);
router.post('/api/generate-plan', workoutController.generatePlan);
router.get('/plan', workoutController.renderPlan);

module.exports = router;