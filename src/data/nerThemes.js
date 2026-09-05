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
  { id: 'pepa', name: 'Buffalo Horn Pepa', category: 'Music', icon: '🎺', color: '#9d0208', hint: 'Traditional horn instrument of Bihu' },
  { id: 'lotus', name: 'Sacred Lotus', category: 'Nature', icon: '🪷', color: '#e0aaff', hint: 'Divine flower blooming in NER lakes' },
  { id: 'tamul_paan', name: 'Tamul Paan', category: 'Tradition', icon: '🍃', color: '#52b788', hint: 'Betel nut offering for respected elders' },
  { id: 'bell_brass', name: 'Namghar Brass Bell', category: 'Spiritual', icon: '🔔', color: '#fca311', hint: 'Rung during evening kirtan' },
];

export const NER_FAUNA_PATTERNS = [
  { id: 'rhino', name: 'One-Horned Rhino', region: 'Kaziranga, Assam', icon: '🦏', fact: 'Symbol of Kaziranga National Park' },
  { id: 'sangai', name: 'Sangai Dancing Deer', region: 'Loktak, Manipur', icon: '🦌', fact: 'Brow-antlered deer living on floating phumdis' },
  { id: 'hornbill', name: 'Great Indian Hornbill', region: 'Nagaland & Arunachal', icon: '🦜', fact: 'Venerated bird of North East forests' },
  { id: 'red_panda', name: 'Red Panda', region: 'Sikkim & Arunachal', icon: '🦊', fact: 'Playful inhabitant of high bamboo forests' },
  { id: 'gayal', name: 'Mithun / Gayal', region: 'Arunachal & Mizoram', icon: '🐃', fact: 'State animal of Arunachal and Nagaland' },
  { id: 'blue_vanda', name: 'Blue Vanda Orchid', region: 'NER Highlands', icon: '🪻', fact: 'Exquisite wild orchid of North East mountains' },
];

export const ROUTINE_LEVELS = [
  {
    id: 'morning',
    level: 1,
    title: 'Level 1: Peaceful Morning Routine',
    badge: 'Morning Wellness',
    icon: '🌅',
    steps: [
      { id: 1, title: '1. Morning Prayer / Naam', icon: '📿', desc: 'Tulsi beads & remembrance' },
      { id: 2, title: '2. Glass of Fresh Water', icon: '🥛', desc: 'Hydrate right after waking up' },
      { id: 3, title: '3. Morning Medicine', icon: '💊', desc: 'Pill taken with breakfast' },
      { id: 4, title: '4. Light Garden Walk', icon: '🏞️', desc: '15 minute walk in fresh air' },
      { id: 5, title: '5. Newspaper & Rest', icon: '📰', desc: 'Relax and read morning news' },
    ]
  },
  {
    id: 'afternoon',
    level: 2,
    title: 'Level 2: Afternoon Tea & Health Routine',
    badge: 'Afternoon Energy',
    icon: '☀️',
    steps: [
      { id: 1, title: '1. Nutritious Warm Lunch', icon: '🍲', desc: 'Rice, dal, vegetables' },
      { id: 2, title: '2. Afternoon Hydration & Rest', icon: '💧', desc: 'Drink water and gentle nap' },
      { id: 3, title: '3. Fresh Assam Tea & Pitha', icon: '☕', desc: 'Aromatic tea with snacks' },
      { id: 4, title: '4. Phone Call with Children', icon: '📞', desc: 'Talk with daughter/son' },
      { id: 5, title: '5. Evening Memory Game', icon: '🧠', desc: 'Daily mind puzzle time' },
    ]
  },
  {
    id: 'bihu',
    level: 3,
    title: 'Level 3: Festive Bihu & Heritage Celebration',
    badge: 'Cultural Master',
    icon: '🎉',
    steps: [
      { id: 1, title: '1. Washing & Offering Gamusa', icon: '🧣', desc: 'Blessing family with reverence' },
      { id: 2, title: '2. Making Sesame Til Pitha', icon: '🫓', desc: 'Rolling roasted rice cakes' },
      { id: 3, title: '3. Lighting Saki at Namghar', icon: '🪔', desc: 'Evening lamp prayer' },
      { id: 4, title: '4. Enjoying Bihu Dhol & Pepa', icon: '🥁', desc: 'Folk songs with family' },
      { id: 5, title: '5. Community Feast with Elders', icon: '🍛', desc: 'Celebrating together' },
    ]
  }
];

