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

// Fade in hero content after 60 seconds
setTimeout(() => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
  }
}, 60000);

const soundToggle = document.querySelector('.sound-toggle');
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
  const shouldStartMuted = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

  heroVideo.volume = 0.2; // Set volume to 20%
  heroVideo.muted = shouldStartMuted;

  heroVideo.play().catch(() => {
    // Autoplay with sound may be blocked by browser policies.
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      console.warn('Video playback requires user interaction.');
    });
  });
}

if (soundToggle && heroVideo) {
  const updateSoundToggle = () => {
    soundToggle.classList.toggle('is-muted', heroVideo.muted);
    soundToggle.setAttribute('aria-label', heroVideo.muted ? 'Unmute video sound' : 'Mute video sound');
    soundToggle.setAttribute('aria-pressed', heroVideo.muted ? 'true' : 'false');
  };

  updateSoundToggle();
  heroVideo.addEventListener('volumechange', updateSoundToggle);

  soundToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    heroVideo.play().catch(() => {
      console.warn('Video playback requires user interaction.');
    });
    updateSoundToggle();
  });
}

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

const activateTab = (target) => {
  if (!target) return;

  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === target;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.panel === target);
  });
};

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activateTab(button.dataset.tab);
  });
});

document.querySelectorAll('a[href="#subscribe"]').forEach((link) => {
  link.addEventListener('click', () => {
    activateTab('subscribe');
  });
});
