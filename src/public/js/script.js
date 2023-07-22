document.querySelector(".new-chat-button").addEventListener("click", function () {
  var newChatIndex = document.querySelectorAll(".previous-chats-list li");
  if (newChatIndex.length >= 1) {
    if (newChatIndex[newChatIndex.length - 1].textContent != "New Chat") {
      createNewList();
    }
  } else {
    createNewList();
  }

  function createNewList() {
    var newChatIndex = document.querySelectorAll(".previous-chats-list li").length + 1;

    var newChatItem = document.createElement("li");

    var buttonContainer = document.createElement("div");
    buttonContainer.classList.add("chat-button-container");

    var newChatButton = document.createElement("button");
    newChatButton.classList.add("chat-button");
    newChatButton.innerText = "New Chat";

    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = "<i class='fas fa-trash-alt'></i>";
    // deleteIcon.setAttribute('onclick', 'deleteChat(this)');

    buttonContainer.appendChild(newChatButton);
    buttonContainer.appendChild(deleteIcon);

    // Add onClick event to the new chat button
    newChatButton.addEventListener("click", function () {
      openChat(newChatIndex, this);
    });

    deleteIcon.addEventListener("click", (event) => {
      deleteIcon.innerHTML = "<i class='fas fa-check'></i>";
      setTimeout(() => {
        newChatItem.remove();
        closeChat(newChatIndex);
      }, 500);
      // add additional events here
    });

    newChatItem.appendChild(buttonContainer);

    var previousChatsList = document.querySelector(".previous-chats-list");
    previousChatsList.insertBefore(newChatItem, previousChatsList.lastChild);
    newChatButton.click();
  }
});

