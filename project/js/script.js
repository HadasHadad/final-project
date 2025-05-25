const messagesDiv = document.getElementById("messages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const playersDiv = document.getElementById("players");

let currentPlayer = players[0]; // ברירת מחדל

function renderPlayers() {
  playersDiv.innerHTML = '';
  players.forEach(player => {
    const div = document.createElement('div');
    div.classList.add('player');
    if (player.reputation < 3) {
      div.classList.add('low-reputation');
    }
    div.innerText = `${player.name} - מוניטין: ${player.reputation}`;
    playersDiv.appendChild(div);
  });
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.innerHTML = `
    <strong>${currentPlayer.name}:</strong> ${text}
    <button class="report-btn">דווח</button>
  `;

  // דיווח
  const reportBtn = messageDiv.querySelector(".report-btn");
  reportBtn.addEventListener("click", () => {
    if (isOffensive(text)) {
      alert("תגובה פוגענית! מורידים מוניטין לשחקן.");
            window.location.href = 'report.html';
      currentPlayer.reputation--;
      renderPlayers();
    } else {
      alert(" התגובה לא פוגענית לפי הבדיקה, תוכל לדווח בכל זאת.");
            window.location.href = 'report.html';
    }
  });

  messagesDiv.appendChild(messageDiv);
  chatInput.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

renderPlayers();

