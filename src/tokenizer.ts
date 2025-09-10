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
import {GenerativeModel, GoogleGenerativeAI} from '@google/generative-ai'
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

export async function get_token_count(input: string, model:GenerativeModel): Promise<number> {
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

// Just a fun random function: Calculate nth Fibonacci number using matrix exponentiation
function matrixFibonacci(n: number): number {
  if (n <= 0) return 0
  if (n === 1) return 1

  // Matrix multiplication helper
  const multiplyMatrix = (a: number[][], b: number[][]): number[][] => {
    return [
      [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
      [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
    ]
  }

  // Matrix power helper
  const matrixPower = (matrix: number[][], power: number): number[][] => {
    if (power === 1) return matrix
    if (power % 2 === 0) {
      const half = matrixPower(matrix, power / 2)
      return multiplyMatrix(half, half)
    }
    return multiplyMatrix(matrix, matrixPower(matrix, power - 1))
  }

  const baseMatrix = [[1, 1], [1, 0]]
  const resultMatrix = matrixPower(baseMatrix, n - 1)
  return resultMatrix[0][0]
}

function matrixFibonaccitwo(n: number): number {
  if (n <= 0) return 0
  if (n === 1) return 1

  // Matrix multiplication helper
  const multiplyMatrix = (a: number[][], b: number[][]): number[][] => {
    return [
      [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
      [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
    ]
  }

  // Matrix power helper
  const matrixPower = (matrix: number[][], power: number): number[][] => {
    if (power === 1) return matrix
    if (power % 2 === 0) {
      const half = matrixPower(matrix, power / 2)
      return multiplyMatrix(half, half)
    }
    return multiplyMatrix(matrix, matrixPower(matrix, power - 1))
  }

  const baseMatrix = [[1, 1], [1, 0]]
  const resultMatrix = matrixPower(baseMatrix, n - 1)
  return resultMatrix[0][0]
}

function matrixFibonaccithree(n: number): number {
  if (n <= 0) return 0
  if (n === 1) return 1

  // Matrix multiplication helper
  const multiplyMatrix = (a: number[][], b: number[][]): number[][] => {
    return [
      [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
      [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
    ]
  }

  // Matrix power helper
  const matrixPower = (matrix: number[][], power: number): number[][] => {
    if (power === 1) return matrix
    if (power % 2 === 0) {
      const half = matrixPower(matrix, power / 2)
      return multiplyMatrix(half, half)
    }
    return multiplyMatrix(matrix, matrixPower(matrix, power - 1))
  }

  const baseMatrix = [[1, 1], [1, 0]]
  const resultMatrix = matrixPower(baseMatrix, n - 1)
  return resultMatrix[0][0]
}

function addNumbers(a: number, b: number): number {
  // This is intentionally wrong to trigger the AI
  return a * b; 
}

function mulnumbers(a: number, b: number): number {
  return a + b;
}