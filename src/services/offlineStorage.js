/**
 * SmritiNER Offline-First Storage Engine & Cloud Sync Manager
 * Supports low connectivity in North East India hilly terrains.
 */

const STORAGE_KEYS = {
  SESSIONS: 'smriti_game_sessions',
  HYDRATION: 'smriti_hydration_log',
  MEDICATIONS: 'smriti_medications',
  PENDING_SYNC: 'smriti_pending_sync_queue',
  SETTINGS: 'smriti_user_settings'
};

export class OfflineSyncEngine {
  constructor() {
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this.listeners = [];

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnlineStatus(true));
      window.addEventListener('offline', () => this.handleOnlineStatus(false));
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l({
      isOnline: this.isOnline,
      pendingCount: this.getPendingSyncQueue().length
    }));
  }

  handleOnlineStatus(online) {
    this.isOnline = online;
    this.notify();
    if (online) {
      this.autoSync();
    }
  }

  getPendingSyncQueue() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PENDING_SYNC);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  savePendingSyncItem(item) {
    const queue = this.getPendingSyncQueue();
    queue.push({
      ...item,
      timestamp: new Date().toISOString(),
      id: 'sync_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6)
    });
    localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(queue));
    this.notify();
  }

  saveGameSession(sessionData) {
    try {
      const sessions = this.getGameSessions();
      sessions.unshift({
        ...sessionData,
        id: 'session_' + Date.now(),
        date: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions.slice(0, 50)));

      // Enqueue sync if offline
      this.savePendingSyncItem({ type: 'GAME_SESSION', payload: sessionData });
    } catch (e) {
      console.warn('Local storage error:', e);
    }
  }

  getGameSessions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async forceCloudSync() {
    const queue = this.getPendingSyncQueue();
    if (queue.length === 0) return { success: true, count: 0 };

    // Simulate Network Latency to Cloud Server in NER
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Clear sync queue
    localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify([]));
    this.notify();

    return { success: true, count: queue.length };
  }

  autoSync() {
    if (this.isOnline && this.getPendingSyncQueue().length > 0) {
      this.forceCloudSync();
    }
  }
}

export const offlineSyncEngine = new OfflineSyncEngine();