export const NER_SOUND_QUIZ_ITEMS = [
  {
    id: 'dhol_pepa',
    name: 'Bihu Dhol & Pepa Rhythm',
    icon: '🥁',
    audioDescription: 'Rhythmic drum beat and buffalo horn pipe sound during spring festival',
    audioFreq: 220,
    soundType: 'dhol',
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
    soundType: 'rain',
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
    soundType: 'bell',
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
    soundType: 'flute',
    options: ['Guitar', 'Traditional Bamboo Flute', 'Violin', 'Whistle'],
    correct: 1,
    hint: 'Soft folk melody made from bamboo'
  },
  {
    id: 'conch_shell',
    name: 'Sacred Conch (Shankha)',
    icon: '🐚',
    audioDescription: 'Auspicious blowing of the holy conch shell for evening blessing',
    audioFreq: 330,
    soundType: 'conch',
    options: ['Thunderstorm', 'Sacred Conch (Shankha)', 'Whistle', 'Car Horn'],
    correct: 1,
    hint: 'Blown during auspicious occasions and prayers'
  },
  {
    id: 'hornbill_call',
    name: 'Hornbill Forest Call',
    icon: '🦜',
    audioDescription: 'Deep reverberating call of the Great Indian Hornbill in mountain canopies',
    audioFreq: 260,
    soundType: 'bird',
    options: ['City Siren', 'Hornbill Forest Call', 'Rooster Crow', 'Cuckoo'],
    correct: 1,
    hint: 'Venerated bird of Nagaland and Arunachal forests'
  }
];

export const NER_WORD_RIDDLE_ITEMS = [
  {
    id: 'w1',
    word: 'GAMUSA',
    translation: 'গামোচা',
    meaning: 'Traditional handwoven towel of Assam gifted with respect',
    icon: '🧣',
    hint: 'Red & white cultural cloth worn around the neck',
    letters: ['G', 'A', 'M', 'U', 'S', 'A'],
    scrambled: ['M', 'G', 'U', 'A', 'A', 'S'],
    level: 1
  },
  {
    id: 'w2',
    word: 'JAAPI',
    translation: 'জাপি',
    meaning: 'Traditional conical hat made of woven bamboo & palm leaves',
    icon: '👒',
    hint: 'Conical bamboo hat used by farmers and during Bihu',
    letters: ['J', 'A', 'A', 'P', 'I'],
    scrambled: ['P', 'J', 'I', 'A', 'A'],
    level: 1
  },
  {
    id: 'w3',
    word: 'PITHA',
    translation: 'পিঠা',
    meaning: 'Traditional rice cake dessert made during harvesting festivals',
    icon: '🫓',
    hint: 'Sweet delicacy rolled with sesame or coconut',
    letters: ['P', 'I', 'T', 'H', 'A'],
    scrambled: ['T', 'P', 'A', 'I', 'H'],
    level: 2
  },
  {
    id: 'w4',
    word: 'LOKTAK',
    translation: 'লোকটাক',
    meaning: 'Largest freshwater lake in NE India, home of floating phumdis',
    icon: '🏝️',
    hint: 'Famous lake in Manipur with the dancing Sangai deer',
    letters: ['L', 'O', 'K', 'T', 'A', 'K'],
    scrambled: ['K', 'L', 'A', 'O', 'K', 'T'],
    level: 2
  },
  {
    id: 'w5',
    word: 'HORNBILL',
    translation: 'ধনেশ পক্ষী',
    meaning: 'Majestic bird celebrated during the famous Nagaland cultural festival',
    icon: '🦜',
    hint: 'Famous festival and bird of Nagaland',
    letters: ['H', 'O', 'R', 'N', 'B', 'I', 'L', 'L'],
    scrambled: ['B', 'H', 'L', 'O', 'L', 'R', 'I', 'N'],
    level: 3
  },
  {
    id: 'w6',
    word: 'KAZIRANGA',
    translation: 'কাজিৰঙা',
    meaning: 'World Heritage Sanctuary famous for the Great One-Horned Rhinoceros',
    icon: '🦏',
    hint: 'National park in Assam known for rhinos',
    letters: ['K', 'A', 'Z', 'I', 'R', 'A', 'N', 'G', 'A'],
    scrambled: ['R', 'K', 'A', 'G', 'Z', 'N', 'I', 'A', 'A'],
    level: 4
  }
];

