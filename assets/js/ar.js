// ============================================
// Howler.js Audio Setup
// ============================================

// Initialize Howler sounds for all instruments
const sounds = {
  maracas: new Howl({
    src: ['/assets/sounds/maracas/maracas.mp3'],
    volume: 1.0,
    preload: true,
    onload: () => console.log('🎶 Maracas sound loaded'),
    onloaderror: (id, err) => console.error('Maracas load error:', err),
  }),
  trumpet: new Howl({
    src: ['/assets/sounds/trumpet/trumpet.mp3'],
    volume: 1.0,
    loop: true,
    preload: true,
    onload: () => console.log('🎺 Trumpet sound loaded'),
    onloaderror: (id, err) => console.error('Trumpet load error:', err),
  }),
  saxophone: new Howl({
    src: ['/assets/sounds/saxophone/saxophone.mp3'],
    volume: 1.0,
    loop: true,
    preload: true,
    onload: () => console.log('🎷 Saxophone sound loaded'),
    onloaderror: (id, err) => console.error('Saxophone load error:', err),
  }),
  accordion: new Howl({
    src: ['/assets/sounds/accordion/accordion.mp3'],
    volume: 1.0,
    loop: true,
    preload: true,
    onload: () => console.log('🪗 Accordion sound loaded'),
    onloaderror: (id, err) => console.error('Accordion load error:', err),
  }),
  cello: new Howl({
    src: ['/assets/sounds/cello/cello.mp3'],
    volume: 1.0,
    loop: true,
    preload: true,
    onload: () => console.log('🎻 Cello sound loaded'),
    onloaderror: (id, err) => console.error('Cello load error:', err),
  }),
  harp: new Howl({
    src: ['/assets/sounds/harp/harp.mp3'],
    volume: 1.0,
    preload: true,
    onload: () => console.log('🎵 Harp sound loaded'),
    onloaderror: (id, err) => console.error('Harp load error:', err),
  }),
  ukulele: new Howl({
    src: ['/assets/sounds/ukulele/ukulele.mp3'],
    volume: 1.0,
    preload: true,
    onload: () => console.log('🎸 Ukulele sound loaded'),
    onloaderror: (id, err) => console.error('Ukulele load error:', err),
  }),
  tabla: new Howl({
    src: ['/assets/sounds/tabla/tabla.mp3'],
    volume: 1.0,
    preload: true,
    onload: () => console.log('🥁 Tabla sound loaded'),
    onloaderror: (id, err) => console.error('Tabla load error:', err),
  }),
  tamborine: new Howl({
    src: ['/assets/sounds/tamborine/tamborine.mp3'],
    volume: 1.0,
    preload: true,
    onload: () => console.log('🎶 Tamborine sound loaded'),
    onloaderror: (id, err) => console.error('Tamborine load error:', err),
  }),
  pianika: new Howl({
    src: ['/assets/sounds/piano/piano.mp3'], // Using piano sound for pianika
    volume: 1.0,
    loop: true,
    preload: true,
    onload: () => console.log('🎹 Pianika sound loaded'),
    onloaderror: (id, err) => console.error('Pianika load error:', err),
  }),
};

// Instrument display data for all instruments
const instrumentInfo = {
  maracas: {
    displayName: 'MARACAS',
    family: 'Keluarga Perkusi',
    playLabel: 'Ketuk untuk Kocok!',
    interactionType: 'tap',
  },
  trumpet: {
    displayName: 'TEROMPET',
    family: 'Keluarga Tiup Logam',
    playLabel: 'Tahan untuk Tiup!',
    interactionType: 'hold',
  },
  saxophone: {
    displayName: 'SAKSOFON',
    family: 'Keluarga Tiup Kayu',
    playLabel: 'Tahan untuk Tiup!',
    interactionType: 'hold',
  },
  accordion: {
    displayName: 'AKORDEON',
    family: 'Keluarga Keyboard',
    playLabel: 'Tahan untuk Main!',
    interactionType: 'hold',
  },
  cello: {
    displayName: 'CELLO',
    family: 'Keluarga Gesek',
    playLabel: 'Tahan untuk Gesek!',
    interactionType: 'hold',
  },
  harp: {
    displayName: 'HARPA',
    family: 'Keluarga Petik',
    playLabel: 'Ketuk untuk Petik!',
    interactionType: 'tap',
  },
  ukulele: {
    displayName: 'UKULELE',
    family: 'Keluarga Petik',
    playLabel: 'Ketuk untuk Petik!',
    interactionType: 'tap',
  },
  tabla: {
    displayName: 'TABLA',
    family: 'Keluarga Perkusi',
    playLabel: 'Ketuk untuk Pukul!',
    interactionType: 'tap',
  },
  tamborine: {
    displayName: 'TAMBORIN',
    family: 'Keluarga Perkusi',
    playLabel: 'Ketuk untuk Kocok!',
    interactionType: 'tap',
  },
  pianika: {
    displayName: 'PIANIKA',
    family: 'Keluarga Keyboard',
    playLabel: 'Tahan untuk Main!',
    interactionType: 'hold',
  },
};

