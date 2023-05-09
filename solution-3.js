const videosPerRow = 5; // Note: more than 6 does not work
const Old = Math.floor;
const callStackRegex = /calcElementsPerRow/g;
const msg = "Can i have a cheeseburger please?";
function newMathFloor() {
  const stackTrace = new Error().stack;
  // const splitStack = stackTrace.split("\n");
  // const callerName = splitStack[2].trim().match(/at\s+(\S+)\s+\(/)[1];
  // console.log(`Math.floor was called from" ${callerName}`);

  // Check if the current function call stack matches the regex
  if (callStackRegex.test(stackTrace)) {
    return videosPerRow;
  }
  // Otherwise call the original Math.floor function with the current context and arguments
  return Old.apply(msg, arguments);
}

// Replace Math.floor with the custom function
Math.floor = newMathFloor;