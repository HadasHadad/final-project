function header(){
  document.addEventListener("DOMContentLoaded", () => {
    const headerPlace = document.getElementById("headerplace");

     fetch('./project/header.html')
      .then(response => response.text())
      .then(data => {
        if (headerPlace) {
          headerPlace.innerHTML = data;
        }
        const nav = document.getElementById("main-nav");
        const loggedIn = localStorage.getItem("loggedIn");

        if (nav) {
          if (loggedIn === "true") {
            nav.innerHTML = `
              <a href="./index.html">בית</a>
              <a href="./project/game.html">🎮המשחק</a>
              <a href="./project/profile.html">פרופיל שחקן</a>
              <a href="#" onclick="logoutUser()">התנתק</a>
            `;
          } else {
            nav.innerHTML = `
              <a href="./index.html">בית</a>
              <a href="./project/game.html">🎮המשחק</a>
              <a href="./about.html">אודות</a>
              <a href="./log-in page.html">התחברות</a>
              <a href="./Sign-Up_Page.html">הרשמה</a>
              <a href="./Contactandhelp.html">צור קשר</a>
            `;
          }
        }
      });
  });
}




header()    

  