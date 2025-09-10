import * as core from '@actions/core'

export const retry = async (
  fn: Function,
  args: any[],
  times: number
): Promise<any> => {
  for (let i = 0; i < times; i++) {
    try {
      return await fn(...args)
    } catch (error) {
      core.error(`[utils.retry] Attempt ${i + 1} of ${times} failed.`);
      core.error(`[utils.retry] Error message: ${(error as Error).message}`);
      // The full error object is the most important part
      core.error(`[utils.retry] Full error object: ${JSON.stringify(error, null, 2)}`);
      if (i === times - 1) {
        throw error
      }
      core.warning(`Function failed on try ${i + 1}, retrying...`)
      continue
    }
  }
}