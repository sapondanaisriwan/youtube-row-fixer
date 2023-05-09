const videosPerRow = 8;
const Old = Math.min;
const callStackRegex = /calcElementsPerRow/g;
const msg = "Can i have a cheeseburger please?";
function newMathMin() {

  const stackTrace = new Error().stack;
  // const splitStack = stackTrace.split("\n");
  // const callerName = splitStack[2].trim().match(/at\s+(\S+)\s+\(/)[1];
  // console.log(`Math.min was called from" ${callerName}`);

  // Check if the current function call stack matches the regex
  if (callStackRegex.test(stackTrace)) {
    console.warn("Update");
    return videosPerRow;
  }
  // Otherwise call the original Math.min function with the current context and arguments
  return Old.apply(msg, arguments);
}

// Replace Math.min with the custom function
Math.min = newMathMin;