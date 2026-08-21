export type CaseData = {
  title: string;
  meta: string;
  thumb: string;
  verdictBadge: string;
  verdictClass: 'manipulated' | 'suspicious' | 'verified' | 'unverified';
  verdictHeading: string;
  verdictScore: string;
  verdictSummary: string;
  identityBadge: string;
  forensicBadge: string;
  originBadge: string;
  claimsBadge: string;
  commentBadge: string;
};

export let casesData: Record<string, CaseData> = {
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
};

export const addDynamicCase = (key: string, data: CaseData) => {
  casesData[key] = data;
};
