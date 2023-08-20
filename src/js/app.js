const socket = io.connect("http://localhost:3000");

const Sender = document.getElementById("sender");
const Message = document.getElementById("message");
const Output = document.getElementById("output");
const Feedback = document.getElementById("feedback");
const SendButton = document.getElementById("submitBtn");

SendButton.addEventListener("click", () => {
  socket.emit("chat", {
    message: Message.value,
    sender: Sender.value,
  });
});

socket.on("chat", (data) => {
  Feedback.innerHTML = "";
  Output.innerHTML += `<p><strong>${data.sender}: </strong>${data.message}</p>`;
  Message.value = "";
});
Message.addEventListener("keypress", () => {
  socket.emit("typing", Sender.value);
});

socket.on("typing", (data) => {
  Feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
