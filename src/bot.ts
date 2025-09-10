// // // // // import './fetch-polyfill.js'

// // // // // import * as core from '@actions/core'
// // // // // import * as openai from 'chatgpt'
// // // // // import * as optionsJs from './options.js'
// // // // // import * as utils from './utils.js'

// // // // // // define type to save parentMessageId and conversationId
// // // // // export type Ids = {
// // // // //   parentMessageId?: string
// // // // //   conversationId?: string
// // // // // }

// // // // // export class Bot {
// // // // //   private api: openai.ChatGPTAPI | null = null // not free

// // // // //   private options: optionsJs.Options

// // // // //   constructor(options: optionsJs.Options) {
// // // // //     this.options = options
// // // // //     if (process.env.OPENAI_API_KEY) {
// // // // //       this.api = new openai.ChatGPTAPI({
// // // // //         systemMessage: options.system_message,
// // // // //         apiKey: process.env.OPENAI_API_KEY,
// // // // //         debug: options.debug,
// // // // //         completionParams: {
// // // // //           temperature: options.openai_model_temperature,
// // // // //           model: options.openai_model
// // // // //         }
// // // // //       })
// // // // //     } else {
// // // // //       const err =
// // // // //         "Unable to initialize the OpenAI API, both 'OPENAI_API_KEY' environment variable are not available"
// // // // //       throw new Error(err)
// // // // //     }
// // // // //   }

// // // // //   chat = async (message: string, ids: Ids): Promise<[string, Ids]> => {
// // // // //     let new_ids: Ids = {}
// // // // //     let response = ''
// // // // //     try {
// // // // //       ;[response, new_ids] = await this.chat_(message, ids)
// // // // //     } catch (e: any) {
// // // // //       core.warning(`Failed to chat: ${e}, backtrace: ${e.stack}`)
// // // // //     } finally {
// // // // //       return [response, new_ids]
// // // // //     }
// // // // //   }

// // // // //   private chat_ = async (message: string, ids: Ids): Promise<[string, Ids]> => {
// // // // //     // record timing
// // // // //     const start = Date.now()
// // // // //     if (!message) {
// // // // //       return ['', {}]
// // // // //     }
// // // // //     if (this.options.debug) {
// // // // //       core.info(`sending to openai: ${message}`)
// // // // //     }

// // // // //     let response: openai.ChatMessage | null = null

// // // // //     if (this.api) {
// // // // //       const opts: openai.SendMessageOptions = {
// // // // //         timeoutMs: this.options.openai_timeout_ms
// // // // //       }
// // // // //       if (ids.parentMessageId) {
// // // // //         opts.parentMessageId = ids.parentMessageId
// // // // //       }
// // // // //       try {
// // // // //         response = await utils.retry(
// // // // //           this.api.sendMessage.bind(this.api),
// // // // //           [message, opts],
// // // // //           this.options.openai_retries
// // // // //         )
// // // // //       } catch (e: any) {
// // // // //         core.info(
// // // // //           `response: ${response}, failed to stringify: ${e}, backtrace: ${e.stack}`
// // // // //         )
// // // // //       }
// // // // //       const end = Date.now()
// // // // //       core.info(`response: ${JSON.stringify(response)}`)
// // // // //       core.info(
// // // // //         `openai sendMessage (including retries) response time: ${
// // // // //           end - start
// // // // //         } ms`
// // // // //       )
// // // // //     } else {
// // // // //       core.setFailed('The OpenAI API is not initialized')
// // // // //     }
// // // // //     let response_text = ''
// // // // //     if (response) {
// // // // //       response_text = response.text
// // // // //     } else {
// // // // //       core.warning('openai response is null')
// // // // //     }
// // // // //     // remove the prefix "with " in the response
// // // // //     if (response_text.startsWith('with ')) {
// // // // //       response_text = response_text.substring(5)
// // // // //     }
// // // // //     if (this.options.debug) {
// // // // //       core.info(`openai responses: ${response_text}`)
// // // // //     }
// // // // //     const new_ids: Ids = {
// // // // //       parentMessageId: response?.id,
// // // // //       conversationId: response?.conversationId
// // // // //     }
// // // // //     return [response_text, new_ids]
// // // // //   }
// // // // // }


// // // // import './fetch-polyfill.js'