let current_tab;
function closeChat(chatNumber) {
  const chatContent = document.getElementById(`chat-content-${chatNumber}`);
  if (chatContent) {
    chatContent.remove();
  }
}
function openChat(chatNumber, event) {
  // Check if chat content already exists
  const chatContent = document.getElementById(`chat-content-${chatNumber}`);

  if (chatContent) {
    // Chat content already exists, show it
    const chatContents = document.querySelectorAll(".chat-content");
    chatContents.forEach((content) => {
      content.style.visibility = "hidden";
      content.style.display = "none";
    });

    const tabs = document.querySelectorAll(".on");
    tabs.forEach((tab) => {
      tab.classList.remove("on");
    });

    event.classList.add("on");
    chatContent.style.visibility = "visible";
    chatContent.style.display = "flex";

    current_tab = chatNumber;
  } else {
    // Chat content doesn't exist, create and render it
    const chatContainer = document.querySelector(".chat-container");

    // Create chat content element
    const newChatContent = document.createElement("div");
    newChatContent.classList.add("chat-content");
    newChatContent.setAttribute("id", `chat-content-${chatNumber}`);

    // Create chat messages element
    const chatMessages = document.createElement("div");
    chatMessages.classList.add("chat-messages");
    newChatContent.appendChild(chatMessages);

    // Create emoji container element
    let emojiContainer = document.createElement("div");
    emojiContainer.classList.add("emoji-container");

    let emojiGrid = document.createElement("div");
    emojiGrid.classList.add("emoji-grid");

    let emojiArray = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];

    emojiArray.forEach((emoji) => {
      let span = document.createElement("span");
      span.classList.add("emoji");
      span.textContent = emoji;
      emojiGrid.appendChild(span);
    });

    emojiContainer.appendChild(emojiGrid);

    // Append emoji container to chat content
    newChatContent.appendChild(emojiContainer);

    // Create input container element
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    // Create emoji button element
    const emojiButton = document.createElement("i");
    emojiButton.classList.add("far", "fa-smile", "emoji-button");
    inputContainer.appendChild(emojiButton);

    // Create message input element
    const messageInput = document.createElement("textarea");
    messageInput.setAttribute("id", `message_input`);
    messageInput.setAttribute("placeholder", "Type a message...");
    messageInput.setAttribute("rows", "1");
    inputContainer.appendChild(messageInput);

    // Create send button element
    const sendButton = document.createElement("i");
    sendButton.classList.add("fas", "fa-paper-plane", "rounded-icon");
    sendButton.setAttribute("id", `send_btn`);
    inputContainer.appendChild(sendButton);

    // Append input container to chat content
    newChatContent.appendChild(inputContainer);

    // Hide all existing chat contents
    const chatContents = document.querySelectorAll(".chat-content");
    chatContents.forEach((content) => {
      content.style.visibility = "hidden";
      content.style.display = "none";
    });

    const tabs = document.querySelectorAll(".on");
    tabs.forEach((tab) => {
      tab.classList.remove("on");
    });

    event.classList.add("on");

    // Append new chat content to chat container
    chatContainer.appendChild(newChatContent);

    function sendMessage() {
      messageInput.style.lineHeight = 16 + "px";
      emojiContainer.classList.remove("open");
      const messageText = messageInput.value.trim();
      if (messageText !== "") {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message", "outgoing-message");

        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");

        // Split the messageText into paragraphs
        const paragraphs = messageText.split("\n");

        // Create a <p> element for each paragraph
        paragraphs.forEach((paragraph) => {
          if (paragraph.startsWith("```") && paragraph.endsWith("```")) {
            // Format code-like text
            const codeElement = document.createElement("pre");
            codeElement.textContent = paragraph.slice(3, -3);
            const codeWrapper = document.createElement("code");
            codeWrapper.appendChild(codeElement);
            messageContent.appendChild(codeWrapper);
          } else {
            // Regular paragraph
            const paragraphElement = document.createElement("p");
            paragraphElement.textContent = paragraph;
            messageContent.appendChild(paragraphElement);
          }
        });

        messageContainer.appendChild(messageContent);
        chatMessages.appendChild(messageContainer);

        messageInput.value = "";
        setTimeout(function () {
          chatMessages.scrollTop = chatMessages.scrollHeight + 20;
        }, 100);

        receiveMessage(messageText);
      }
    }

    function receiveMessage(incoming) {
      const messageText = incoming.trim();
      if (messageText !== "") {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message", "incoming-message");

        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");

        if (false) {
          const defaultBackground = document.createElement("div");
          defaultBackground.classList.add("default-background");

          const imageOverlay = document.createElement("div");
          imageOverlay.classList.add("image-overlay");

          const searchIcon = document.createElement("i");
          searchIcon.classList.add("fas", "fa-search-plus");

          imageOverlay.appendChild(searchIcon);
          defaultBackground.appendChild(imageOverlay);

          const messageContainer2 = document.createElement("div");
          messageContainer2.classList.add("message", "incoming-message");
          const messageContent2 = document.createElement("div");
          messageContent2.classList.add("message-content");

          messageContent2.appendChild(defaultBackground);
          messageContainer2.appendChild(messageContent2);
          chatMessages.appendChild(messageContainer2);
        }

        if (false) {
          const audioPlayer = createAudioPlayer("smoothy-157149.mp3");

          const messageContainer2 = document.createElement("div");
          messageContainer2.classList.add("message", "incoming-message");

          const messageContent2 = document.createElement("div");
          messageContent2.classList.add("message-content");

          messageContent2.appendChild(audioPlayer);
          messageContainer2.appendChild(messageContent2);
          chatMessages.appendChild(messageContainer2);
        }

        if (true) {
          const messageContent = document.createElement("div");
          messageContent.classList.add("message-content");
          const textContent = document.createElement("div");
          textContent.classList.add("text-content");

          // Split the messageText into paragraphs
          const paragraphs = messageText.split("\n");
          // Format code-like text
          paragraphs.forEach((paragraph) => {
            if (paragraph.startsWith("```") && paragraph.endsWith("```")) {
              // Format code-like text
              const codeElement = document.createElement("pre");
              codeElement.textContent = paragraph.slice(3, -3);
              const codeWrapper = document.createElement("code");
              codeWrapper.appendChild(codeElement);
              textContent.appendChild(codeWrapper);
            } else {
              // Regular paragraph
              const paragraphElement = document.createElement("p");
              paragraphElement.textContent = paragraph;
              textContent.appendChild(paragraphElement);
            }
          });

          const copyButton = document.createElement("button");
          copyButton.classList.add("copy-button");
          copyButton.innerHTML = "<i class='fas fa-copy'></i>";
          copyButton.addEventListener("click", function (event) {
            // Create a range object and select the content of the element
            var range = document.createRange();
            range.selectNode(textContent);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            // Copy the selected content to the clipboard
            document.execCommand("copy");

            // Clean up the selection
            window.getSelection().removeAllRanges();

            copyButton.innerHTML = "<i class='fas fa-check'></i>";

            setTimeout(() => {
              copyButton.innerHTML = "<i class='fas fa-copy'></i>";
            }, 500);
          });

          // Add copy button inside textContent
          textContent.appendChild(copyButton);

          messageContent.appendChild(textContent);
          messageContainer.appendChild(messageContent);
          chatMessages.appendChild(messageContainer);

          // simulateTyping(messageText, 10, 0, textContent);

          function simulateTyping(text, initialDelay, increment, element) {
            const paragraphs = text.split("\n");
            let paragraphIndex = 0;
            let wordIndex = 0;
            let delay = initialDelay;
            let formattedText = "";

            const typingInterval = setInterval(() => {
              if (paragraphIndex < paragraphs.length) {
                const words = paragraphs[paragraphIndex].split(" ");
                if (wordIndex < words.length) {
                  formattedText += words[wordIndex] + " ";
                  element.innerHTML = formattedText;
                  wordIndex++;
                  delay -= increment;
                } else {
                  formattedText += "<br>"; // Add a line break after each paragraph
                  element.innerHTML = formattedText;
                  paragraphIndex++;
                  wordIndex = 0;
                }
              } else {
                clearInterval(typingInterval);
              }
              setTimeout(function () {
                chatMessages.scrollTop = chatMessages.scrollHeight + 20;
              }, 100);
            }, delay);
          }
        }
      }
    }

    sendButton.addEventListener("click", sendMessage);

    messageInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        this.style.lineHeight = 180 + "px";
      } else if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    });

    emojiButton.addEventListener("click", () => {
      emojiContainer.classList.toggle("open"); // Toggle the 'open' class on click
      console.log("open");
    });

    const emojiButtons = document.querySelectorAll(".emoji");

    emojiButtons.forEach((emojiButton) => {
      emojiButton.addEventListener("click", () => {
        const emoji = emojiButton.textContent;
        const startPos = messageInput.selectionStart;
        const endPos = messageInput.selectionEnd;
        const currentValue = messageInput.value;
        const newValue = currentValue.substring(0, startPos) + emoji + currentValue.substring(endPos);
        messageInput.value = newValue;
        messageInput.focus();
        messageInput.setSelectionRange(startPos + 1, startPos); // Move cursor after inserted emoji
      });
    });

    current_tab = chatNumber;
  }
}

