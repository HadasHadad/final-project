document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("reportedChat"));
  const form = document.getElementById("report-form");
  const resultDiv = document.getElementById("result");

  // אם יש הודעה מדווחת – מציגים אותה
  if (data && data.reportedMessage) {
    document.getElementById("reported-text").textContent =
      `הודעה מדווחת: "${data.reportedMessage}"`;
  } else {
    document.getElementById("reported-text").textContent =
      "לא נבחרה הודעה מסוימת לדיווח.";
  }

  // מאזין ללחיצה על שליחה
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const reason = document.getElementById("reason").value.toLowerCase();

    const offensiveWords = ["stupid", "idiot", "dumb", "poop", "fuck", "ass", "loser", "מטומטם","אידיוט","טיפש","פאק יו","תתאבד","טמבל"];
    let isOffensive = false;

    if (data && data.reportedMessage) {
      isOffensive = offensiveWords.some(word =>
        data.reportedMessage.toLowerCase().includes(word) ||
        reason.includes(word)
      );
    } else {
      // אם אין הודעה מדווחת, נבדוק רק את הסיבה
      isOffensive = offensiveWords.some(word =>
        reason.includes(word)
      );
    }

    if (isOffensive && data) {
      const reportedName = data.reportedMessage.split(":")[0].trim();

      let players = JSON.parse(localStorage.getItem("players")) || [];
      const playerToUpdate = players.find(p => p.name === reportedName);
      if (playerToUpdate) {
        playerToUpdate.reputation = Math.max(0, (playerToUpdate.reputation || 0) - 1);
        localStorage.setItem("players", JSON.stringify(players));
      }

      let currentUser = JSON.parse(localStorage.getItem("CurrentlyloggedIn"));
      if (currentUser && currentUser.name === reportedName) {
        currentUser.reputation = playerToUpdate?.reputation;
        localStorage.setItem("CurrentlyloggedIn", JSON.stringify(currentUser));
      }

      resultDiv.innerHTML = "✅ ההודעה זוהתה כפוגענית. נשללה נקודת מוניטין.";
    } else if (isOffensive) {
      resultDiv.innerHTML = "✅ הדיווח התקבל. נשקלת פגיעה בהתנהגות.";
    } else {
      resultDiv.innerHTML = "ℹ️ ההודעה לא זוהתה כפוגענית.";
    }

    localStorage.removeItem("reportedChat");
    document.getElementById("reason").value = "";
  });
});
