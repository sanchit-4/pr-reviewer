// // // import * as core from '@actions/core'
// // // import {Bot} from './bot.js'
// // // import {Options, Prompts} from './options.js'
// // // import {handleReviewComment} from './review-comment.js'
// // // import {codeReview} from './review.js'

// // // async function run(): Promise<void> {
// // //   const options: Options = new Options(
// // //     core.getBooleanInput('debug'),
// // //     core.getInput('max_files'),
// // //     core.getBooleanInput('review_comment_lgtm'),
// // //     core.getMultilineInput('path_filters'),
// // //     core.getInput('system_message'),
// // //     core.getInput('openai_model'),
// // //     core.getInput('openai_model_temperature'),
// // //     core.getInput('openai_retries'),
// // //     core.getInput('openai_timeout_ms'),
// // //     core.getInput('openai_concurrency_limit')
// // //   )
// // //   const prompts: Prompts = new Prompts(
// // //     core.getInput('review_beginning'),
// // //     core.getInput('review_file'),
// // //     core.getInput('review_file_diff'),
// // //     core.getInput('review_patch_begin'),
// // //     core.getInput('review_patch'),
// // //     core.getInput('summarize_beginning'),
// // //     core.getInput('summarize_file_diff'),
// // //     core.getInput('summarize'),
// // //     core.getInput('summarize_release_notes'),
// // //     core.getInput('comment_beginning'),
// // //     core.getInput('comment_file'),
// // //     core.getInput('comment_file_diff'),
// // //     core.getInput('comment')
// // //   )

// // //   // initialize openai bot
// // //   let bot: Bot | null = null
// // //   try {
// // //     bot = new Bot(options)
// // //   } catch (e: any) {
// // //     core.warning(
// // //       `Skipped: failed to create bot, please check your openai_api_key: ${e}, backtrace: ${e.stack}`
// // //     )
// // //     return
// // //   }

// // //   try {
// // //     // check if the event is pull_request
// // //     if (
// // //       process.env.GITHUB_EVENT_NAME === 'pull_request' ||
// // //       process.env.GITHUB_EVENT_NAME === 'pull_request_target'
// // //     ) {
// // //       await codeReview(bot, options, prompts)
// // //     } else if (
// // //       process.env.GITHUB_EVENT_NAME === 'pull_request_review_comment'
// // //     ) {
// // //       await handleReviewComment(bot, options, prompts)
// // //     } else {
// // //       core.warning('Skipped: this action only works on push event')
// // //     }
// // //   } catch (e: any) {
// // //     if (e instanceof Error) {
// // //       core.setFailed(`Failed to run: ${e.message}, backtrace: ${e.stack}`)
// // //     } else {
// // //       core.setFailed(`Failed to run: ${e}, backtrace: ${e.stack}`)
// // //     }
// // //   }
// // // }

// // // process
// // //   .on('unhandledRejection', (reason, p) => {
// // //     core.warning(`Unhandled Rejection at Promise: ${reason}, promise is ${p}`)
// // //   })
// // //   .on('uncaughtException', (e: any) => {
// // //     core.warning(`Uncaught Exception thrown: ${e}, backtrace: ${e.stack}`)
// // //   })

// // // await run()


// // // src/main.ts
// // import * as core from '@actions/core'
// // import {Bot} from './bot.js'
// // import {Options, Prompts} from './options.js'
// // import {handleReviewComment} from './review-comment.js'
// // import {codeReview} from './review.js'

// // async function run(): Promise<void> {
// //   const geminiApiKey = core.getInput('gemini_api_key')
// //   const options: Options = new Options(
// //     core.getBooleanInput('debug'),
// //     core.getInput('max_files'),
// //     core.getBooleanInput('review_comment_lgtm'),
// //     core.getMultilineInput('path_filters'),
// //     core.getInput('system_message'),
// //     core.getInput('gemini_model'), // Changed
// //     core.getInput('gemini_model_temperature'), // Changed
// //     core.getInput('gemini_retries'), // Changed
// //     core.getInput('gemini_concurrency_limit') // Changed
// //   )
  
// //   // Prompts remain the same, they are generic
// //   const prompts: Prompts = new Prompts(
// //     core.getInput('review_beginning'),
// //     core.getInput('review_file'),
// //     core.getInput('review_file_diff'),
// //     core.getInput('review_patch_begin'),
// //     core.getInput('review_patch'),
// //     core.getInput('summarize_beginning'),
// //     core.getInput('summarize_file_diff'),
// //     core.getInput('summarize'),
// //     core.getInput('summarize_release_notes'),
// //     core.getInput('comment_beginning'),
// //     core.getInput('comment_file'),
// //     core.getInput('comment_file_diff'),
// //     core.getInput('comment')
// //   )

// //   // initialize Gemini bot
// //   let bot: Bot | null = null
// //   try {
// //     bot = new Bot(options, geminiApiKey)  
// //   } catch (e: any) {
// //     core.warning(
// //       `Skipped: failed to create bot, please check your gemini_api_key: ${e}, backtrace: ${e.stack}`
// //     )
// //     return
// //   }

