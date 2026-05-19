/**
 * Task-first model router for Cursor SDK.
 */

/** @typedef {'pdf_ingestion'|'study_plan'|'knowledge_summary'} TaskType */
/** @typedef {'low'|'medium'|'high'} Quality */
/** @typedef {'sync'|'async'} Urgency */

/** @typedef {{
 * taskType: TaskType,
 * qualityRequired?: Quality,
 * urgency?: Urgency,
 * maxCostUsd?: number
 * }} RouteInput */

/** @typedef {{
 * model: string,
 * temperature: number,
 * maxTokens: number,
 * fallbackModel?: string
 * }} RouteResult */

const DEFAULTS = {
  pdf_ingestion: {
    model: 'cursor/fast-economy',
    temperature: 0.15,
    maxTokens: 2_000,
    fallbackModel: 'cursor/standard'
  },
  study_plan: {
    model: 'cursor/standard',
    temperature: 0.3,
    maxTokens: 3_000,
    fallbackModel: 'cursor/premium'
  },
  knowledge_summary: {
    model: 'cursor/premium',
    temperature: 0.5,
    maxTokens: 4_000,
    fallbackModel: 'cursor/standard'
  }
};

export class LLMRouter {
  /** @param {RouteInput} input */
  route(input) {
    const { taskType, qualityRequired = 'medium', urgency = 'sync', maxCostUsd } = input;

    const base = { ...DEFAULTS[taskType] };

    if (taskType === 'pdf_ingestion' && urgency === 'async') {
      base.maxTokens = Math.min(base.maxTokens, 1500);
    }

    if (taskType === 'knowledge_summary' && qualityRequired === 'high') {
      base.temperature = 0.45;
      base.maxTokens = 5_000;
    }

    if (typeof maxCostUsd === 'number' && maxCostUsd < 0.01) {
      return {
        model: 'cursor/fast-economy',
        temperature: 0.1,
        maxTokens: 1_200,
        fallbackModel: base.model
      };
    }

    return base;
  }
}
