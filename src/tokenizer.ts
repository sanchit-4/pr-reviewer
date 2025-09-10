// import {get_encoding} from '@dqbd/tiktoken'

// const tokenizer = get_encoding('cl100k_base')

// export function encode(input: string): Uint32Array {
//   return tokenizer.encode(input)
// }

// export function get_token_count(input: string): number {
//   input = input.replace(/<\|endoftext\|>/g, '')
//   return encode(input).length
// }

// src/tokenizer.ts
import {GoogleGenerativeAI} from '@google/generative-ai'
import * as core from '@actions/core'

// We need a model instance to count tokens. Initialize it once.
// This assumes GEMINI_API_KEY and the model name are available.
// A more robust solution might pass the model instance from the bot.

let model: any = null
try {
  if (process.env.GEMINI_API_KEY && core.getInput('gemini_model')) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    model = genAI.getGenerativeModel({model: core.getInput('gemini_model')})
  }
} catch (e: any) {
  core.warning(`Could not initialize tokenizer: ${e.message}`)
}

export async function get_token_count(input: string): Promise<number> {
  if (!model) {
    core.warning(
      'Token counter not available. Falling back to character count / 4.'
    )
    return Math.ceil(input.length / 4)
  }
  try {
    const {totalTokens} = await model.countTokens(input)
    return totalTokens
  } catch (e: any) {
    core.warning(`Failed to count tokens: ${e.message}. Falling back to character count / 4.`)
    return Math.ceil(input.length / 4)
  }
}

