// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded');
    
    // Get elements
    const generateBtn = document.getElementById('generateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resetNavBtn = document.getElementById('resetNavBtn');
    const logWorkoutBtn = document.getElementById('logWorkoutBtn');
    const questionnaireCard = document.getElementById('questionnaireCard');
    const planSection = document.getElementById('planSection');
    const planContainer = document.getElementById('planContainer');
    
    // Real image database (Unsplash - Free images)
const exerciseImages = {
        // links to real exercise images 
        'walk':  '/images/walking.webp',
        'squat': '/images/squat.webp',
        'pushup': '/images/pushup.webp',
        'plank': '/images/plank.webp',
        'jump': '/images/jump.webp',
        'run': '/images/run.webp',
        'pullup': '/images/pullup.webp',
        'lunge': '/images/lunge.webp',
        'deadlift': '/images/deadlift.webp',
        'bench': '/images/bench.webp',
        'stretch': '/images/stretch.webp',
        'yoga': '/images/yoga.webp',
        'default': '/images/default.webp'
    };
    
    //pics for rest days 
    const restImages = [
        '/images/rest1.webp',
        '/images/rest2.webp',
        '/images/rest3.webp'
    ];
    
    // plans for each goal and level
    const workoutPlans = {
        weightLoss: {
            beginner: ['Brisk walk 25min', 'Bodyweight squats 3x12', 'Push-ups (knee) 3x8', 'Plank 20-30s', 'Jumping jacks 45sec'],
            intermediate: ['Jump rope HIIT 15min', 'Goblet squats 3x12', 'Push-ups 3x10', 'Walking lunges 3x10/leg', 'Mountain climbers 3x20'],
            advanced: ['Battle ropes 10x30s', 'Barbell squats 4x8', 'Pull-ups 4x6', 'Box jumps 4x8', 'Burpees 3x12']
        },
        muscleGain: {
            beginner: ['Goblet squats 3x10', 'Dumbbell bench press 3x8', 'Lat pulldown 3x10', 'Leg press 3x12', 'Hammer curls 3x10'],
            intermediate: ['Barbell squats 3x8', 'Bench press 3x8', 'Barbell rows 3x8', 'Deadlifts 3x5', 'Pull-ups 3x6'],
            advanced: ['Squats 4x6', 'Deadlift 4x5', 'Bench press 4x6', 'Pull-ups weighted 4x6', 'Dips 4x8']
        },
        generalFitness: {
            beginner: ['Walk 20min', 'Air squats 2x12', 'Wall push-ups 2x10', 'Plank 20s', 'Glute bridges 2x12'],
            intermediate: ['Jog 15min', 'Goblet squats 3x10', 'Push-ups 3x8', 'Walking lunges 3x10', 'Plank 45s'],
            advanced: ['Run 3km', 'Power cleans 4x5', 'Pull-ups 4x6', 'Turkish get-ups', 'Yoga flow']
        }
    };
    
    // function to get the appropriate image for an exercise
    function getExerciseImage(exerciseName) {
        const name = exerciseName.toLowerCase();
        if (name.includes('walk')) return exerciseImages.walk;
        if (name.includes('squat')) return exerciseImages.squat;
        if (name.includes('push')) return exerciseImages.pushup;
        if (name.includes('plank')) return exerciseImages.plank;
        if (name.includes('jump')) return exerciseImages.jump;
        if (name.includes('run') || name.includes('jog')) return exerciseImages.run;
        if (name.includes('pull')) return exerciseImages.pullup;
        if (name.includes('lunge')) return exerciseImages.lunge;
        if (name.includes('deadlift')) return exerciseImages.deadlift;
        if (name.includes('bench')) return exerciseImages.bench;
        if (name.includes('stretch') || name.includes('yoga')) return exerciseImages.stretch;
        return exerciseImages.squat; // صورة افتراضية
    }
    
    // function to generate the workout plan with images
    function generatePlan() {
        const goal = document.getElementById('goalSelect').value;
        const level = document.getElementById('levelSelect').value;
        const days = parseInt(document.getElementById('daysSelect').value);
        
        const exercises = workoutPlans[goal][level];
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        // Select active days
        let activeDays = [];
        if (days === 2) activeDays = [0, 3];
        else if (days === 3) activeDays = [0, 2, 4];
        else if (days === 4) activeDays = [0, 1, 3, 5];
        else activeDays = [0, 1, 2, 3, 4];
        
        // Build HTML with real images
        let html = '<div class="week-grid">';
        
        for (let i = 0; i < 7; i++) {
            const isActive = activeDays.includes(i);
            const borderColor = isActive ? '#2b6e4f' : '#cbd5e1';
            const randomRestImg = restImages[Math.floor(Math.random() * restImages.length)];
            
            html += `<div class="day-card" style="border-left-color: ${borderColor}">`;
            html += `<div class="day-name">${dayNames[i]} ${isActive ? '<span class="tip-badge">🏋️ Workout</span>' : '<span class="tip-badge">🔄 Rest Day</span>'}</div>`;
            
            if (isActive) {
                html += '<div class="exercise-list">';
                exercises.forEach(ex => {
                    const imgUrl = getExerciseImage(ex);
                    html += `
                        <div class="exercise-item">
                            <img src="${imgUrl}" alt="${ex}" class="exercise-img" loading="lazy">
                            <div class="exercise-text">${ex}</div>
                        </div>
                    `;
                });
                html += '</div>';
                html += `<div class="tip-badge" style="margin-top:8px; display:inline-block;">💡 Stay hydrated and maintain proper form</div>`;
            } else {
                html += `
                    <div class="rest-day">
                        <img src="${randomRestImg}" alt="Rest Day" class="rest-img" loading="lazy">
                        <div style="flex:1">
                            <strong>Active Recovery</strong><br>
                            <small>🧘 Stretching, light walk, or meditation</small>
                        </div>
                    </div>
                `;
            }
            
            html += `</div>`;
        }
        
        html += '</div>';
        
        if (planContainer) planContainer.innerHTML = html;
        
        // Show plan section, hide questionnaire
        if (questionnaireCard) questionnaireCard.style.display = 'none';
        if (planSection) planSection.style.display = 'block';
        
        // Save to localStorage
        localStorage.setItem('hasPlan', 'true');
    }
    
    // Reset function
    function resetApp() {
        if (questionnaireCard) questionnaireCard.style.display = 'block';
        if (planSection) planSection.style.display = 'none';
        localStorage.removeItem('hasPlan');
    }
    
    // Log workout function
    let workoutLog = [];
    
    function logWorkout() {
        const today = new Date().toISOString().slice(0,10);
        if (!workoutLog.includes(today)) {
            workoutLog.push(today);
            localStorage.setItem('workoutLog', JSON.stringify(workoutLog));
            alert('🎉 Workout logged! Keep crushing it!');
            updateMotivation();
        } else {
            alert('Already logged today! Rest and recover.');
        }
    }
    
    function updateMotivation() {
        const stored = localStorage.getItem('workoutLog');
        if (stored) workoutLog = JSON.parse(stored);
        const streak = workoutLog.length;
        const msgDiv = document.getElementById('motivationMessage');
        
        if (msgDiv) {
            if (streak === 0) msgDiv.innerHTML = '💪 Start your journey today!';
            else if (streak < 3) msgDiv.innerHTML = `🌟 Great start! ${streak} workout(s) done!`;
            else if (streak < 7) msgDiv.innerHTML = `⚡ You're building a powerful habit! ${streak} workouts!`;
            else msgDiv.innerHTML = `🏆 Legendary streak! ${streak} workouts completed!`;
        }
    }
    
    // Load saved data
    function loadSavedData() {
        const hasPlan = localStorage.getItem('hasPlan');
        if (hasPlan === 'true' && questionnaireCard && planSection) {
            questionnaireCard.style.display = 'none';
            planSection.style.display = 'block';
        }
        updateMotivation();
    }
    
    // Add event listeners
    if (generateBtn) generateBtn.addEventListener('click', generatePlan);
    if (resetBtn) resetBtn.addEventListener('click', resetApp);
    if (resetNavBtn) resetNavBtn.addEventListener('click', resetApp);
    if (logWorkoutBtn) logWorkoutBtn.addEventListener('click', logWorkout);
    
    // Load saved data on page load
    loadSavedData();
    
    console.log('All event listeners added');
});