// // // // import * as core from '@actions/core'
// // // // import {
// // // //   GoogleGenerativeAI,
// // // //   GenerativeModel,
// // // //   Content,
// // // //   Part
// // // // } from '@google/generative-ai'
// // // // import * as optionsJs from './options.js'
// // // // import * as utils from './utils.js'

// // // // // Define the type for conversation history to be compatible with Gemini's API
// // // // export type ConversationHistory = Content[]

// // // // export class Bot {
// // // //   private model: GenerativeModel

// // // //   private options: optionsJs.Options

// // // //   constructor(options: optionsJs.Options, apiKey?: string) {
// // // //     this.options = options
// // // //     if (!apiKey) {
// // // //       throw new Error(
// // // //         "Unable to initialize the Gemini API, the API key is missing."
// // // //       )
// // // //     }

// // // //     const genAI = new GoogleGenerativeAI(apiKey) // Use the passed-in key
// // // //     this.model = genAI.getGenerativeModel({
// // // //       model: this.options.gemini_model,
// // // //       systemInstruction: this.options.system_message,
// // // //     })
// // // //   }

// // // //   public getModel(): GenerativeModel {
// // // //     return this.model;
// // // //   }

// // // //   chat = async (
// // // //     message: string,
// // // //     history: ConversationHistory
// // // //   ): Promise<[string, ConversationHistory]> => {
// // // //     try {
// // // //       return await this.chat_(message, history)
// // // //     } catch (e: any) {
// // // //       core.warning(`Failed to chat: ${e}, backtrace: ${e.stack}`)
// // // //       return ['', history] // Return original history on failure
// // // //     }
// // // //   }

// // // //   private chat_ = async (
// // // //     message: string,
// // // //     history: ConversationHistory
// // // //   ): Promise<[string, ConversationHistory]> => {
// // // //     const start = Date.now()
// // // //     if (!message) {
// // // //       return ['', history]
// // // //     }

// // // //     if (this.options.debug) {
// // // //       core.info(`Sending to Gemini: ${message}`)
// // // //     }
    
// // // //     // Use the retry utility for the API call
// // // //     const chatSession = this.model.startChat({
// // // //         history,
// // // //         generationConfig: {
// // // //           temperature: this.options.gemini_model_temperature,
// // // //         }
// // // //     });

// // // //     const result = await utils.retry(
// // // //       chatSession.sendMessage.bind(chatSession),
// // // //       [message],
// // // //       this.options.gemini_retries
// // // //     )
    
// // // //     const end = Date.now()
// // // //     core.info(`Gemini sendMessage (including retries) response time: ${end - start} ms`)

// // // //     const responseText = result.response.text()
// // // //     if (this.options.debug) {
// // // //       core.info(`Gemini response: ${responseText}`)
// // // //     }

// // // //     // Construct the new history
// // // //     const newHistory: ConversationHistory = [
// // // //       ...history,
// // // //       {role: 'user', parts: [{text: message}]},
// // // //       {role: 'model', parts: [{text: responseText}]}
// // // //     ]

// // // //     return [responseText, newHistory]
// // // //   }
// // // // }


// // // // src/bot.ts
// // // import './fetch-polyfill.js'

// // // import * as core from '@actions/core'
// // // import {
// // //   GoogleGenerativeAI,
// // //   GenerativeModel,
// // //   Content,
// // //   HarmCategory,
// // //   HarmBlockThreshold
// // // } from '@google/generative-ai'
// // // import * as optionsJs from './options.js'
// // // import * as utils from './utils.js'

// // // export type ConversationHistory = Content[]

// // // export class Bot {
// // //   private model: GenerativeModel
// // //   private options: optionsJs.Options

// // //   constructor(options: optionsJs.Options, apiKey: string) {
// // //     this.options = options
// // //     if (!apiKey) {
// // //       throw new Error(
// // //         "Unable to initialize the Gemini API, the API key is missing."
// // //       )
// // //     }

// // //     const genAI = new GoogleGenerativeAI(apiKey)
// // //     const safetySettings = [
// // //       {
// // //         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
// // //         threshold: HarmBlockThreshold.BLOCK_NONE,
// // //       },
// // //       {
// // //         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
// // //         threshold: HarmBlockThreshold.BLOCK_NONE,
// // //       },
// // //       {
// // //         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
// // //         threshold: HarmBlockThreshold.BLOCK_NONE,
// // //       },
// // //       {
// // //         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
// // //         threshold: HarmBlockThreshold.BLOCK_NONE,
// // //       },
// // //     ];
// // //     this.model = genAI.getGenerativeModel({
// // //       model: this.options.gemini_model,
// // //       systemInstruction: this.options.system_message,
// // //       safetySettings,
// // //     })
// // //   }