export const FLORAL_GARDEN_ITEMS = [
  { id: 'kopou', name: 'Kopou Phool (Fox-tail Orchid)', icon: '🌸', color: '#ff70a6', points: 15, hint: 'Bihu spring orchid' },
  { id: 'tea_leaf', name: 'Golden Tea Leaf', icon: '🍃', color: '#52b788', points: 10, hint: 'Two leaves and a bud' },
  { id: 'lotus', name: 'Pink Lotus Blossom', icon: '🪷', color: '#f72585', points: 20, hint: 'Lake beauty' },
  { id: 'butterfly', name: 'Monsoon Butterfly', icon: '🦋', color: '#4cc9f0', points: 25, hint: 'Fluttering garden friend' },
  { id: 'blue_vanda', name: 'Blue Vanda Flower', icon: '🪻', color: '#7209b7', points: 15, hint: 'Highland mountain orchid' },
  { id: 'sunflower', name: 'Golden Sunflower', icon: '🌻', color: '#ffb703', points: 10, hint: 'Warm morning bloom' },
];

export const NER_BAZAAR_ITEMS = [
  { id: 'chai', name: 'Steaming Cup of Assam Chai', icon: '☕', price: 10, seller: 'Gopal Tea Stall', desc: 'Fresh garden tea with ginger and cardamom' },
  { id: 'til_pitha', name: 'Box of Fresh Til Pitha', icon: '🫓', price: 30, seller: 'Pohor Bihu Treats', desc: 'Crunchy sweet sesame roll cakes' },
  { id: 'bamboo_flute', name: 'Handmade Bamboo Flute', icon: '🪈', price: 50, seller: 'Kalyan Artisan Shop', desc: 'Carved bamboo musical instrument' },
  { id: 'gamusa_silk', name: 'Woven Muga Gamusa', icon: '🧣', price: 100, seller: 'Sualkuchi Silk Weavers', desc: 'Gold-threaded handloom ceremonial cloth' },
  { id: 'honey', name: 'Wild Sundarban / Kaziranga Honey', icon: '🍯', price: 60, seller: 'Forest Cooperative', desc: 'Pure raw honey from forest hives' },
  { id: 'tamul_bunch', name: 'Fresh Betel Leaves & Nuts', icon: '🍃', price: 20, seller: 'Local Haat Merchant', desc: 'Traditional hospitality offering' },
];

export const INITIAL_REMINISCENCE_CARDS = [
  {
    id: 1,
    name: 'Rahul Phukan',
    relationship: 'Son (পুত্র / ল’ৰা)',
    location: 'Guwahati, Assam',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    voiceMemoText: 'Kaka, this is your son Rahul! Remember we visited Kaziranga together last month?',
    frequentMemory: 'Enjoys morning walks together in Dighalipukhuri park'
  },
  {
    id: 2,
    name: 'Anamika Sharma',
    relationship: 'Daughter (কন্যা / ছোৱালী)',
    location: 'Shillong, Meghalaya',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    voiceMemoText: 'Deta, Anamika here! I made your favorite Til Pitha for your upcoming visit!',
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

export const ACHIEVEMENT_BADGES = [
  { id: 'b1', title: 'Daily Mind Champion', icon: '🏆', desc: 'Completed 3 mind exercises today', unlocked: true, color: '#f59e0b' },
  { id: 'b2', title: 'Tea Master Recall', icon: '🍃', desc: 'Perfect score on Memory Palace Level 2', unlocked: true, color: '#10b981' },
  { id: 'b3', title: 'Bihu Rhythm Virtuoso', icon: '🥁', desc: 'Identified all regional folk sounds', unlocked: true, color: '#ec4899' },
  { id: 'b4', title: 'Wildlife Spotter', icon: '🦏', desc: '5-step pattern completed without error', unlocked: false, color: '#3b82f6' },
  { id: 'b5', title: 'Bazaar Master', icon: '🪙', desc: 'Counted market coins accurately', unlocked: false, color: '#8b5cf6' },
  { id: 'b6', title: 'Family Guardian', icon: '💖', desc: 'Listened to all family memories', unlocked: true, color: '#ef4444' },
];

