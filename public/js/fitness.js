// Client-side fitness planner logic
let currentPlan = null;
let workoutLog = [];

function loadProgress() {
  const stored = localStorage.getItem('fitflow_progress');
  if (stored) workoutLog = JSON.parse(stored);
  updateMotivation();
}

function saveProgress() {
  localStorage.setItem('fitflow_progress', JSON.stringify(workoutLog));
}

function getTodayKey() {
  return new Date().toISOString().slice(0,10);
}

function updateMotivation() {
  const today = getTodayKey();
  const loggedToday = workoutLog.includes(today);
  const logBtn = document.getElementById('logWorkoutBtn');
  const streak = calculateStreak();
  const msgDiv = document.getElementById('motivationMessage');
  
  if (logBtn) {
    logBtn.disabled = loggedToday;
    logBtn.textContent = loggedToday ? '✅ Done Today!' : '✔️ Log Workout';
  }
  
  let msg = '';
  if (streak === 0) msg = '💪 Start your journey today!';
  else if (streak < 3) msg = '🌟 Great start! Keep going!';
  else if (streak < 7) msg = '⚡ You\'re building a powerful habit!';
  else msg = '🏆 Legendary streak! You\'re unstoppable!';
  
  if (msgDiv) msgDiv.innerHTML = `✨ ${msg} (${streak} day streak)`;
}

function calculateStreak() {
  if (workoutLog.length === 0) return 0;
  let streak = 1;
  for (let i = workoutLog.length-1; i > 0; i--) {
    const diff = (new Date(workoutLog[i]) - new Date(workoutLog[i-1])) / (1000*3600*24);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

async function generatePlan() {
  const goal = document.getElementById('goalSelect').value;
  const level = document.getElementById('levelSelect').value;
  const days = document.getElementById('daysSelect').value;
  
  const response = await fetch('/api/generate-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal, level, days })
  });
  
  const plan = await response.json();
  currentPlan = plan;
  displayPlan(plan);
}

function displayPlan(plan) {
  const container = document.getElementById('planContainer');
  if (!container) return;
  
  let html = `<div class="week-grid">`;
  plan.weekPlan.forEach(day => {
    const borderColor = day.active ? '#2b6e4f' : '#cbd5e1';
    html += `<div class="day-card" style="border-left-color: ${borderColor}">`;
    html += `<div class="day-name">${day.day} ${day.active ? '<span class="tip-badge">🏋️ Workout</span>' : '<span class="tip-badge">🔄 Rest</span>'}</div>`;
    if (day.active) {
      html += `<ul class="exercise-list">${day.exercises.map(ex => `<li>${ex}</li>`).join('')}</ul>`;
      html += `<div class="tip-badge" style="margin-top:8px;">💡 ${day.tip}</div>`;
    } else {
      html += `<div>${day.exercises[0]}</div>`;
    }
    html += `</div>`;
  });
  html += `</div>`;
  container.innerHTML = html;
  document.getElementById('planSection').style.display = 'block';
  document.getElementById('questionnaireCard').style.display = 'none';
}

function resetApp() {
  document.getElementById('planSection').style.display = 'none';
  document.getElementById('questionnaireCard').style.display = 'block';
}

function logWorkout() {
  const today = getTodayKey();
  if (!workoutLog.includes(today)) {
    workoutLog.push(today);
    saveProgress();
    updateMotivation();
    alert('🎉 Workout logged! Keep crushing it!');
  } else {
    alert('Already logged today! Rest and recover.');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  document.getElementById('generateBtn')?.addEventListener('click', generatePlan);
  document.getElementById('resetBtn')?.addEventListener('click', resetApp);
  document.getElementById('logWorkoutBtn')?.addEventListener('click', logWorkout);
});