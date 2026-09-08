# SmritiNER 🧠🌸
### AI-Powered Cognitive Gaming & Memory Assistance Platform for Elderly Dementia Patients in the North Eastern Region (NER)

---

## 🌟 Overview & Mission
**SmritiNER** is a specialized, culturally resonant, AI-driven cognitive assistance and therapy platform designed specifically for elderly individuals and early-stage dementia patients across the North Eastern Region of India (Assam, Manipur, Meghalaya, Mizoram, Nagaland, Arunachal Pradesh, Tripura, and Sikkim).

By bridging cutting-edge **Adaptive AI Cognitive Game Engines**, **Multilingual Voice Interaction**, **Cultural Reminiscence Therapy**, **Smart Reminders**, and **Offline-First Synchronization**, SmritiNER empowers patients to maintain cognitive health while providing clinical visibility and peace of mind to family caregivers and healthcare workers.

---

## 🚀 Key Problem Statement Capabilities & Implementations

### 1. Interactive Cognitive Games & Activities
- **Memory Improvement (`MemoryPalaceGame`)**: Visual and spatial memory matching featuring culturally familiar NER items (Assamese Gamusa, Jaapi, Pitha, Tamul Paan, Traditional Tea Baskets, etc.).
- **Attention & Concentration (`PatternMatcherGame`)**: Spotting patterns and wildlife of North East India (Kaziranga One-Horned Rhino, Sangai Deer, Great Hornbill, Red Panda).
- **Daily Routine Recall (`RoutineSequencerGame`)**: Rebuilding executive functioning and daily habit sequences (Morning prayers, Medication, Breakfast, Afternoon tea, Evening walk).
- **Sensory & Object Recognition (`SoundQuizGame`)**: Multi-sensory sound recognition with authentic regional audio simulations (Bihu Dhol, Pepa horn, Meghalaya monsoon rain on tin roofs, temple/namghar bells).

### 2. Adaptive AI/ML Dynamic Difficulty Adjustment (DDA)
- **Real-Time Cognitive Metric Tracking**: Computes accuracy rate, reaction speed (ms), task completion rate, and fatigue indices.
- **Dynamic Difficulty Auto-Scaling**: Evaluates patient performance and scales difficulty parameters in real-time across 3 stages (*Mild / Stage 1*, *Moderate / Stage 2*, *Advanced / Stage 3*).
- **Estimated Mini-Mental State Examination (MMSE) Tracking**: Real-time cognitive scoring (0–100 scale and 0–30 MMSE estimate).

### 3. Multilingual & Voice-Assisted Interface
- **8 Supported Regional Languages**:
  1. **Assamese (অসমীয়া)** - Assam
  2. **Bengali (বাংলা)** - Assam & Tripura
  3. **Manipuri / Meeteilon (মৈতৈলোন্)** - Manipur
  4. **Mizo (Mizo ṭawng)** - Mizoram
  5. **Bodo (बर')** - Bodoland / Assam
  6. **Khasi** - Meghalaya
  7. **Hindi (हिन्दी)** - NER Wide
  8. **English** - Default
- **Smriti-Mitra Voice Assistant**: Speech synthesis guidance adapted for elder-friendly audio reinforcement across UI elements.

### 4. Culturally Familiar Themes & Reminiscence Therapy
- High-contrast, large-button design suitable for elderly motor and visual constraints.
- **Family Memory Wall**: Digital reminiscence photo gallery with voice note playback to foster emotional well-being and reduce anxiety or sundowning.

### 5. Smart Daily Assistance & Reminders
- **Medication Schedule Tracker**: Real-time status toggle (Mark as Taken) with timing and dosage.
- **Water Hydration Goal**: One-tap water glass logger with progress visualizer.
- **Medical & PHC Appointments**: Proactive visit reminders with direct call/location links.

### 6. Caregiver & Healthcare Worker Portal
- **7-Day Cognitive Performance Trajectory**: Interactive Recharts analytics tracking reaction speed trends, memory accuracy, and attention levels.
- **Automated Behavioral & Clinical Alerts**: Slower response warnings, missed medication alerts, and stability indicators.
- **Printable Clinical Neurological Report**: Exportable medical summary for geriatricians and community health workers (ASHAs/ANMs).

### 7. Low-Connectivity & Offline Synchronization
- **Offline-First Storage Engine**: Local caching of game sessions, memory scores, and reminders using IndexedDB and LocalStorage.
- **Appwrite Cloud Backend Integration**: Automatic background synchronization when network connectivity is restored in remote hill terrains and rural villages.

---

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite, Lucide Icons, Recharts, Canvas Confetti
- **Design System**: Vanilla CSS with glassmorphism, responsive high-contrast accessibility tokens, and Google Fonts (Outfit & Hind Siliguri)
- **AI Engine**: In-browser real-time Cognitive Assessment & DDA Engine (`aiEngine.js`)
- **Voice Engine**: Web Speech Synthesis API (`speechService.js`)
- **Backend & Cloud Sync**: Appwrite Cloud (`appwrite.js`) + Offline Storage Manager (`offlineStorage.js`)

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/your-username/SIH-main.git
cd SIH-main/SIH

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 🏛️ Project Architecture
```
SIH/
├── public/
├── src/
│   ├── components/
│   │   ├── caregiver/        # Clinical & Caregiver Analytics Dashboard
│   │   ├── common/           # Navbar, VoiceAssistant, Appwrite Auth Modal
│   │   ├── games/            # Memory Palace, Pattern Matcher, Routine, Sound Quiz
│   │   └── patient/          # Patient Dashboard, Reminders, Reminiscence Wall
│   ├── context/
│   │   └── AppContext.jsx    # Global State, Voice, Language, Offline Sync
│   ├── data/
│   │   ├── nerThemes.js      # Cultural artifacts, sounds, wildlife data
│   │   ├── sampleAnalytics.js# Baseline clinical and patient profiles
│   │   └── translations.js   # 8-language NER localization dictionary
│   ├── services/
│   │   ├── aiEngine.js       # Dynamic difficulty adjustment & cognitive scoring
│   │   ├── appwrite.js       # Appwrite cloud database & auth client
│   │   ├── offlineStorage.js # Offline queue & local cache manager
│   │   └── speechService.js  # Multilingual voice synthesis engine
│   ├── styles/
│   │   └── index.css         # Elder-accessible design system & tokens
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 👥 Impact
Designed with empathy for the unique socio-cultural and linguistic landscape of North East India, **SmritiNER** brings accessible digital healthcare and early cognitive intervention to every household, even in the most remote corners of the region.
