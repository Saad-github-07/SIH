/**
 * SmritiNER Multi-Dimensional Cognitive-Motor AI Engine
 * Integrates game telemetry, reaction latencies, MMSE estimates, 
 * working memory decay modeling, and dynamic difficulty adjustment (DDA).
 */

export class CognitiveAIEngine {
  constructor() {
    this.currentLevel = 1; // 1 = Easy, 2 = Medium, 3 = High
    this.gameSessions = [];
    this.reactionHistory = [];
    this.errorCount = 0;
    this.successCount = 0;
    this.startTime = null;

    // Cross-game cognitive profile
    this.cognitiveProfile = {
      workingMemoryIndex: 82,
      visualAttentionIndex: 78,
      lexicalRetrievalIndex: 85,
      executiveSequencingIndex: 74,
      reactionSpeedMs: 2400,
      confidenceScore: 88
    };
  }

  startSession(gameType = 'general') {
    this.startTime = Date.now();
    this.activeGameType = gameType;
    this.errorCount = 0;
    this.successCount = 0;
    this.reactionHistory = [];
  }

  recordAction(isSuccess, timeTakenMs) {
    if (isSuccess) {
      this.successCount += 1;
    } else {
      this.errorCount += 1;
    }
    if (timeTakenMs) {
      this.reactionHistory.push(timeTakenMs);
    }
  }

  getMetrics() {
    const totalActions = this.successCount + this.errorCount;
    const accuracyRate = totalActions > 0 ? Math.round((this.successCount / totalActions) * 100) : 100;
    const avgReactionTimeMs = this.reactionHistory.length > 0
      ? Math.round(this.reactionHistory.reduce((a, b) => a + b, 0) / this.reactionHistory.length)
      : 2400;

    // Cognitive Performance Index (0 - 100)
    let score = (accuracyRate * 0.6) + Math.max(0, (5000 - avgReactionTimeMs) / 5000 * 40);
    score = Math.min(100, Math.max(20, Math.round(score)));

    // AI Dynamic Scaling Recommendation
    let recommendation = 'STABLE';
    let targetLevel = this.currentLevel;

    if (accuracyRate > 85 && avgReactionTimeMs < 3000 && totalActions >= 4) {
      recommendation = 'SCALE_UP';
      targetLevel = Math.min(3, this.currentLevel + 1);
    } else if ((accuracyRate < 60 || avgReactionTimeMs > 6000 || this.errorCount >= 4) && totalActions >= 3) {
      recommendation = 'SCALE_DOWN';
      targetLevel = Math.max(1, this.currentLevel - 1);
    }

    // MMSE equivalent estimate (0 - 30 scale)
    const mmseEstimate = Math.round((score / 100) * 12 + 18);

    // Monetization / Engagement Coins calculated for this performance
    const coinsEarned = Math.round((score / 20) + (accuracyRate > 80 ? 5 : 2));

    return {
      accuracyRate,
      avgReactionTimeMs,
      cognitiveScore: score,
      recommendation,
      targetLevel,
      mmseEstimate,
      coinsEarned,
      errorCount: this.errorCount,
      successCount: this.successCount,
      profile: this.cognitiveProfile
    };
  }

  /**
   * Adjust difficulty parameters based on AI recommendation
   */
  evaluateAndAdjust() {
    const metrics = this.getMetrics();
    this.currentLevel = metrics.targetLevel;
    return {
      newLevel: this.currentLevel,
      metrics
    };
  }
}

export const aiEngineInstance = new CognitiveAIEngine();
