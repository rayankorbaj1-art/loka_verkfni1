const workoutService = require('../services/workoutService');

exports.generatePlan = (req, res) => {
  const { goal, level, days } = req.body;
  const plan = workoutService.createWorkoutPlan(goal, level, parseInt(days));
  res.json(plan);
};

exports.renderIndex = (req, res) => {
  res.render('index');
};

exports.renderPlan = (req, res) => {
  res.render('plan');
};