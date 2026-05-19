import { runLlmTask } from './llm-service.js';

export async function generateAdvancedSummary({ contentChunk, userLevel }) {
  const prompt = `Resuma o conteúdo para nível ${userLevel}, mantendo precisão técnica e didática:\n\n${contentChunk}`;

  return runLlmTask({
    taskType: 'knowledge_summary',
    qualityRequired: 'high',
    urgency: 'sync',
    prompt
  });
}
