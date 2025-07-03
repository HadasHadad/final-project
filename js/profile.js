
  
document.addEventListener("DOMContentLoaded", () => {
  const current = JSON.parse(localStorage.getItem("CurrentlyloggedIn"));
  const  stats = document.getElementById("playerForm1")
  const  restrictions = document.getElementById("playerForm2")
const  playerRep = document.getElementById("reputation")
 


  const greetingDiv = document.getElementById('greeting');

  if (!current) {
   
    window.location.href = "./Log-in_Page.html";
    return;
  }
  else{

    greetingDiv.innerHTML = `שלום ${current.name}`;
    stats.innerHTML=`נצחונות: ${current.gameWon} <br> הפסדים: ${current.gameLost}`
   playerRep.innerHTML=`מוניטין: ${current.reputation}`

     if (current.reputation <= 9 ){
    restrictions.innerHTML = "אחלה מוניטין"
  }

  else if (current.reputation <= 8 ){
    restrictions.innerHTML = `    90%   חיים   <span class= "resX">X</span>   <br> 
     6 שניות המתנה למכה מיוחדת  <span class= "resX">X</span>   <br> 
      גובה ורוחב גוף גדולים פי 1.1   <span class= "resX">X</span>   <br> 

    `
  }
  else if (current.reputation <= 6 ){
     restrictions.innerHTML = `    80%   חיים   <span class= "resX">X</span>   <br> 
     7 שניות המתנה למכה מיוחדת  <span class= "resX">X</span>   <br> 
      גובה ורוחב גוף גדולים פי 1.25   <span class= "resX">X</span>   <br> 

    `
  }
  else if (current.reputation <= 4 ){
      restrictions.innerHTML = `    60%   חיים   <span class= "resX">X</span>   <br> 
     8 שניות המתנה למכה מיוחדת  <span class= "resX">X</span>   <br> 
      גובה ורוחב גוף גדולים פי 1.5   <span class= "resX">X</span>   <br> 

    `
  }
  else if (current.reputation <= 2 ){
      restrictions.innerHTML = `    40%   חיים   <span class= "resX">X</span>   <br> 
     9 שניות המתנה למכה מיוחדת  <span class= "resX">X</span>   <br> 
      גובה ורוחב גוף גדולים פי 1.75   <span class= "resX">X</span>   <br> 

    `
  }
  
   
  }
}
  
);