// Resume Howler context if suspended
if (Howler.ctx && Howler.ctx.state === 'suspended') {
  Howler.ctx.resume().then(() => {
    console.log('🔊 Howler AudioContext resumed');
  });
}

console.log('✅ Howler.js audio initialized!');

// Current active instrument and model
let activeInstrument = null;
let currentActiveModel = null;
let isHolding = false; // Generic hold state for all hold-type instruments

// ============================================
// Position Adjustment Functions
// ============================================
function adjustPosition(axis, step) {
  if (!currentActiveModel) {
    console.log('⚠️ No active model to adjust');
    return;
  }

  const model = document.getElementById(currentActiveModel);
  if (!model) return;

  const position = model.getAttribute('position');
  const newPosition = { ...position };

  // Adjust the specified axis
  newPosition[axis] += step;

  model.setAttribute('position', newPosition);
  console.log(
    `📐 ${currentActiveModel} position adjusted: ${axis.toUpperCase()} ${step > 0 ? '+' : ''}${step} → ${newPosition[axis].toFixed(2)}`
  );
}

// Show position control panel
function showPositionControls() {
  const panel = document.getElementById('positionControlPanel');
  if (panel) {
    panel.classList.add('show');
  }
}

// Hide position control panel
function hidePositionControls() {
  const panel = document.getElementById('positionControlPanel');
  if (panel) {
    panel.classList.remove('show');
  }
}

// ============================================
// Generic Tap Instrument Sound Player
// For: maracas, harp, ukulele, tabla, tamborine
// ============================================
function playInstrumentSound(instrumentType) {
  const sound = sounds[instrumentType];
  if (!sound) {
    console.warn(`⚠️ No sound found for instrument: ${instrumentType}`);
    return;
  }

  // Play sound
  sound.stop();
  sound.play();
  console.log(`� ${instrumentType} sound played!`);

  // Animate play button
  const mainPlayBtn = document.getElementById('mainPlayBtn');
  if (mainPlayBtn) {
    mainPlayBtn.classList.add('animate-pulse');
    sound.once('end', () => {
      mainPlayBtn.classList.remove('animate-pulse');
    });
  }

  // Animate 3D model - shake/rotate for percussion instruments
  const percussionInstruments = ['maracas', 'tabla', 'tamborine'];
  if (percussionInstruments.includes(instrumentType)) {
    const model = document.getElementById(`${instrumentType}Model`);
    if (model) {
      shakeModel(model);
    }
  }
}

// Shake animation for percussion 3D models
function shakeModel(model) {
  const originalRotation = model.getAttribute('rotation');
  let shakeCount = 0;
  const maxShakes = 6;
  const shakeAngle = 15;

  function shake() {
    if (shakeCount >= maxShakes) {
      // Return to original rotation
      model.setAttribute('rotation', originalRotation);
      return;
    }

    const direction = shakeCount % 2 === 0 ? shakeAngle : -shakeAngle;
    model.setAttribute('rotation', {
      x: originalRotation.x,
      y: originalRotation.y + direction,
      z: originalRotation.z + direction,
    });

    shakeCount++;
    setTimeout(shake, 80);
  }

  shake();
}

// ============================================
// Generic Hold Instrument Sound Player
// For: trumpet, saxophone, accordion, cello, pianika
// ============================================
let holdScaleAnimation = null;
let holdOriginalScale = null;

function startHoldSound(instrumentType) {
  const sound = sounds[instrumentType];
  if (!sound) {
    console.warn(`⚠️ No sound found for instrument: ${instrumentType}`);
    return;
  }

  isHolding = true;
  console.log(`� ${instrumentType} hold started!`);

  // Play sound immediately (should be set to loop in sounds config)
  sound.stop();
  sound.play();

  // Visual feedback on button
  const mainPlayBtn = document.getElementById('mainPlayBtn');
  if (mainPlayBtn) {
    mainPlayBtn.style.transform = 'scale(0.9)';
    mainPlayBtn.style.opacity = '0.8';
  }

  // Start looping scale animation on 3D model
  const model = document.getElementById(`${instrumentType}Model`);
  if (model) {
    holdOriginalScale = { ...model.getAttribute('scale') };
    startHoldScaleLoop(model, instrumentType);
  }
}

