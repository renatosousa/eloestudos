import { runLlmTask } from './llm-service.js';

export async function generateStudyPlan({ editalText, profile }) {
  const prompt = `Gere um cronograma de estudos com base no edital e no perfil:\n\nEdital:\n${editalText}\n\nPerfil:\n${JSON.stringify(profile)}`;

  return runLlmTask({
    taskType: 'study_plan',
    qualityRequired: 'medium',
    urgency: 'sync',
    prompt
  });
}
