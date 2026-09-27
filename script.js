const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
const stageDescriptions = Array.from(document.querySelectorAll('[data-stage-description]'));

function activateTab(selectedTab) {
  tabs.forEach((tab) => {
    const active = tab === selectedTab;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== selectedTab.getAttribute('aria-controls');
  });

  stageDescriptions.forEach((description) => {
    description.hidden = description.dataset.stageDescription !== selectedTab.getAttribute('aria-controls');
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;

    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});

const sceneItems = Array.from(document.querySelectorAll('[data-scene-category]'));

function highlightSceneCategory(category) {
  sceneItems.forEach((item) => {
    const matches = item.dataset.sceneCategory === category;
    item.classList.toggle('is-highlighted', matches);
    item.classList.toggle('is-muted', !matches);
  });
}

function clearSceneHighlight() {
  sceneItems.forEach((item) => {
    item.classList.remove('is-highlighted', 'is-muted');
  });
}

sceneItems.forEach((item) => {
  item.addEventListener('mouseenter', () => highlightSceneCategory(item.dataset.sceneCategory));
  item.addEventListener('mouseleave', clearSceneHighlight);
  item.addEventListener('focus', () => highlightSceneCategory(item.dataset.sceneCategory));
  item.addEventListener('blur', clearSceneHighlight);
});

const allVideos = document.querySelectorAll('video');

allVideos.forEach((video) => {
  const keepVideoSilent = () => {
    if (!video.muted) video.muted = true;
    if (video.volume !== 0) video.volume = 0;
  };

  video.defaultMuted = true;
  keepVideoSilent();
  video.addEventListener('volumechange', keepVideoSilent);
});

const trajectoryVideos = document.querySelectorAll('.trajectory-video-card video');

trajectoryVideos.forEach((video) => {
  video.autoplay = true;
  video.play().catch(() => {
    // Some browsers may defer autoplay until the video is visible.
  });
});
