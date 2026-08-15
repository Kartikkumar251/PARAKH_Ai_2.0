/**
 * PARAKH AI — Core Interactive Application Logic
 * Comprehensive multi-page verification platform controller
 */

// State Management
const appState = {
  currentPage: 'page-auth',
  currentCase: 'deepfake_speech',
  activeInputMode: 'link',
  elaOpacity: 0.65,
  casesData: {
    deepfake_speech: {
      title: 'Viral Video: "Foreign Ministry Envoy Confession"',
      meta: 'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 • Source: x.com/status/17892182049102 • Length: 0:42s',
      thumb: '🎥',
      verdictBadge: '⚠️ Likely Manipulated (89% Confidence)',
      verdictClass: 'manipulated',
      verdictHeading: 'Synthetic Audio-Visual Splice of 2022 Munich Conference',
      verdictScore: '89%',
      verdictSummary: 'PARAKH AI conclusive analysis confirms this viral content is an AI-generated deepfake. The underlying footage originates from a legitimate 2022 panel discussion, but the facial mouth region has been resynthesized via Wav2Lip to match a fabricated English audio monologue regarding energy sanctions. Inconsistent photometric illumination, phoneme timing discrepancies, and matching donor clips confirm intentional digital manipulation.',
      identityBadge: 'Manipulated (89% AI Face Swap)',
      forensicBadge: 'Artifacts Flagged',
      originBadge: 'Recycled Timeline',
      claimsBadge: 'Claims Disputed',
      commentBadge: 'Bot Astroturfing (39%)'
    },
    recycled_photo: {
      title: 'Viral Image: "Submerged Bridge Disaster in Geneva"',
      meta: 'SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069 • Source: t.me/euro_breaking/8831 • Size: 4.2MB',
      thumb: '🖼️',
      verdictBadge: '⚠️ Misleading / Recycled Context (94% Confidence)',
      verdictClass: 'suspicious',
      verdictHeading: 'Authentic 2017 South American Flood Photo Re-captioned as Geneva',
      verdictScore: '94%',
      verdictSummary: 'The image itself is photochemically authentic with no generative AI artifacts; however, it has been stripped of metadata and weaponized with false geographic context. Reverse-image triangulation confirms the photograph was taken in March 2017 in Peru, not present-day Europe.',
      identityBadge: 'Location Mismatch',
      forensicBadge: 'EXIF Stripped / No AI Synthesis',
      originBadge: 'First Seen: March 2017 (Peru)',
      claimsBadge: 'Geographic Claim FALSE',
      commentBadge: 'Community Debunk Active'
    },
    authentic_release: {
      title: 'Official Bulletin: "Global Pandemic Accord Resolution Draft"',
      meta: 'SHA256: 4a6c8e310034a81d113426e2df4a51152a514d3f545465a39626c91a039775e5 • Source: who.int/news/item/2026 • Format: PDF/Doc',
      thumb: '📄',
      verdictBadge: '✅ Verified Authentic (99% Confidence)',
      verdictClass: 'verified',
      verdictHeading: 'Cryptographically Verified Official Health Policy Statement',
      verdictScore: '99%',
      verdictSummary: 'PARAKH AI validation confirms complete cryptographic integrity. The digital signatures match verified governmental agency certificates, timestamps correlate across international wire archives, and claims accurately reflect official parliamentary records without alteration.',
      identityBadge: 'Signatures Verified',
      forensicBadge: 'Zero Artifacts / Cryptographically Signed',
      originBadge: 'Original Press Wire Source',
      claimsBadge: '100% Policy Match',
      commentBadge: 'Organic Public Engagement'
    }
  }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Check URL hash for direct routing if present
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    navigateToPage(hash);
  } else {
    navigateToPage('page-auth');
  }

  setupDropzones();
});

/**
 * Switch page views smoothly
 */
function navigateToPage(pageId) {
  const pages = document.querySelectorAll('.page-view');
  pages.forEach(page => {
    page.classList.remove('active-page');
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    // Scroll to very top instantly before rendering the new page
    window.scrollTo({ top: 0, behavior: 'instant' });

    targetPage.classList.add('active-page');
    appState.currentPage = pageId;
    window.location.hash = pageId;

    // Update Nav Bar Tab Buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));
    const navBtnMap = {
      'page-auth': 'nav-btn-auth',
      'page-home': 'nav-btn-home',
      'page-analysis': 'nav-btn-analysis',
      'page-verdict': 'nav-btn-verdict'
    };
    const activeBtn = document.getElementById(navBtnMap[pageId]);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

/**
 * Authentication Mode Switcher (Login / Signup)
 */
function switchAuthMode(mode) {
  const loginBtn = document.getElementById('auth-tab-login');
  const signupBtn = document.getElementById('auth-tab-signup');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (mode === 'login') {
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
    submitBtn.querySelector('span').textContent = 'Enter Verification Terminal';
  } else {
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
    submitBtn.querySelector('span').textContent = 'Create Analyst Account';
  }
}

/**
 * Handle Auth Form Submit
 */
function handleAuthSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('auth-email').value;
  showToast(`✅ Authenticated as ${email}`, 'success');
  
  setTimeout(() => {
    navigateToPage('page-home');
  }, 400);
}

/**
 * Quick Login Demo Helper
 */
function quickLoginDemo(providerName) {
  showToast(`⚡ Signed in via ${providerName}`, 'success');
  setTimeout(() => {
    navigateToPage('page-home');
  }, 350);
}

/**
 * Switch Input Mode in Dashboard (Link / Image / Video)
 */
function switchInputMode(mode) {
  appState.activeInputMode = mode;

  // Update tabs
  document.querySelectorAll('.input-mode-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`mode-btn-${mode}`).classList.add('active');

  // Update panels
  document.querySelectorAll('.input-content-panel').forEach(p => p.classList.remove('active-panel'));
  document.getElementById(`panel-input-${mode}`).classList.add('active-panel');
}

/**
 * Clear Link Field
 */
function clearLinkInput() {
  const input = document.getElementById('target-link-input');
  input.value = '';
  input.focus();
}

/**
 * Drag and Drop & File Upload handling
 */
function setupDropzones() {
  const dropzones = [
    { zone: document.getElementById('image-dropzone'), input: document.getElementById('image-file-input'), type: 'image' },
    { zone: document.getElementById('video-dropzone'), input: document.getElementById('video-file-input'), type: 'video' }
  ];

  dropzones.forEach(({ zone, input, type }) => {
    if (!zone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
      });
    });

    zone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelected({ files: e.dataTransfer.files }, type);
      }
    });
  });
}

