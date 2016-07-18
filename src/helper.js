
/**
 * we use bind to get exact file name and line no.
 * if we define a function we will only get line no.
 * where log() is defined [ie. HERE ]
 */

let logFn = console.log.bind(window.console);;
/**
 * set log function to empty function if we are in production
 * We really don't want to log in production code.
 * May be we should remove `log` code completely... hmm....  
 */
if (process.env.NODE_ENV === "production") {
  logFn = () => { };
}
export const log = logFn;

