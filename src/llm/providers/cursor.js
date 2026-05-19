/**
 * Cursor SDK adapter (skeleton).
 * Replace the `invokeCursorSdk` body with your real SDK client call.
 */

/**
 * @param {{
 *  model: string,
 *  temperature: number,
 *  maxTokens: number,
 *  prompt: string,
 *  responseSchema?: object
 * }} params
 */
export async function invokeCursorSdk(params) {
  const { model, temperature, maxTokens, prompt, responseSchema } = params;

  // TODO: Plug in real Cursor SDK call.
  // Example shape kept generic on purpose.
  return {
    model,
    temperature,
    maxTokens,
    prompt,
    responseSchema,
    output: 'stubbed-response'
  };
}