// // //   public getModel(): GenerativeModel {
// // //     return this.model
// // //   }

// // //   chat = async (
// // //     message: string,
// // //     history: ConversationHistory
// // //   ): Promise<[string, ConversationHistory]> => {
// // //     try {
// // //       // Attempt to call the internal chat_ method
// // //       return await this.chat_(message, history);
// // //     } catch (e: any) {
// // //       // --- THIS IS THE ENHANCED CATCH BLOCK ---
      
// // //       // Log a highly visible error message to the Actions console
// // //       core.error(`\n### ERROR in bot.chat ###`);
// // //       core.error(`This is the top-level error catch. The API call inside chat_() failed.`);
      
// // //       // Log the actual error message and stack if they exist
// // //       if (e.message) {
// // //         core.error(`MESSAGE: ${e.message}`);
// // //       }
// // //       if (e.stack) {
// // //         core.error(`STACK: ${e.stack}`);
// // //       }
      
// // //       // Also log the raw error object in case it's not a standard Error
// // //       core.error(`RAW ERROR OBJECT: ${JSON.stringify(e)}`);
      
// // //       // Return the empty response, as before
// // //       return ['', history];
// // //     }
// // //   }

// // //   private chat_ = async (
// // //     message: string,
// // //     history: ConversationHistory
// // //   ): Promise<[string, ConversationHistory]> => {
// // //     const start = Date.now();
// // //     if (!message) {
// // //       return ["", history];
// // //     }

// // //     try {
// // //       core.info("[bot.ts] Starting chat session...");
// // //       const chatSession = this.model.startChat({
// // //         history,
// // //         generationConfig: {
// // //           temperature: this.options.gemini_model_temperature,
// // //         },
// // //       });

// // //       if (this.options.debug) {
// // //         core.info(`[bot.ts] Sending to Gemini: ${message}`);
// // //       }

// // //       core.info("[bot.ts] Sending message to Gemini API...");
// // //       const result = await utils.retry(
// // //         chatSession.sendMessage.bind(chatSession),
// // //         [message],
// // //         this.options.gemini_retries
// // //       );

// // //       // --- NEW DIAGNOSTIC LOGGING ---
// // //       core.info("#####################################################");
// // //       core.info("### [bot.ts] RAW API RESPONSE OBJECT              ###");
// // //       core.info("#####################################################");
// // //       core.info(JSON.stringify(result, null, 2)); // Log the entire object
// // //       core.info("#####################################################");
// // //       // ------------------------------------

// // //       // Defensive coding to check the structure of the response
// // //       if (
// // //         !result ||
// // //         !result.response ||
// // //         !Array.isArray(result.response.candidates) ||
// // //         result.response.candidates.length === 0
// // //       ) {
// // //         core.warning(
// // //           "[bot.ts] Gemini response is missing expected candidates. It may have been blocked."
// // //         );
// // //         if (result.response && result.response.promptFeedback) {
// // //             core.warning(`[bot.ts] Prompt Feedback: ${JSON.stringify(result.response.promptFeedback)}`);
// // //         }
// // //         return ["", history]; // Return empty if blocked or malformed
// // //       }

// // //       const finishReason = result.response.candidates[0].finishReason;
// // //       if (finishReason && finishReason !== "STOP") {
// // //           core.warning(`[bot.ts] Gemini response finished with reason: ${finishReason}`);
// // //           if(result.response.candidates[0].safetyRatings) {
// // //               core.warning(`[bot.ts] Safety Ratings: ${JSON.stringify(result.response.candidates[0].safetyRatings)}`)
// // //           }
// // //           return ["", history]; // Return empty if the reason isn't a normal stop
// // //       }

// // //       const responseText = result.response.text();
// // //       if (this.options.debug) {
// // //         core.info(`[bot.ts] Gemini response text: ${responseText}`);
// // //       }

// // //       const newHistory: ConversationHistory = [
// // //         ...history,
// // //         { role: "user", parts: [{ text: message }] },
// // //         { role: "model", parts: [{ text: responseText }] },
// // //       ];

// // //       return [responseText, newHistory];

