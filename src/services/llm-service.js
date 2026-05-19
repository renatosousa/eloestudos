import { LLMRouter } from '../llm/router.js';
import { invokeCursorSdk } from '../llm/providers/cursor.js';

const router = new LLMRouter();

/**
 * Unified entrypoint for all LLM tasks.
 */
export async function runLlmTask({ taskType, prompt, qualityRequired, urgency, maxCostUsd, responseSchema }) {
  const route = router.route({ taskType, qualityRequired, urgency, maxCostUsd });

  try {
    return await invokeCursorSdk({
      model: route.model,
      temperature: route.temperature,
      maxTokens: route.maxTokens,
      prompt,
      responseSchema
    });
  } catch (err) {
    if (!route.fallbackModel) throw err;

    return await invokeCursorSdk({
      model: route.fallbackModel,
      temperature: route.temperature,
      maxTokens: route.maxTokens,
      prompt,
      responseSchema
    });
  }
}
