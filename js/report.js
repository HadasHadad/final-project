document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("reportedChat"));
  if (!data) return;

  const reportedMessage = data.reportedMessage;
  const fullChat = data.fullChat;

  document.getElementById("reported-text").textContent =
    `הודעה מדווחת: "${reportedMessage}"`;

  const form = document.getElementById("report-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const reason = document.getElementById("reason").value.toLowerCase();

    const offensiveWords = ["stupid", "idiot", "dumb", "poop", "fuck", "ass", "loser", "מטומטם"]; 
    const isOffensive = offensiveWords.some(word =>
      reportedMessage.toLowerCase().includes(word) ||
      reason.includes(word)
    );

    const resultDiv = document.getElementById("result");

    if (isOffensive) {
      const reportedName = reportedMessage.split(":")[0].trim();

      
      let players = JSON.parse(localStorage.getItem("players")) || [];
      const playerToUpdate = players.find(p => p.name === reportedName);
      if (playerToUpdate) {
        playerToUpdate.reputation = Math.max(0, (playerToUpdate.reputation || 0) - 1);
        localStorage.setItem("players", JSON.stringify(players));
      }

      
      let currentUser = JSON.parse(localStorage.getItem("CurrentlyloggedIn"));
      if (currentUser && currentUser.name === reportedName) {
        currentUser.reputation = playerToUpdate.reputation;
        localStorage.setItem("CurrentlyloggedIn", JSON.stringify(currentUser));
      }

      resultDiv.innerHTML = "ההודעה זוהתה כפוגענית. נשללה נקודת מוניטין.";
    } else {
      resultDiv.innerHTML = "ההודעה לא זוהתה כפוגענית.";
    }

    localStorage.removeItem("reportedChat");
  });
});
