export const NER_CULTURAL_THEMES = [
  { id: 'tea', name: 'Assam Tea Gardens', color: '#1b4332', bg: '#e8f5e9', accent: '#2d6a4f', icon: '🍃' },
  { id: 'root', name: 'Meghalaya Root Bridges', color: '#3d2645', bg: '#f3e5f5', accent: '#8338ec', icon: '🌿' },
  { id: 'loktak', name: 'Manipur Loktak Lake', color: '#005f73', bg: '#e0f7fa', accent: '#0a9396', icon: '🏝️' },
  { id: 'hornbill', name: 'Nagaland Hornbill Heritage', color: '#7f4f24', bg: '#fff3e0', accent: '#a68a64', icon: '🦤' },
  { id: 'tawang', name: 'Arunachal Snow & Pines', color: '#1d3557', bg: '#e3f2fd', accent: '#457b9d', icon: '🏔️' },
];

export const MEMORY_PALACE_ITEMS = [
  { id: 'gamusa', name: 'Assamese Gamusa', category: 'Attire', icon: '🧣', color: '#d90429', hint: 'Traditional woven red and white cloth' },
  { id: 'tea_basket', name: 'Tea Leaf Basket', category: 'Craft', icon: '🧺', color: '#38b000', hint: 'Bamboo basket used in tea gardens' },
  { id: 'pitha', name: 'Til Pitha', category: 'Food', icon: '🫓', color: '#ffb703', hint: 'Sweet rice roll with sesame and jaggery' },
  { id: 'jaapi', name: 'Traditional Jaapi', category: 'Craft', icon: '👒', color: '#fb8500', hint: 'Conical bamboo hat worn during Bihu' },
  { id: 'prayer_beads', name: 'Mala / Prayer Beads', category: 'Spiritual', icon: '📿', color: '#6b705c', hint: 'Tulsi beads for morning prayers' },
  { id: 'spectacles', name: 'Reading Spectacles', category: 'Routine', icon: '👓', color: '#023e8a', hint: 'Glasses for daily newspaper reading' },
  { id: 'med_box', name: 'Daily Pill Organizer', category: 'Routine', icon: '💊', color: '#e63946', hint: 'Morning and evening medicine container' },
  { id: 'bamboo_mug', name: 'Bamboo Tea Cup', category: 'Craft', icon: '🧉', color: '#588157', hint: 'Handcrafted bamboo mug for hot tea' },
];

export const NER_FAUNA_PATTERNS = [
  { id: 'rhino', name: 'One-Horned Rhino', region: 'Kaziranga, Assam', icon: '🦏', fact: 'Symbol of Kaziranga National Park' },
  { id: 'sangai', name: 'Sangai Dancing Deer', region: 'Loktak, Manipur', icon: '🦌', fact: 'Brow-antlered deer living on floating phumdis' },
  { id: 'hornbill', name: 'Great Indian Hornbill', region: 'Nagaland & Arunachal', icon: '🦜', fact: 'Venerated bird of North East forests' },
  { id: 'red_panda', name: 'Red Panda', region: 'Sikkim & Arunachal', icon: '🦊', fact: 'Playful inhabitant of high bamboo forests' },
  { id: 'gayal', name: 'Mithun / Gayal', region: 'Arunachal & Mizoram', icon: '🐃', fact: 'State animal of Arunachal and Nagaland' },
  { id: 'blue_vanda', name: 'Blue Vanda Orchid', region: 'NER Highlands', icon: '🪻', fact: 'Exquisite wild orchid of North East mountains' },
];

export const NER_SOUND_QUIZ_ITEMS = [
  {
    id: 'dhol_pepa',
    name: 'Bihu Dhol & Pepa Rhythm',
    icon: '🥁',
    audioDescription: 'Rhythmic drum beat and buffalo horn pipe sound during spring festival',
    audioFreq: 220, // Web Audio Synth Frequency simulation
    options: ['Bihu Dhol & Pepa', 'Temple Bell', 'Heavy Monsoon Rain', 'Bird Chirping'],
    correct: 0,
    hint: 'Celebrated in Assam during spring'
  },
  {
    id: 'rain_roof',
    name: 'Monsoon Rain on Tin Roof',
    icon: '🌧️',
    audioDescription: 'Soothe rhythm of gentle raindrops pattering on tin roofing sheet',
    audioFreq: 440,
    options: ['River Stream', 'Monsoon Rain on Tin Roof', 'Market Sounds', 'Wind Chimes'],
    correct: 1,
    hint: 'Very cozy sound heard during North East monsoons'
  },
  {
    id: 'namghar_bell',
    name: 'Namghar / Temple Bell',
    icon: '🔔',
    audioDescription: 'Resonant brass bell sound rung during evening prayers and Kirtan',
    audioFreq: 587,
    options: ['Train Horn', 'School Bell', 'Namghar / Temple Prayer Bell', 'Doorbell'],
    correct: 2,
    hint: 'Rung during evening prayers at Namghar or temple'
  },
  {
    id: 'bamboo_flute',
    name: 'Traditional Bamboo Flute',
    icon: '🪈',
    audioDescription: 'Melodious soothing melody played on native NER bamboo flute',
    audioFreq: 880,
    options: ['Guitar', 'Traditional Bamboo Flute', 'Violin', 'Whistle'],
    correct: 1,
    hint: 'Soft folk melody made from bamboo'
  }
];

export const INITIAL_REMINISCENCE_CARDS = [
  {
    id: 1,
    name: 'Rahul Phukan',
    relationship: 'Son (पुत्र / ল’ৰা)',
    location: 'Guwahati, Assam',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    voiceMemoText: 'Kaka, this is your son Rahul! Remember we visited Kaziranga last month?',
    frequentMemory: 'Enjoys morning walks together in Dighalipukhuri park'
  },
  {
    id: 2,
    name: 'Anamika Sharma',
    relationship: 'Daughter (कन्या / ছোৱালী)',
    location: 'Shillong, Meghalaya',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    voiceMemoText: 'Deta, Anamika here! I made your favorite Til Pitha for your visit!',
    frequentMemory: 'Calls every evening at 6 PM without fail'
  },
  {
    id: 3,
    name: 'Aarav Phukan',
    relationship: 'Grandson (নাতি)',
    location: 'Guwahati, Assam',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    voiceMemoText: 'Kaitu Kaka! Aarav here, ready to play the memory card game with you!',
    frequentMemory: 'Loves listening to Kaka tell stories about old times'
  }
];
