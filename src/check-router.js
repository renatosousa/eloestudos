import { LLMRouter } from './llm/router.js';

const router = new LLMRouter();

const cases = [
  {
    name: 'pdf async low cost',
    input: { taskType: 'pdf_ingestion', urgency: 'async', maxCostUsd: 0.005 },
    assert: (r) => r.model === 'cursor/fast-economy' && r.maxTokens <= 1500
  },
  {
    name: 'study plan default',
    input: { taskType: 'study_plan' },
    assert: (r) => r.model === 'cursor/standard'
  },
  {
    name: 'advanced summary high quality',
    input: { taskType: 'knowledge_summary', qualityRequired: 'high' },
    assert: (r) => r.model === 'cursor/premium' && r.maxTokens === 5000
  }
];

for (const testCase of cases) {
  const output = router.route(testCase.input);
  if (!testCase.assert(output)) {
    console.error(`FAIL: ${testCase.name}`, output);
    process.exit(1);
  }
  console.log(`PASS: ${testCase.name}`);
}
