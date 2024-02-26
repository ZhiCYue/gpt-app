const request = (prompt) => {
  return new Promise((resolve, reject) => {
    axios.get('http://moonchat.fun/?m=' + prompt)
    .then(response => {
        const generatedText = response.data;
        console.log('Generated Text: \n' + generatedText + '\n');
        console.log('\n----- End -----\n');
        resolve(generatedText);
    })
    .catch(error => {
        reject('Error:', error.response.data.error.message);
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-btn");

  sendButton.addEventListener("click", async function() {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
      addMessage("You", userMessage);
      await simulateResponse(userMessage);
      userInput.value = "";
    }
  });

  function addMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function simulateResponse(userMessage) {
    // 这里可以写一些模拟 ChatGPT 或其他用户的回复逻辑
    const response = await request(userMessage);
    addMessage("ChatGPT", response);
  }
});
