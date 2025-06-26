const messagesDiv = document.getElementById("messagesDiv");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const playersDiv = document.getElementById("players");
sendBtn.addEventListener("click", sendMessage)

let currentPlayer = players[0]; // ברירת מחדל

// function renderPlayers() {
//   playersDiv.innerHTML = '';
//   players.forEach(player => {
//     const div = document.createElement('div');
//     div.classList.add('player');
//     if (player.reputation < 3) {
//       div.classList.add('low-reputation');
//     }
//     div.innerText = `${player.name} - מוניטין: ${player.reputation}`;
//     playersDiv.appendChild(div);
//   });
// }

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  messageDiv = document.createElement("messageDiv");
  messageDiv.className = "message";
  messageDiv.innerHTML = `
    <strong>${currentPlayer.name}: </strong> ${text}
    <button class="report-btn">דווח</button>
  `};

  // דיווח
const reportBtn = messageDiv.querySelector(".report-btn");
reportBtn.addEventListener("click", () => {
  if (isOffensive(text)) {
    const confirmed = confirm("האם אתה בטוח שברצונך לדווח?");
    if (confirmed) {
      alert("תגובה פוגענית! מורידים מוניטין לשחקן.");
      currentPlayer.reputation-- || 
      players == JSON.parse(localStorage.getItem("players")) || [];
      players[0].reputation--;
      localStorage.setItem("players", JSON.stringify(players));

      renderPlayers();
    } else {
      alert(" התגובה לא פוגענית לפי הבדיקה, תוכל לדווח בכל זאת.");
    }
  }
});

messagesDiv.appendChild(messageDiv);
chatInput.value = "";
messagesDiv.scrollTop = messagesDiv.scrollHeight;


// sendBtn.addEventListener("click", sendMessage);

// renderPlayers();







//sign up js









//log in js












//header js

  





//nav bar js