function releaseHoldSound(instrumentType) {
  if (!isHolding) return;
  isHolding = false;

  const sound = sounds[instrumentType];
  if (sound) {
    sound.stop();
  }

  console.log(`🎵 ${instrumentType} released - sound stopped`);

  // Reset button
  const mainPlayBtn = document.getElementById('mainPlayBtn');
  if (mainPlayBtn) {
    mainPlayBtn.style.transform = '';
    mainPlayBtn.style.opacity = '';
  }

  // Stop animation and reset 3D model
  if (holdScaleAnimation) {
    clearInterval(holdScaleAnimation);
    holdScaleAnimation = null;
  }

  const model = document.getElementById(`${instrumentType}Model`);
  if (model && holdOriginalScale) {
    model.setAttribute('scale', holdOriginalScale);
  }
}

// Looping scale animation for hold instruments
function startHoldScaleLoop(model, instrumentType) {
  let scaleUp = true;
  const minScale = 0.9;
  const maxScale = 1.15;

  holdScaleAnimation = setInterval(() => {
    if (!isHolding) {
      clearInterval(holdScaleAnimation);
      holdScaleAnimation = null;
      if (holdOriginalScale) {
        model.setAttribute('scale', holdOriginalScale);
      }
      return;
    }

    const scaleFactor = scaleUp ? maxScale : minScale;
    model.setAttribute('scale', {
      x: holdOriginalScale.x * scaleFactor,
      y: holdOriginalScale.y * scaleFactor,
      z: holdOriginalScale.z * scaleFactor,
    });
    scaleUp = !scaleUp;
  }, 150);
}

// ============================================
// Hide all sound buttons and stop sounds
// ============================================
function hideAllSoundButtons() {
  const previousInstrument = activeInstrument;
  activeInstrument = null;
  isHolding = false;

  // Clear hold animation
  if (holdScaleAnimation) {
    clearInterval(holdScaleAnimation);
    holdScaleAnimation = null;
  }

  // Reset model to original scale if we have one
  if (previousInstrument && holdOriginalScale) {
    const model = document.getElementById(`${previousInstrument}Model`);
    if (model) {
      model.setAttribute('scale', holdOriginalScale);
    }
  }

  // Stop all sounds dynamically
  Object.keys(sounds).forEach((key) => {
    if (sounds[key] && sounds[key].stop) {
      sounds[key].stop();
    }
  });
}

