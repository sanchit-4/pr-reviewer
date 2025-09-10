// src/utils.ts
import * as core from '@actions/core'

export const retry = async <T>(
  fn: () => Promise<T>,
  times: number,
  delayMs: number = 1000 // Add a delay between retries
): Promise<T> => {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (error: any) {
      core.warning(`[utils.retry] Attempt ${i + 1} failed with error: ${error.message}`);
      if (i === times - 1) {
        core.error(`[utils.retry] All ${times} attempts failed.`);
        throw error; // Re-throw the last error
      }
      // Wait before trying again
      await new Promise(res => setTimeout(res, delayMs * (i + 1))); 
    }
  }
  // This line should not be reachable, but is required for TypeScript
  throw new Error("Retry logic failed unexpectedly.");
};