// ============================================
// Instrument Config Loader
// ============================================

// Global config storage
let instrumentConfig = null;
const sounds = {};

/**
 * Load instrument configuration from JSON file
 */
async function loadInstrumentConfig() {
  try {
    const response = await fetch('/assets/data/instrument-config.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();
    instrumentConfig = config;
    console.log(
      '✅ Instrument config loaded:',
      config.instruments.length,
      'instruments'
    );
    return config;
  } catch (error) {
    console.error('❌ Failed to load instrument config:', error);
    return null;
  }
}

/**
 * Load sounds for all instruments from config
 */
function loadSounds() {
  if (!instrumentConfig) {
    console.error('❌ Config not loaded');
    return;
  }

  instrumentConfig.instruments.forEach((instrument) => {
    sounds[instrument.id] = new Howl({
      src: [instrument.soundPath],
      volume: 1.0,
      loop: instrument.soundLoop || false,
      preload: true,
      onload: () => console.log(`🎶 ${instrument.name} sound loaded`),
      onloaderror: (id, err) =>
        console.error(`${instrument.name} load error:`, err),
    });
  });

  // Resume Howler context if suspended
  if (Howler.ctx && Howler.ctx.state === 'suspended') {
    Howler.ctx.resume().then(() => {
      console.log('🔊 Howler AudioContext resumed');
    });
  }

  console.log('✅ All sounds initialized!');
}

/**
 * Create NFT markers dynamically in A-Frame scene
 */
function createNftMarkers() {
  if (!instrumentConfig) {
    console.error('❌ Config not loaded');
    return;
  }

  const container = document.getElementById('nft-markers-container');
  if (!container) {
    console.error('❌ NFT markers container not found');
    return;
  }

  instrumentConfig.instruments.forEach((instrument) => {
    // Create a-nft element
    const nft = document.createElement('a-nft');
    nft.setAttribute('markerhandler', '');
    nft.setAttribute('type', 'nft');
    nft.setAttribute('url', instrument.nftPath);
    nft.setAttribute('smooth', 'true');
    nft.setAttribute('smoothCount', '10');
    nft.setAttribute('smoothTolerance', '.01');
    nft.setAttribute('smoothThreshold', '5');

    // Create a-entity for 3D model
    const entity = document.createElement('a-entity');
    entity.setAttribute('id', `${instrument.id}Model`);
    entity.setAttribute('gltf-model', instrument.modelPath);
    entity.setAttribute(
      'scale',
      `${instrument.scale[0]} ${instrument.scale[1]} ${instrument.scale[2]}`
    );
    entity.setAttribute(
      'position',
      `${instrument.position[0]} ${instrument.position[1]} ${instrument.position[2]}`
    );
    entity.setAttribute(
      'rotation',
      `${instrument.rotation[0]} ${instrument.rotation[1]} ${instrument.rotation[2]}`
    );
    entity.setAttribute('animation-mixer', '');
    entity.setAttribute('gesture-handler', `instrumentType: ${instrument.id}`);

    // Append entity to nft, then nft to container
    nft.appendChild(entity);
    container.appendChild(nft);

    console.log(`🎸 Created NFT marker for ${instrument.name}`);
  });

  console.log('✅ All NFT markers created!');
}

/**
 * Get instrument data by ID from config
 */
function getInstrumentById(id) {
  if (!instrumentConfig) return null;
  return instrumentConfig.instruments.find((i) => i.id === id);
}

/**
 * Get instrument data by matching any part of the NFT path
 */
function getInstrumentByNftPath(path) {
  if (!instrumentConfig) return null;
  return instrumentConfig.instruments.find((i) => path.includes(i.id));
}

/**
 * Play sound for a specific instrument
 */
function playInstrumentSound(instrumentId) {
  const instrument = getInstrumentById(instrumentId);
  if (!instrument) {
    console.warn(`⚠️ Instrument ${instrumentId} not found in config`);
    return;
  }

  const sound = sounds[instrumentId];
  if (!sound) {
    console.warn(`⚠️ Sound for ${instrumentId} not loaded`);
    return;
  }

  // Stop and play
  sound.stop();
  sound.play();
  console.log(`🎵 Playing ${instrument.name}`);

  return sound;
}

/**
 * Stop sound for a specific instrument
 */
function stopInstrumentSound(instrumentId) {
  const sound = sounds[instrumentId];
  if (sound) {
    sound.stop();
    console.log(`🔇 Stopped ${instrumentId}`);
  }
}

/**
 * Stop all sounds
 */
function stopAllSounds() {
  Object.keys(sounds).forEach((id) => {
    sounds[id].stop();
  });
  console.log('🔇 All sounds stopped');
}

// Export functions for use in other scripts
window.InstrumentLoader = {
  loadConfig: loadInstrumentConfig,
  loadSounds,
  createNftMarkers,
  getInstrumentById,
  getInstrumentByNftPath,
  playSound: playInstrumentSound,
  stopSound: stopInstrumentSound,
  stopAllSounds,
  getSounds: () => sounds,
  getConfig: () => instrumentConfig,
};
