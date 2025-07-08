const messagesDiv = document.getElementById("messagesDiv");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const playerSelect = document.getElementById("playerSelect");

sendBtn.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (!text) return;

    const player = JSON.parse(localStorage.getItem("CurrentlyloggedIn"));

    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.style.backgroundColor= "aliceblue"
    messageDiv.innerHTML = `
        <strong>${player.name}:</strong> ${text}
        <button class="report-btn">דווח</button>
      `;

   
    messageDiv.dataset.messageText = `${player.name}: ${text}`;

    const reportBtn = messageDiv.querySelector(".report-btn");
    reportBtn.addEventListener("click", () => {
        const confirmed = confirm("האם אתה בטוח שברצונך לדווח?");
        if (confirmed) {
            const reportedMessage = messageDiv.dataset.messageText; 
            const fullChat = getChatMessages(); 

            localStorage.setItem("reportedChat", JSON.stringify({
                reportedMessage,
                fullChat: fullChat
            }));
            
            window.location.href = "./report.html";
        }
    });

    messagesDiv.appendChild(messageDiv);
    chatInput.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

function getChatMessages() {
    const messages = [];
    
    document.querySelectorAll(".message").forEach(msgDiv => {
        const messageText = msgDiv.dataset.messageText;
        if (messageText) {
            messages.push(messageText);
        }
    });
    
    return messages;
}