// ============================================
// Register custom A-Frame component for marker handling
// ============================================
AFRAME.registerComponent('markerhandler', {
  init: function () {
    const marker = this.el;
    const markerUrl = marker.getAttribute('url');

    // Extract instrument type from URL path (e.g., /assets/images/accordion/accordion -> accordion)
    const urlParts = markerUrl.split('/');
    const instrumentType = urlParts[urlParts.length - 1] || 'unknown';

    // Get instrument info
    const info = instrumentInfo[instrumentType] || {
      displayName: instrumentType.toUpperCase(),
      family: 'Alat Musik',
      playLabel: 'Putar Suara',
      interactionType: 'tap',
    };

    // Position tracking interval
    let positionTrackingInterval = null;

    // Marker found event
    marker.addEventListener('markerFound', () => {
      console.log(`✅ ${info.displayName} Marker Found!`);

      // Set active instrument
      activeInstrument = instrumentType;

      // Hide the idle camera screen
      const idleCameraScreen = document.getElementById('idleCameraScreen');
      if (idleCameraScreen) {
        idleCameraScreen.classList.add('hidden');
      }

      // Show the marker detected screen
      const markerDetectedScreen = document.getElementById(
        'markerDetectedScreen'
      );
      if (markerDetectedScreen) {
        markerDetectedScreen.classList.remove('hidden');

        // Update instrument info
        const instrumentTitle = document.getElementById('instrumentTitle');
        const instrumentFamily = document.getElementById('instrumentFamily');
        const detectionText = document.getElementById('detectionText');
        const playBtnLabel = document.getElementById('playBtnLabel');

        if (instrumentTitle) instrumentTitle.textContent = info.displayName;
        if (instrumentFamily) instrumentFamily.textContent = info.family;
        if (detectionText)
          detectionText.textContent = `${info.displayName} Terdeteksi!`;
        if (playBtnLabel) playBtnLabel.textContent = info.playLabel;
      }

      // Setup main play button based on interaction type
      const mainPlayBtn = document.getElementById('mainPlayBtn');
      if (mainPlayBtn) {
        // Remove old listeners by replacing the element
        mainPlayBtn.replaceWith(mainPlayBtn.cloneNode(true));
        const newMainPlayBtn = document.getElementById('mainPlayBtn');

        if (info.interactionType === 'tap') {
          // Tap interaction: play on touch/click
          newMainPlayBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            playInstrumentSound(instrumentType);
          });
          newMainPlayBtn.addEventListener('mousedown', () =>
            playInstrumentSound(instrumentType)
          );
        } else if (info.interactionType === 'hold') {
          // Hold interaction: play while holding
          newMainPlayBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startHoldSound(instrumentType);
          });
          newMainPlayBtn.addEventListener('mousedown', () =>
            startHoldSound(instrumentType)
          );

          newMainPlayBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            releaseHoldSound(instrumentType);
          });
          newMainPlayBtn.addEventListener('mouseup', () =>
            releaseHoldSound(instrumentType)
          );
          newMainPlayBtn.addEventListener('mouseleave', () => {
            if (isHolding) releaseHoldSound(instrumentType);
          });
        }
      }

      // Set current active model for position adjustment (now works for all instruments)
      currentActiveModel = `${instrumentType}Model`;

      // Show position control panel
      showPositionControls();

      // Show position display and start tracking
      const positionDisplay = document.getElementById('modelPositionDisplay');
      if (positionDisplay) {
        positionDisplay.classList.remove('hidden');
      }

      // Get the model element
      const model = document.getElementById(modelId);

      // Start tracking position
      if (model) {
        positionTrackingInterval = setInterval(() => {
          const position = model.getAttribute('position');
          const scale = model.getAttribute('scale');
          const rotation = model.getAttribute('rotation');

          if (position) {
            document.getElementById('posX').textContent = position.x.toFixed(2);
            document.getElementById('posY').textContent = position.y.toFixed(2);
            document.getElementById('posZ').textContent = position.z.toFixed(2);
          }
          if (scale) {
            document.getElementById('scaleVal').textContent =
              scale.x.toFixed(2);
          }
          if (rotation) {
            document.getElementById('rotVal').textContent =
              `${rotation.x.toFixed(0)}°`;
          }
        }, 100);
      }
    });

    // Marker lost event
    marker.addEventListener('markerLost', () => {
      console.log(`⚠️ ${info.displayName} Marker Lost`);

      // Hide the marker detected screen
      const markerDetectedScreen = document.getElementById(
        'markerDetectedScreen'
      );
      if (markerDetectedScreen) {
        markerDetectedScreen.classList.add('hidden');
      }

      // Show the idle camera screen again
      const idleCameraScreen = document.getElementById('idleCameraScreen');
      if (idleCameraScreen) {
        idleCameraScreen.classList.remove('hidden');
      }

      // Hide the play button and stop sounds
      hideAllSoundButtons();

      // Clear current active model
      currentActiveModel = null;

      // Hide position control panel
      hidePositionControls();

      // Hide position display and stop tracking
      const positionDisplay = document.getElementById('modelPositionDisplay');
      if (positionDisplay) {
        positionDisplay.classList.add('hidden');
      }

      if (positionTrackingInterval) {
        clearInterval(positionTrackingInterval);
        positionTrackingInterval = null;
      }
    });
  },
});

// ============================================
// Loading Screen Progress Bar
// ============================================
let loadingProgress = 0;
let loadingInterval = null;

function updateLoadingProgress(percent) {
  const progressBar = document.getElementById('loadingProgress');
  const percentText = document.getElementById('loadingPercent');

  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }
  if (percentText) {
    percentText.textContent = `${Math.round(percent)}%`;
  }
}

function startLoadingProgress() {
  loadingProgress = 0;
  updateLoadingProgress(0);

  // Simulate initial progress (0-70%)
  loadingInterval = setInterval(() => {
    if (loadingProgress < 70) {
      loadingProgress += Math.random() * 5 + 2;
      loadingProgress = Math.min(loadingProgress, 70);
      updateLoadingProgress(loadingProgress);
    }
  }, 200);
}