// JavaScript code
const modeBtn = document.getElementById("modeBtn");
const messageInput2 = document.getElementById("message_input");
const darkModeStyle = document.getElementById("darkModeStyle");

// Check if style mode is saved in session storage
const savedStyleMode = sessionStorage.getItem("styleMode");
if (savedStyleMode === "dark") {
  darkModeStyle.disabled = false; // Enable dark mode
} else {
  darkModeStyle.disabled = true; // Disable dark mode
}

modeBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Toggle style mode
  darkModeStyle.disabled = !darkModeStyle.disabled;

  // Save style mode to session storage
  if (darkModeStyle.disabled) {
    sessionStorage.setItem("styleMode", "light");
  } else {
    sessionStorage.setItem("styleMode", "dark");
  }
});

let activeAudios = [];
function createAudioPlayer(audioLink) {
  const audioPlayer = document.createElement("div");
  audioPlayer.classList.add("audio-player");

  const audioControls = document.createElement("div");
  audioControls.classList.add("audio-controls");

  const playButton = document.createElement("button");
  playButton.classList.add("play-button");
  const playIcon = document.createElement("i");
  playIcon.classList.add("fas", "fa-play");
  playButton.appendChild(playIcon);
  audioControls.appendChild(playButton);

  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  const progress = document.createElement("div");
  progress.classList.add("progress");
  progressBar.appendChild(progress);
  audioControls.appendChild(progressBar);

  const duration = document.createElement("span");
  duration.classList.add("duration");
  duration.textContent = "00:00";
  audioControls.appendChild(duration);

  audioPlayer.appendChild(audioControls);

  const audio = new Audio(audioLink);

  function stopAllAudios() {
    activeAudios.forEach((audio) => {
      audio.audio.pause();
      audio.playIcon.classList.remove("fa-pause");
      audio.playIcon.classList.add("fa-play");
    });
    activeAudios.length = 0; // Clear the array
  }

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      stopAllAudios();
      activeAudios.push({ audio, playIcon });
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
    } else {
      audio.pause();
      stopAllAudios();
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    }
  });

  progressBar.addEventListener("click", (event) => {
    const clickedPosition = event.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const clickPercentage = (clickedPosition / progressBarWidth) * 100;
    const seekTime = (clickPercentage / 100) * audio.duration;
    audio.currentTime = seekTime;
  });

  audio.addEventListener("timeupdate", () => {
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercentage}%`;

    if (progressPercentage === 100) {
      audio.pause();
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    }

    const remainingTime = audio.duration - audio.currentTime;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);
    duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });

  return audioPlayer;
}

const emojiButton = document.getElementById("icons");
const emojiContainer = document.querySelector(".emoji-container");

const toggleButton = document.getElementById("collapse-button");
const sidebar = document.querySelector(".sidebar");
const sidebarContainer = document.querySelector(".sidebar-container");
const collapseIcon = toggleButton.querySelector("i");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  sidebarContainer.classList.toggle("collapsed");

  if (sidebar.classList.contains("collapsed")) {
    sidebarContainer.style.width = "50px"; /* Adjust the pixel value as per your desired visibility */
    collapseIcon.classList.remove("fa-chevron-left");
    collapseIcon.classList.add("fa-chevron-right");
  } else {
    sidebarContainer.style.width = "300px"; /* Adjust the width to show the full sidebar */
    collapseIcon.classList.remove("fa-chevron-right");
    collapseIcon.classList.add("fa-chevron-left");
  }
});

let Marketplace = document.querySelector("#marketplace");
let Medicals = document.querySelector("#medicals");
let Games = document.querySelector("#games");

Marketplace.addEventListener("click", () => {
  openChat(1, Marketplace);
});
Medicals.addEventListener("click", () => {
  openChat(1, Medicals);
});
Games.addEventListener("click", () => {
  openChat(1, Games);
});
