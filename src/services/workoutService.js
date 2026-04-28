const { workoutDatabase } = require('../models/workoutModel');

function createWorkoutPlan(goal, level, daysPerWeek) {
  const data = workoutDatabase[goal][level];
  const weekPlan = [];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let activeIndices = [];
  
  if (daysPerWeek === 2) activeIndices = [0, 3];
  else if (daysPerWeek === 3) activeIndices = [0, 2, 4];
  else if (daysPerWeek === 4) activeIndices = [0, 1, 3, 5];
  else activeIndices = [0, 1, 2, 3, 4];
  
  for (let i = 0; i < 7; i++) {
    const isActive = activeIndices.includes(i);
    if (!isActive) {
      weekPlan.push({ day: dayNames[i], active: false, exercises: ['Rest & recovery'], tip: 'Active recovery recommended' });
    } else {
      weekPlan.push({
        day: dayNames[i],
        active: true,
        exercises: data.fullBody.slice(0, 5),
        tip: `Focus on form. ${goal === 'weightLoss' ? 'Add cardio' : goal === 'muscleGain' ? 'Increase weight progressively' : 'Enjoy movement'}`
      });
    }
  }
  
  return { weekPlan, focus: `${goal.replace(/([A-Z])/g, ' $1')} Plan`, consistencyTip: 'Stay consistent! Hydrate and sleep well.' };
}

module.exports = { createWorkoutPlan };