// // //     } catch (e: any) {
// // //       // This is now a fallback, but we keep it just in case.
// // //       const errorMessage = `FATAL ERROR in bot.ts during Gemini API call: ${e.message}`;
// // //       core.setFailed(errorMessage);
// // //       throw e;
// // //     }
// // //   };
// // // }



// // // src/bot.ts
// // import './fetch-polyfill.js'

// // import * as core from '@actions/core'
// // import {
// //   GoogleGenerativeAI,
// //   GenerativeModel,
// //   Content,
// //   HarmCategory,
// //   HarmBlockThreshold,
// // } from '@google/generative-ai'
// // import * as optionsJs from './options.js'

// // export type ConversationHistory = Content[]

// // export class Bot {
// //   private model: GenerativeModel
// //   private options: optionsJs.Options

// //   constructor(options: optionsJs.Options, apiKey: string) {
// //     this.options = options
// //     if (!apiKey) {
// //       throw new Error("Unable to initialize the Gemini API, the API key is missing.")
// //     }

// //     const genAI = new GoogleGenerativeAI(apiKey)
// //     const safetySettings = [
// //       { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
// //       { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
// //       { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
// //       { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
// //     ];

// //     this.model = genAI.getGenerativeModel({
// //       model: this.options.gemini_model,
// //       systemInstruction: this.options.system_message,
// //       safetySettings,
// //     })
// //   }

// //   public getModel(): GenerativeModel {
// //     return this.model
// //   }

// //   chat = async (
// //     message: string,
// //     history: ConversationHistory
// //   ): Promise<[string, ConversationHistory]> => {
// //     // --- THIS IS THE CANARY LOG. IF YOU DON'T SEE THIS, THE BUILD IS WRONG. ---
// //     core.info("#####################################################");
// //     core.info("### EXECUTING bot.chat [LATEST DIAGNOSTIC VERSION] ###");
// //     core.info("#####################################################");
// //     // -----------------------------------------------------------------------

// //     try {
// //       return await this.chat_(message, history)
// //     } catch (e: any) {
// //       // If the canary appears but this error also appears, we have our answer.
// //       core.error(`### CATCH BLOCK in bot.chat TRIGGERED ###`);
// //       core.error(`MESSAGE: ${e.message}`);
// //       return ['', history]
// //     }
// //   }

// //   private chat_ = async (
// //     message: string,
// //     history: ConversationHistory
// //   ): Promise<[string, ConversationHistory]> => {
// //     const start = Date.now()
// //     if (!message) {
// //       return ['', history]
// //     }

// //     core.info('[bot.ts chat_] Starting chat session...');
// //     const chatSession = this.model.startChat({
// //       history,
// //       generationConfig: {
// //         temperature: this.options.gemini_model_temperature,
// //       },
// //     });

// //     if (this.options.debug) {
// //       core.info(`[bot.ts chat_] Sending to Gemini: ${message}`);
// //     }

// //     // --- REMOVED THE RETRY WRAPPER FOR A DIRECT CALL ---
// //     core.info('[bot.ts chat_] Sending message DIRECTLY to Gemini API...');
// //     const result = await chatSession.sendMessage(message);
// //     // --------------------------------------------------

// //     core.info("[bot.ts chat_] RAW API RESPONSE:");
// //     core.info(JSON.stringify(result, null, 2));

// //     if (!result || !result.response || !result.response.candidates || result.response.candidates.length === 0) {
// //       core.warning("[bot.ts chat_] Gemini response is missing candidates. It may have been blocked.");
// //       return ["", history];
// //     }

// //     const responseText = result.response.text();
// //     const newHistory: ConversationHistory = [
// //         ...history,
// //         { role: 'user', parts: [{ text: message }] },
// //         { role: 'model', parts: [{ text: responseText }] },
// //     ];
    
// //     return [responseText, newHistory]; // Return the new history
// // }
// // }


// // src/bot.ts
// import './fetch-polyfill.js'

// import * as core from '@actions/core'
// import {
//   GoogleGenerativeAI,
//   GenerativeModel,
//   Content,
//   HarmCategory,
//   HarmBlockThreshold,
// } from '@google/generative-ai'
// import * as optionsJs from './options.js'

// export type ConversationHistory = Content[]

// export class Bot {
//   private model: GenerativeModel
//   private options: optionsJs.Options

//   constructor(options: optionsJs.Options, apiKey: string) {
//     this.options = options
//     if (!apiKey) {
//       throw new Error("Unable to initialize the Gemini API, the API key is missing.")
//     }

