const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("submit");
const input = document.getElementById("message");
const nickname = document.getElementById("nickname");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
      const data = {
        nickname: nickname.value,
        content: input.value,
      };
      socket.emit("chat message", data);
      input.value = "";
    }
  });
}

socket.on("chat message", (data) => {
  if (data.update) messages.removeChild(messages.childNodes[0]);
  var item = document.createElement("li");
  item.textContent = data.msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("load old messages", (userMessages) => {
  userMessages.forEach((message) => {
    var item = document.createElement("li");
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
});
