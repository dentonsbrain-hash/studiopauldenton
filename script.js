const video = document.querySelector('.hero-video');

if (video) {
  video.addEventListener('error', () => {
    console.warn('Video could not be loaded. Check the file path or browser security settings.');
    const message = document.createElement('div');
    message.className = 'video-error';
    message.textContent = 'Video unavailable locally. Please ensure the file path is correct.';
    document.querySelector('.video-hero').appendChild(message);
  });
}

// Fade in hero content after 15 seconds
setTimeout(() => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
  }
}, 15000);

const soundToggle = document.querySelector('.sound-toggle');
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
  heroVideo.volume = 0.2; // Set volume to 20%
  heroVideo.muted = false;
}

if (soundToggle && heroVideo) {
  soundToggle.textContent = heroVideo.muted ? 'Unmute' : 'Mute';
  soundToggle.classList.toggle('active', !heroVideo.muted);

  soundToggle.addEventListener('click', () => {
    const isMuted = heroVideo.muted;
    heroVideo.muted = !isMuted;
    soundToggle.textContent = heroVideo.muted ? 'Unmute' : 'Mute';
    soundToggle.classList.toggle('active', !heroVideo.muted);
  });
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;
    if (!target) return;

    tabButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === target);
    });
  });
});

const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks! You will be notified when launch details are ready.');
    subscribeForm.reset();
  });
}