// //   try {
// //     // check if the event is pull_request
// //     if (
// //       process.env.GITHUB_EVENT_NAME === 'pull_request' ||
// //       process.env.GITHUB_EVENT_NAME === 'pull_request_target'
// //     ) {
// //       await codeReview(bot, options, prompts)
// //     } else if (
// //       process.env.GITHUB_EVENT_NAME === 'pull_request_review_comment'
// //     ) {
// //       await handleReviewComment(bot, options, prompts)
// //     } else {
// //       core.warning('Skipped: this action only works on push event')
// //     }
// //   } catch (e: any) {
// //     if (e instanceof Error) {
// //       core.setFailed(`Failed to run: ${e.message}, backtrace: ${e.stack}`)
// //     } else {
// //       core.setFailed(`Failed to run: ${e}, backtrace: ${e.stack}`)
// //     }
// //   }
// // }

// // process
// //   .on('unhandledRejection', (reason, p) => {
// //     core.warning(`Unhandled Rejection at Promise: ${reason}, promise is ${p}`)
// //   })
// //   .on('uncaughtException', (e: any) => {
// //     core.warning(`Uncaught Exception thrown: ${e}, backtrace: ${e.stack}`)
// //   })

// // await run()

// // src/main.ts
// import * as core from '@actions/core'
// import {Bot} from './bot.js'
// import {Options} from './options.js'

// // --- MINIMAL TEST CASE ---
// async function run(): Promise<void> {
//   core.info("--- Starting Minimal Gemini SDK Test ---");
//   let bot: Bot | null = null;
  
//   try {
//     const geminiApiKey = core.getInput('gemini_api_key');
//     const options: Options = new Options(
//       true, // debug
//       '1',  // max_files
//       false, // review_comment_lgtm
//       null, // path_filters
//       'You are a helpful assistant.', // system_message
//       core.getInput('gemini_model'),
//       core.getInput('gemini_model_temperature'),
//       '1', // retries
//       '1'  // concurrency_limit
//     );

//     core.info("Initializing Bot...");
//     bot = new Bot(options, geminiApiKey);
//     core.info("Bot initialized successfully.");

//     core.info("Attempting a single, hardcoded chat call...");
//     const [responseText, newHistory] = await bot.chat("Hello, world!", []);

//     // If we reach this line, the API call was successful.
//     core.info("--- MINIMAL TEST SUCCEEDED ---");
//     core.info(`Gemini Response: ${responseText}`);

//   } catch (e: any) {
//     // If any error happens during this minimal test, it will be caught here.
//     core.setFailed(`--- MINIMAL TEST FAILED --- \nMESSAGE: ${e.message}\nSTACK: ${e.stack}`);
//   }
// }
// // -------------------------

// // We keep the global handlers just in case.
// process
//   .on('unhandledRejection', (reason: any) => {
//     core.setFailed(`GLOBAL unhandledRejection: ${JSON.stringify(reason)}`);
//   })
//   .on('uncaughtException', (e: any) => {
//     core.setFailed(`GLOBAL uncaughtException: ${e.message}`);
//   });

// await run();


// src/main.ts
import * as core from '@actions/core'
import {Bot} from './bot.js'
import {Options, Prompts} from './options.js'
import {handleReviewComment} from './review-comment.js'
import {codeReview} from './review.js'

async function run(): Promise<void> {
  try {
    const geminiApiKey = core.getInput('gemini_api_key')

    const options: Options = new Options(
      core.getBooleanInput('debug'),
      core.getInput('max_files'),
      core.getBooleanInput('review_comment_lgtm'),
      core.getMultilineInput('path_filters'),
      core.getInput('system_message'),
      core.getInput('gemini_model'),
      core.getInput('gemini_model_temperature'),
      core.getInput('gemini_retries'),
      core.getInput('gemini_concurrency_limit')
    )
    
    const prompts: Prompts = new Prompts(
      core.getInput('review_beginning'),
      core.getInput('review_file'),
      core.getInput('review_file_diff'),
      core.getInput('review_patch_begin'),
      core.getInput('review_patch'),
      core.getInput('summarize_beginning'),
      core.getInput('summarize_file_diff'),
      core.getInput('summarize'),
      core.getInput('summarize_release_notes'),
      core.getInput('comment_beginning'),
      core.getInput('comment_file'),
      core.getInput('comment_file_diff'),
      core.getInput('comment')
    )

    const bot: Bot = new Bot(options, geminiApiKey);

    if (
      process.env.GITHUB_EVENT_NAME === 'pull_request' ||
      process.env.GITHUB_EVENT_NAME === 'pull_request_target'
    ) {
      await codeReview(bot, options, prompts)
    } else if (
      process.env.GITHUB_EVENT_NAME === 'pull_request_review_comment'
    ) {
      await handleReviewComment(bot, options, prompts)
    } else {
      core.warning('Skipped: this action only works on PR events.')
    }
  } catch (e: any) {
    core.setFailed(`Action failed with error: ${e.message}`);
  }
}

await run();