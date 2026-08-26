/**
 * SmritiNER Adaptive AI / ML Cognitive Engine (Simulated Dynamic Difficulty Adjustment)
 * Calculates cognitive metrics, reaction speeds, fatigue indices, and auto-scales parameters.
 */

export class CognitiveAIEngine {
  constructor() {
    this.currentLevel = 1; // 1 = Easy (2x2), 2 = Medium (3x2 or 3x4), 3 = High (4x4)
    this.reactionHistory = [];
    this.errorCount = 0;
    this.successCount = 0;
    this.startTime = null;
  }

  startSession() {
    this.startTime = Date.now();
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
      : 2500;

    // Cognitive Performance Index (0 - 100)
    let score = (accuracyRate * 0.6) + Math.max(0, (5000 - avgReactionTimeMs) / 5000 * 40);
    score = Math.min(100, Math.max(20, Math.round(score)));

    // AI Scaling Recommendation
    let recommendation = 'STABLE';
    let targetLevel = this.currentLevel;

    if (accuracyRate > 85 && avgReactionTimeMs < 3000 && totalActions >= 4) {
      recommendation = 'SCALE_UP';
      targetLevel = Math.min(3, this.currentLevel + 1);
    } else if ((accuracyRate < 60 || avgReactionTimeMs > 6000 || this.errorCount >= 4) && totalActions >= 3) {
      recommendation = 'SCALE_DOWN';
      targetLevel = Math.max(1, this.currentLevel - 1);
    }

    // MMSE equivalent estimate (0 - 30)
    const mmseEstimate = Math.round((score / 100) * 12 + 18);

    return {
      accuracyRate,
      avgReactionTimeMs,
      cognitiveScore: score,
      recommendation,
      targetLevel,
      mmseEstimate,
      errorCount: this.errorCount,
      successCount: this.successCount
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
