document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("main-nav");
  const loggedIn = localStorage.getItem("loggedIn");


  if (nav) {
    if (loggedIn === "true") {
      nav.innerHTML = `
        <a href="/index.html">בית</a>
        <a href="/public/game.html" >🎮המשחק </a>
        <a href="/public/profile.html">פרופיל שחקן</a>
        <a href="/public/contactandhelp.html">צור קשר</a>
        <a href="/public/about.html">אודות</a>
        <a href="#" onclick="logoutUser()">התנתק</a>
      `;
    } else {
      nav.innerHTML = `
        <a href="/index.html">בית</a>
        <a href="/public/game.html">🎮המשחק</a>
        <a href="/public/about.html">אודות</a>
        <a href="/public/Log-in_Page.html">התחברות</a>
        <a href="/public/Sign-Up_Page.html">הרשמה</a>
        <a href="/public/contactandhelp.html">צור קשר</a>
      `;
    }
  }

  const playButton = document.getElementById("PlayButton");
  if (playButton) {
    playButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (loggedIn === "true") {
        window.location.href = "/public/game.html";
      } else {
        window.location.href = "/public/Log-in_Page.html";
      }
    });
  }
}); 

function logoutUser() {
  localStorage.setItem("loggedIn", "false");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("CurrentlyloggedIn"); 
  window.location.href = "/index.html";
}