//     const genAI = new GoogleGenerativeAI(apiKey)
//     const safetySettings = [
//       { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
//       { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
//       { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
//       { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
//     ];

//     this.model = genAI.getGenerativeModel({
//       model: this.options.gemini_model,
//       systemInstruction: this.options.system_message,
//       safetySettings,
//     })
//   }

//   public getModel(): GenerativeModel {
//     return this.model
//   }

//   // We have merged chat and chat_ into a single public function.
//   // There is no other function to call. This is the single point of truth.
//   public async chat(
//     message: string,
//     history: ConversationHistory
//   ): Promise<[string, ConversationHistory]> {
//     core.info("#####################################################");
//     core.info("### EXECUTING SINGLE PUBLIC chat function [FINAL] ###");
//     core.info("#####################################################");

//     if (!message) {
//       return ["", history];
//     }

//     try {
//       core.info("[bot.ts] Starting chat session...");
//       const chatSession = this.model.startChat({
//         history,
//         generationConfig: {
//           temperature: this.options.gemini_model_temperature,
//         },
//       });

//       if (this.options.debug) {
//         core.info(`[bot.ts] Sending to Gemini: ${message}`);
//       }
      
//       core.info('[bot.ts] Sending message DIRECTLY to Gemini API...');
//       const result = await chatSession.sendMessage(message);

//       core.info("[bot.ts] RAW API RESPONSE:");
//       core.info(JSON.stringify(result, null, 2));

//       if (!result || !result.response || !result.response.candidates || result.response.candidates.length === 0) {
//         core.warning("[bot.ts] Gemini response is missing candidates. It may have been blocked.");
//         return ["", history];
//       }

//       const responseText = result.response.text();
//       const newHistory: ConversationHistory = [
//         ...history,
//         { role: 'user', parts: [{ text: message }] },
//         { role: 'model', parts: [{ text: responseText }] },
//       ];

//       return [responseText, newHistory];

//     } catch (e: any) {
//       const errorMessage = `
//       #####################################################
//       ### FATAL ERROR in bot.ts during API call         ###
//       #####################################################
      
//       MESSAGE: ${e.message}
//       STACK: ${e.stack}
//       RAW ERROR OBJECT: ${JSON.stringify(e, null, 2)}
//       `;
//       core.setFailed(errorMessage);
//       // We return an empty response but the action will be marked as failed.
//       return ["", history];
//     }
//   }
// }


import './fetch-polyfill.js'

import * as core from '@actions/core'
import {
  GoogleGenerativeAI,
  GenerativeModel,
  Content,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'
import * as optionsJs from './options.js'
import * as utils from './utils.js' // Import the retry utility again

export type ConversationHistory = Content[]

export class Bot {
  private model: GenerativeModel
  private options: optionsJs.Options

  constructor(options: optionsJs.Options, apiKey: string) {
    this.options = options
    if (!apiKey) {
      throw new Error("Unable to initialize the Gemini API, the API key is missing.")
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    this.model = genAI.getGenerativeModel({
      model: this.options.gemini_model,
      systemInstruction: this.options.system_message,
      safetySettings,
    })
  }

  public getModel(): GenerativeModel {
    return this.model
  }

  public async chat(
    message: string,
    history: ConversationHistory
  ): Promise<[string, ConversationHistory]> {
    try {
      const chatSession = this.model.startChat({
        history,
        generationConfig: {
          temperature: this.options.gemini_model_temperature,
        },
      });

      if (this.options.debug) {
        core.info(`[bot.ts] Sending to Gemini: ${message}`);
      }
      
      // Use the retry utility to make the call resilient
      const result = await utils.retry(
          () => chatSession.sendMessage(message), 
          this.options.gemini_retries
      );

      if (!result || !result.response || !result.response.candidates || result.response.candidates.length === 0) {
        core.warning("[bot.ts] Gemini response is missing candidates. It may have been blocked.");
        return ["", history];
      }

      const responseText = result.response.text();
      const newHistory: ConversationHistory = [
        ...history,
        { role: 'user', parts: [{ text: message }] },
        { role: 'model', parts: [{ text: responseText }] },
      ];

      return [responseText, newHistory];

    } catch (e: any) {
      core.setFailed(`FATAL ERROR during Gemini API call: ${e.message}`);
      return ["", history];
    }
  }
}