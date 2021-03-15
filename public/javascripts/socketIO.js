const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("submit");
const input = document.getElementById("message");
const nickname = document.getElementById("nickname");

if (form) {
  console.log("created Form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit("chat message", `${nickname.value}: ${input.value}`);
      input.value = "";
    }
  });
}

socket.on("chat message", function (msg) {
  var item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
