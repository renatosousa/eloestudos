# EloEstudos - LLM Router Skeleton

Estrutura inicial para orquestrar diferentes modelos via Cursor SDK conforme tipo de tarefa:

- `pdf_ingestion` (modelo econômico)
- `study_plan` (modelo intermediário)
- `knowledge_summary` (modelo avançado)

## Estrutura

- `src/llm/router.js`: política de roteamento por custo/qualidade/urgência.
- `src/llm/providers/cursor.js`: adapter para integrar o Cursor SDK real.
- `src/services/llm-service.js`: serviço unificado com fallback.
- `src/jobs/pdf-processing.js`: exemplo de pipeline assíncrono de ingestão.
- `src/services/study-plan.js`: geração de cronograma.
- `src/services/summary.js`: resumo avançado.

## Como testar a aplicação

> No estado atual, o provider do Cursor SDK está "stubado" (`stubbed-response`).
> Isso significa que você consegue validar o fluxo da aplicação sem custo de API.

### 1) Pré-requisito

- Node.js 18+ (ou versão compatível com ESM).

### 2) Rodar o exemplo principal

```bash
npm run example
```

Esse comando executa `src/example.js`, que chama `generateStudyPlan` e imprime no terminal o modelo selecionado, parâmetros e resposta stubada.

### 3) Rodar checks rápidos

```bash
npm run check
```

Esse comando roda, em sequência:

1. `npm run check:router` (valida decisões de roteamento)
2. `npm run check:example` (executa o fluxo de exemplo)

### 4) Testar cenários específicos

#### 4.1 Ingestão de PDF (simulada com texto extraído)

```bash
node -e "import('./src/jobs/pdf-processing.js').then(async m => { const r = await m.processPdfIngestionJob({ extractedText: 'Questão 1: ...' }); console.log(JSON.stringify(r, null, 2)); })"
```

#### 4.2 Resumo avançado

```bash
node -e "import('./src/services/summary.js').then(async m => { const r = await m.generateAdvancedSummary({ contentChunk: 'Texto de direito constitucional...', userLevel: 'intermediario' }); console.log(JSON.stringify(r, null, 2)); })"
```

## Próximos passos

1. Substituir `invokeCursorSdk` pela chamada real do SDK.
2. Adicionar fila (BullMQ/SQS/Rabbit) para jobs de PDF.
3. Adicionar validação de schema e métricas de custo por requisição.
