document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("main-nav");
    const loggedIn = localStorage.getItem("loggedIn");
  
    if (nav) {
      if (loggedIn === "true") {
        nav.innerHTML = `
          <a href="#">בית</a>
          <a href=".//game.html" >🎮המשחק </a>
          <a href="/public/profile.html">פרופיל שחקן</a>
          <a href="/public/contactandhelp.html">צור קשר</a>
          <a href="./about.html">אודות</a>
          <a href="#" onclick="logoutUser()">התנתק</a>
        `;
      } else {
        nav.innerHTML = `
          <a href="#">בית</a>
          <a href="./game.html">🎮המשחק</a>
          <a href="./about.html">אודות</a>
           <a href="/public/Log-in_Page.html">התחברות</a>
          <a href="/public/Sign-Up_Page.html">הרשמה</a>
          <a href="/public/contactandhelp.html">צור קשר</a>

        `;
      }
    }
  });
  