function completeLoading() {
  // Clear the interval
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }

  // Animate from current progress to 100%
  const animateToComplete = () => {
    if (loadingProgress < 100) {
      loadingProgress += 5;
      loadingProgress = Math.min(loadingProgress, 100);
      updateLoadingProgress(loadingProgress);

      if (loadingProgress < 100) {
        requestAnimationFrame(animateToComplete);
      } else {
        // Hide loading screen after a brief delay
        setTimeout(hideLoadingScreen, 300);
      }
    }
  };

  requestAnimationFrame(animateToComplete);
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.transition = 'opacity 0.5s ease-out';
    loadingScreen.style.opacity = '0';

    setTimeout(() => {
      loadingScreen.style.display = 'none';

      // Show idle camera screen (scan overlay)
      const idleCameraScreen = document.getElementById('idleCameraScreen');
      if (idleCameraScreen) {
        idleCameraScreen.classList.remove('hidden');
        idleCameraScreen.style.opacity = '0';
        idleCameraScreen.style.transition = 'opacity 0.3s ease-in';
        // Trigger reflow
        idleCameraScreen.offsetHeight;
        idleCameraScreen.style.opacity = '1';
      }
    }, 500);
  }
}

// Start loading progress when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing AR Experience...');
  startLoadingProgress();
});

// Hide loader when NFT markers are loaded
window.addEventListener('arjs-nft-loaded', function () {
  console.log('✅ NFT Marker loaded successfully!');
  completeLoading();
});

// Fallback: hide loader after 10 seconds if event doesn't fire
setTimeout(function () {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen && loadingScreen.style.display !== 'none') {
    console.log('⚠️ Loader timeout - hiding anyway');
    completeLoading();
  }
}, 10000);

// Log scene loaded
const scene = document.querySelector('a-scene');
if (scene) {
  scene.addEventListener('loaded', function () {
    console.log('🎬 A-Frame scene loaded');
  });
}

// ============================================
// Add gesture controls component (pinch to zoom) with sound support
// ============================================
AFRAME.registerComponent('gesture-handler', {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.01 },
    maxScale: { default: 10 },
    instrumentType: { default: '' },
  },
  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);

    this.isVisible = false;
    this.initialScale = this.el.object3D.scale.clone();
    this.scaleFactor = 1;

    // Throttle sound playing to avoid rapid repeats
    this.lastSoundTime = 0;
    this.soundCooldown = 150; // milliseconds between sound triggers

    this.el.sceneEl.addEventListener('markerFound', (e) => {
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener('markerLost', (e) => {
      this.isVisible = false;
      // Stop sounds when marker is lost
      this.stopAllSounds();
    });
  },
  update: function () {
    if (this.data.enabled) {
      this.el.sceneEl.addEventListener('onefingermove', this.handleRotation);
      this.el.sceneEl.addEventListener('twofingermove', this.handleScale);
    }
  },
  remove: function () {
    this.el.sceneEl.removeEventListener('onefingermove', this.handleRotation);
    this.el.sceneEl.removeEventListener('twofingermove', this.handleScale);
  },

  // Play sound with cooldown using Howler.js
  playSound: function (instrumentType) {
    const now = Date.now();
    if (now - this.lastSoundTime > this.soundCooldown) {
      this.lastSoundTime = now;
      if (sounds[instrumentType]) {
        sounds[instrumentType].play();
      }
    }
  },

  // Stop all sounds using Howler.js
  stopAllSounds: function () {
    if (sounds.maracas) {
      sounds.maracas.stop();
    }
    if (sounds.trumpet) {
      sounds.trumpet.stop();
    }
  },

  handleRotation: function (event) {
    if (this.isVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;

      // Play maracas sound when rotating maracas model
      if (this.data.instrumentType === 'maracas') {
        // Calculate movement intensity
        const movement =
          Math.abs(event.detail.positionChange.x) +
          Math.abs(event.detail.positionChange.y);
        if (movement > 0.5) {
          // Only play if movement is significant
          this.playSound('maracas');
          console.log('🎵 Maracas shake!');
        }
      }
    }
  },
  handleScale: function (event) {
    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;
      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;

      // Play trumpet sound when zooming trumpet model
      if (this.data.instrumentType === 'trumpet') {
        // Play sound on zoom gesture
        const zoomIntensity = Math.abs(event.detail.spreadChange);
        if (zoomIntensity > 2) {
          // Only play if zoom is significant
          this.playSound('trumpet');
          console.log('🎺 Trumpet blast!');
        }
      }
    }
  },
});
