const messagesDiv = document.getElementById("messages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chatInput2 = document.getElementById("chatInput2");
const sendBtn2 = document.getElementById("sendBtn2");
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

function sendMessage(massage, player) {
  const text = chatInput.value.trim();
  if (!text) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.innerHTML = `
    <strong>${player.name}:</strong> ${massage}
    <button class="report-btn">דווח</button>
  `;

  // דיווח
  const reportBtn = messageDiv.querySelector(".report-btn");
  reportBtn.addEventListener("click", () => {
    if (isOffensive(text)) {
      alert("תגובה פוגענית! מורידים מוניטין לשחקן.");
      currentPlayer.reputation--;
      renderPlayers();
    } else {
      alert("התגובה לא פוגענית לפי הבדיקה.");
    }
  });

  messagesDiv.appendChild(messageDiv);
  chatInput.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.addEventListener("click", () => sendMessage(currentPlayer, ));
sendBtn2.addEventListener("click",()=> sendMessage(currentPlayer2) );

renderPlayers();
