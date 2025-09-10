// // import * as core from '@actions/core'
// // import {Bot} from './bot.js'
// // import {Options, Prompts} from './options.js'
// // import {handleReviewComment} from './review-comment.js'
// // import {codeReview} from './review.js'

// // async function run(): Promise<void> {
// //   const options: Options = new Options(
// //     core.getBooleanInput('debug'),
// //     core.getInput('max_files'),
// //     core.getBooleanInput('review_comment_lgtm'),
// //     core.getMultilineInput('path_filters'),
// //     core.getInput('system_message'),
// //     core.getInput('openai_model'),
// //     core.getInput('openai_model_temperature'),
// //     core.getInput('openai_retries'),
// //     core.getInput('openai_timeout_ms'),
// //     core.getInput('openai_concurrency_limit')
// //   )
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

// //   // initialize openai bot
// //   let bot: Bot | null = null
// //   try {
// //     bot = new Bot(options)
// //   } catch (e: any) {
// //     core.warning(
// //       `Skipped: failed to create bot, please check your openai_api_key: ${e}, backtrace: ${e.stack}`
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
// import {Options, Prompts} from './options.js'
// import {handleReviewComment} from './review-comment.js'
// import {codeReview} from './review.js'

// async function run(): Promise<void> {
//   const geminiApiKey = core.getInput('gemini_api_key')
//   const options: Options = new Options(
//     core.getBooleanInput('debug'),
//     core.getInput('max_files'),
//     core.getBooleanInput('review_comment_lgtm'),
//     core.getMultilineInput('path_filters'),
//     core.getInput('system_message'),
//     core.getInput('gemini_model'), // Changed
//     core.getInput('gemini_model_temperature'), // Changed
//     core.getInput('gemini_retries'), // Changed
//     core.getInput('gemini_concurrency_limit') // Changed
//   )
  
//   // Prompts remain the same, they are generic
//   const prompts: Prompts = new Prompts(
//     core.getInput('review_beginning'),
//     core.getInput('review_file'),
//     core.getInput('review_file_diff'),
//     core.getInput('review_patch_begin'),
//     core.getInput('review_patch'),
//     core.getInput('summarize_beginning'),
//     core.getInput('summarize_file_diff'),
//     core.getInput('summarize'),
//     core.getInput('summarize_release_notes'),
//     core.getInput('comment_beginning'),
//     core.getInput('comment_file'),
//     core.getInput('comment_file_diff'),
//     core.getInput('comment')
//   )

//   // initialize Gemini bot
//   let bot: Bot | null = null
//   try {
//     bot = new Bot(options, geminiApiKey)  
//   } catch (e: any) {
//     core.warning(
//       `Skipped: failed to create bot, please check your gemini_api_key: ${e}, backtrace: ${e.stack}`
//     )
//     return
//   }

//   try {
//     // check if the event is pull_request
//     if (
//       process.env.GITHUB_EVENT_NAME === 'pull_request' ||
//       process.env.GITHUB_EVENT_NAME === 'pull_request_target'
//     ) {
//       await codeReview(bot, options, prompts)
//     } else if (
//       process.env.GITHUB_EVENT_NAME === 'pull_request_review_comment'
//     ) {
//       await handleReviewComment(bot, options, prompts)
//     } else {
//       core.warning('Skipped: this action only works on push event')
//     }
//   } catch (e: any) {
//     if (e instanceof Error) {
//       core.setFailed(`Failed to run: ${e.message}, backtrace: ${e.stack}`)
//     } else {
//       core.setFailed(`Failed to run: ${e}, backtrace: ${e.stack}`)
//     }
//   }
// }

// process
//   .on('unhandledRejection', (reason, p) => {
//     core.warning(`Unhandled Rejection at Promise: ${reason}, promise is ${p}`)
//   })
//   .on('uncaughtException', (e: any) => {
//     core.warning(`Uncaught Exception thrown: ${e}, backtrace: ${e.stack}`)
//   })

// await run()

// src/main.ts
import * as core from '@actions/core'
import {Bot} from './bot.js'
import {Options, Prompts} from './options.js'
import {handleReviewComment} from './review-comment.js'
import {codeReview} from './review.js'

async function run(): Promise<void> {
  core.setFailed("THIS IS THE LATEST CODE. THE BUILD IS WORKING.");
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

  let bot: Bot | null = null
  try {
    bot = new Bot(options, geminiApiKey)
  } catch (e: any) {
    core.warning(
      `Skipped: failed to create bot, please check your gemini_api_key: ${e}, backtrace: ${e.stack}`
    )
    return
  }

  try {
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
      core.warning('Skipped: this action only works on push event')
    }
  } catch (e: any) {
    if (e instanceof Error) {
      core.setFailed(`Failed to run: ${e.message}, backtrace: ${e.stack}`)
    } else {
      core.setFailed(`Failed to run: ${e}, backtrace: ${e.stack}`)
    }
  }
}

// --- THIS IS THE ENHANCED, AGGRESSIVE ERROR HANDLING SECTION ---
process
  .on('unhandledRejection', (reason: any, p: Promise<any>) => {
    const reasonString = JSON.stringify(reason, null, 2);
    const errorMessage = `
    #####################################################
    ### GLOBAL unhandledRejection DETECTED            ###
    #####################################################
    
    This is a critical error that bypassed all other error handling.
    This is the root cause.
    
    REASON: ${reasonString}
    
    PROMISE: ${p}
    `;
    core.setFailed(errorMessage);
  })
  .on('uncaughtException', (e: any) => {
    const errorMessage = `
    #####################################################
    ### GLOBAL uncaughtException DETECTED             ###
    #####################################################
    
    This is a critical error that bypassed all other error handling.
    This is the root cause.
    
    ERROR: ${e}
    
    STACK: ${e.stack}
    `;
    core.setFailed(errorMessage);
  });
// -------------------------------------------------------------

await run()