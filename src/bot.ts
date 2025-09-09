// import './fetch-polyfill.js'

// import * as core from '@actions/core'
// import * as openai from 'chatgpt'
// import * as optionsJs from './options.js'
// import * as utils from './utils.js'

// // define type to save parentMessageId and conversationId
// export type Ids = {
//   parentMessageId?: string
//   conversationId?: string
// }

// export class Bot {
//   private api: openai.ChatGPTAPI | null = null // not free

//   private options: optionsJs.Options

//   constructor(options: optionsJs.Options) {
//     this.options = options
//     if (process.env.OPENAI_API_KEY) {
//       this.api = new openai.ChatGPTAPI({
//         systemMessage: options.system_message,
//         apiKey: process.env.OPENAI_API_KEY,
//         debug: options.debug,
//         completionParams: {
//           temperature: options.openai_model_temperature,
//           model: options.openai_model
//         }
//       })
//     } else {
//       const err =
//         "Unable to initialize the OpenAI API, both 'OPENAI_API_KEY' environment variable are not available"
//       throw new Error(err)
//     }
//   }

//   chat = async (message: string, ids: Ids): Promise<[string, Ids]> => {
//     let new_ids: Ids = {}
//     let response = ''
//     try {
//       ;[response, new_ids] = await this.chat_(message, ids)
//     } catch (e: any) {
//       core.warning(`Failed to chat: ${e}, backtrace: ${e.stack}`)
//     } finally {
//       return [response, new_ids]
//     }
//   }

//   private chat_ = async (message: string, ids: Ids): Promise<[string, Ids]> => {
//     // record timing
//     const start = Date.now()
//     if (!message) {
//       return ['', {}]
//     }
//     if (this.options.debug) {
//       core.info(`sending to openai: ${message}`)
//     }

//     let response: openai.ChatMessage | null = null

//     if (this.api) {
//       const opts: openai.SendMessageOptions = {
//         timeoutMs: this.options.openai_timeout_ms
//       }
//       if (ids.parentMessageId) {
//         opts.parentMessageId = ids.parentMessageId
//       }
//       try {
//         response = await utils.retry(
//           this.api.sendMessage.bind(this.api),
//           [message, opts],
//           this.options.openai_retries
//         )
//       } catch (e: any) {
//         core.info(
//           `response: ${response}, failed to stringify: ${e}, backtrace: ${e.stack}`
//         )
//       }
//       const end = Date.now()
//       core.info(`response: ${JSON.stringify(response)}`)
//       core.info(
//         `openai sendMessage (including retries) response time: ${
//           end - start
//         } ms`
//       )
//     } else {
//       core.setFailed('The OpenAI API is not initialized')
//     }
//     let response_text = ''
//     if (response) {
//       response_text = response.text
//     } else {
//       core.warning('openai response is null')
//     }
//     // remove the prefix "with " in the response
//     if (response_text.startsWith('with ')) {
//       response_text = response_text.substring(5)
//     }
//     if (this.options.debug) {
//       core.info(`openai responses: ${response_text}`)
//     }
//     const new_ids: Ids = {
//       parentMessageId: response?.id,
//       conversationId: response?.conversationId
//     }
//     return [response_text, new_ids]
//   }
// }


import './fetch-polyfill.js'

import * as core from '@actions/core'
import {
  GoogleGenerativeAI,
  GenerativeModel,
  Content,
  Part
} from '@google/generative-ai'
import * as optionsJs from './options.js'
import * as utils from './utils.js'

// Define the type for conversation history to be compatible with Gemini's API
export type ConversationHistory = Content[]

export class Bot {
  private model: GenerativeModel

  private options: optionsJs.Options

  constructor(options: optionsJs.Options) {
    this.options = options
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "Unable to initialize the Gemini API, 'GEMINI_API_KEY' environment variable is not available"
      )
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    this.model = genAI.getGenerativeModel({
      model: this.options.gemini_model,
      // System instructions are a new feature; you can also prepend it to the first user message.
      systemInstruction: this.options.system_message,
    })
  }

  chat = async (
    message: string,
    history: ConversationHistory
  ): Promise<[string, ConversationHistory]> => {
    try {
      return await this.chat_(message, history)
    } catch (e: any) {
      core.warning(`Failed to chat: ${e}, backtrace: ${e.stack}`)
      return ['', history] // Return original history on failure
    }
  }

  private chat_ = async (
    message: string,
    history: ConversationHistory
  ): Promise<[string, ConversationHistory]> => {
    const start = Date.now()
    if (!message) {
      return ['', history]
    }

    if (this.options.debug) {
      core.info(`Sending to Gemini: ${message}`)
    }
    
    // Use the retry utility for the API call
    const chatSession = this.model.startChat({
        history,
        generationConfig: {
          temperature: this.options.gemini_model_temperature,
        }
    });

    const result = await utils.retry(
      chatSession.sendMessage.bind(chatSession),
      [message],
      this.options.gemini_retries
    )
    
    const end = Date.now()
    core.info(`Gemini sendMessage (including retries) response time: ${end - start} ms`)

    const responseText = result.response.text()
    if (this.options.debug) {
      core.info(`Gemini response: ${responseText}`)
    }

    // Construct the new history
    const newHistory: ConversationHistory = [
      ...history,
      {role: 'user', parts: [{text: message}]},
      {role: 'model', parts: [{text: responseText}]}
    ]

    return [responseText, newHistory]
  }
}