function triggerFileSelect(type) {
  document.getElementById(`${type}-file-input`).click();
}

function handleFileSelected(inputElement, type) {
  if (inputElement.files && inputElement.files[0]) {
    const file = inputElement.files[0];
    const label = document.getElementById(`${type}-dropzone-label`);
    if (label) {
      label.innerHTML = `Selected file: <strong style="color: var(--accent-cyan);">${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    }
    showToast(`📂 Loaded ${file.name} for inspection`, 'info');
  }
}

/**
 * Load Sample Cases
 */
function loadPresetCase(caseKey) {
  appState.currentCase = caseKey;
  const data = appState.casesData[caseKey];

  if (caseKey === 'deepfake_speech') {
    switchInputMode('link');
    document.getElementById('target-link-input').value = 'https://x.com/breaking_geopol/status/17892182049102';
  } else if (caseKey === 'recycled_photo') {
    switchInputMode('image');
    document.getElementById('image-dropzone-label').innerHTML = `Preset loaded: <strong style="color: var(--accent-cyan);">geneva_flood_disaster_recycled.jpg</strong> (4.2 MB)`;
  } else if (caseKey === 'authentic_release') {
    switchInputMode('link');
    document.getElementById('target-link-input').value = 'https://who.int/news/item/2026/resolution-draft-verified';
  }

  showToast(`🎯 Loaded preset case: ${data.title}`, 'info');
}

function loadHistoryItem(caseKey) {
  loadPresetCase(caseKey);
  navigateToPage('page-analysis');
}

/**
 * Execute Verification Pipeline Scan Simulation
 */
function runInvestigationScan() {
  const ctaBtn = document.getElementById('start-analysis-btn');
  const originalText = ctaBtn.innerHTML;

  ctaBtn.innerHTML = `
    <span class="pulse-dot" style="background: #07090e;"></span>
    <span>Orchestrating 5-Stage Forensics...</span>
  `;
  ctaBtn.style.pointerEvents = 'none';

  showToast('🔍 Initializing biometric, ELA & origin neural checkpoints...', 'info');

  setTimeout(() => {
    ctaBtn.innerHTML = originalText;
    ctaBtn.style.pointerEvents = 'auto';
    navigateToPage('page-analysis');
    showToast('✨ 5 Forensic Engines completed analysis in 1.4s', 'success');
  }, 850);
}

/**
 * Toggle Accordion on Results Page
 */
function toggleCardAccordion(cardIndex) {
  const card = document.getElementById(`inv-card-${cardIndex}`);
  if (card) {
    card.classList.toggle('expanded');
  }
}

function jumpToFeatureInResults(cardIndex) {
  navigateToPage('page-analysis');
  setTimeout(() => {
    const card = document.getElementById(`inv-card-${cardIndex}`);
    if (card) {
      card.classList.add('expanded');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

/**
 * Toggle ELA Heatmap Layer Opacity
 */
function toggleHeatmapOpacity() {
  const heatmap = document.getElementById('heatmap-layer');
  if (!heatmap) return;
  
  if (appState.elaOpacity > 0.1) {
    appState.elaOpacity = 0.05;
    showToast('👁️ ELA layer hidden (Viewing raw input)', 'info');
  } else {
    appState.elaOpacity = 0.65;
    showToast('🔬 ELA heatmap overlay activated', 'info');
  }
  heatmap.style.opacity = appState.elaOpacity;
}

/**
 * Toggle Findings rows in Page 4
 */
function toggleFindingRow(rowElement) {
  rowElement.classList.toggle('open');
}

/**
 * Modals & PDF Sharing
 */
function openShareModal() {
  document.getElementById('share-modal').classList.add('active-modal');
}

function closeShareModal() {
  document.getElementById('share-modal').classList.remove('active-modal');
}

function copyShareUrl() {
  const input = document.getElementById('share-url-input');
  input.select();
  navigator.clipboard.writeText(input.value);
  showToast('📋 Copied verification URL to clipboard!', 'success');
}

function exportReportPDF() {
  showToast('🖨️ Opening print formatting dialog for PDF export...', 'info');
  setTimeout(() => {
    window.print();
  }, 300);
}

function openProfileModal() {
  showToast('👤 Analyst Account: Investigator Dev (Clearance Level 4)', 'info');
}

/**
 * Lightweight Toast Notification Dispatcher
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '❌';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
