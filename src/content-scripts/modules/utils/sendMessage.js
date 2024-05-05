export const sendMessage = async (message) => {
  // return new Promise((resolve, reject) => {
  //   chrome.runtime.sendMessage(message, (response) => {
  //     if (chrome.runtime.lastError) {
  //       reject(chrome.runtime.lastError);
  //     }
  //     resolve(response);
  //   });
  // });
  try {
    const response = await chrome.runtime.sendMessage(message);
    return response;
  } catch (error) {
    console.log(error);
  }
};
