import { generateStudyPlan } from './services/study-plan.js';

const result = await generateStudyPlan({
  editalText: 'Português, Direito Constitucional, Informática. Prova em 90 dias.',
  profile: {
    hoursPerDay: 3,
    levelBySubject: { portugues: 'medio', constitucional: 'baixo', informatica: 'baixo' }
  }
});

console.log(JSON.stringify(result, null, 2));
