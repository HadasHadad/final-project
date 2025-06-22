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

       
      });

      
  });
}




header()    

  