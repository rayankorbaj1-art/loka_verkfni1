// Data templates for workouts
const workoutDatabase = {
  weightLoss: {
    beginner: { fullBody: ['Brisk walk 25min', 'Bodyweight squats 3x12', 'Push-ups (knee) 3x8', 'Plank 20-30s'] },
    intermediate: { fullBody: ['Jump rope HIIT 15min', 'Goblet squats 3x12', 'Push-ups 3x10', 'Walking lunges 3x10/leg'] },
    advanced: { fullBody: ['Battle ropes 10x30s', 'Barbell squats 4x8', 'Pull-ups 4x6', 'Box jumps 4x8'] }
  },
  muscleGain: {
    beginner: { fullBody: ['Goblet squats 3x10', 'DB bench press 3x8', 'Lat pulldown 3x10', 'Leg press 3x12'] },
    intermediate: { fullBody: ['Barbell squats 3x8', 'Bench press 3x8', 'Barbell rows 3x8', 'Deadlifts 3x5'] },
    advanced: { fullBody: ['Squats 4x6', 'Deadlift 4x5', 'Bench 4x6', 'Pull-ups weighted 4x6'] }
  },
  generalFitness: {
    beginner: { fullBody: ['Walk 20min', 'Air squats 2x12', 'Wall push-ups 2x10', 'Plank 20s'] },
    intermediate: { fullBody: ['Jog 15min', 'Goblet squats 3x10', 'Push-ups 3x8', 'Walking lunges 3x10'] },
    advanced: { fullBody: ['Run 3km', 'Power cleans 4x5', 'Pull-ups 4x6', 'Turkish get-ups'] }
  }
};

module.exports = { workoutDatabase };