import { runLlmTask } from '../services/llm-service.js';

export async function processPdfIngestionJob({ extractedText }) {
  const prompt = `Classifique e estruture as questões da prova:\n\n${extractedText}`;

  return runLlmTask({
    taskType: 'pdf_ingestion',
    urgency: 'async',
    qualityRequired: 'low',
    maxCostUsd: 0.005,
    prompt,
    responseSchema: {
      type: 'object',
      properties: {
        questions: { type: 'array' }
      },
      required: ['questions']
    }
  });
}
