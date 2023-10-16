let timer;
let isRunning = false;
let streak = 0;

function updateTimer(minutes, seconds) {
  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(minutes, seconds) {
  timer = setInterval(function () {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else {
      clearInterval(timer);
      alert('Pomodoro complete!');
      resetTimer();
      updateStreak();
    }

    updateTimer(minutes, seconds);
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  chrome.storage.sync.get(['timerDuration'], function (result) {
    const minutes = result.timerDuration || 25;
    updateTimer(minutes, 0);
  });
}

function playYouTube(playlistUrl) {
  // Implement your logic to play YouTube playlist here.
  // You might need to use YouTube API for a more sophisticated integration.
  console.log(`Playing YouTube playlist from ${playlistUrl}`);
}

function updateStreak() {
  streak++;
  document.getElementById('streak').textContent = `Streak: ${streak}`;
}

document.getElementById('startBtn').addEventListener('click', function () {
  if (!isRunning) {
    chrome.storage.sync.get(['timerDuration'], function (result) {
      const minutes = result.timerDuration || 25;
      startTimer(minutes, 0);
      isRunning = true;
      const playlistUrl = document.getElementById('playlistInput').value;
      playYouTube(playlistUrl);
    });
  }
});

document.getElementById('pauseBtn').addEventListener('click', function () {
  if (isRunning) {
    pauseTimer();
  }
});

document.getElementById('resetBtn').addEventListener('click', function () {
  resetTimer();
});

// Initial update
resetTimer();
