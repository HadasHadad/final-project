document.addEventListener('DOMContentLoaded', () => {
  
  // Default profile info using your existing variables
  let defaultProfileInfo = [
    { gameWon: 0, gameLost: 0, name: "שחקן1", reputation: 10 },
    { gameWon: 0, gameLost: 0, name: "שחקן2", reputation: 10 }
  ];


  let current = JSON.parse(localStorage.getItem("UserInfo"))
  console.log(current.gameWon)
  // Load from localStorage or use default
  let storedData = localStorage.getItem('profileInfo');
  let profileInfo;
  
  if (storedData) {
    try {
      profileInfo = JSON.parse(storedData);
    } catch (e) {
      // If parsing fails, use default
      profileInfo = defaultProfileInfo;
    }
  } else {
    // No stored data, use default and save it
    profileInfo = defaultProfileInfo;
    localStorage.setItem('profileInfo', JSON.stringify(profileInfo));
  }

  // Show greeting for first player
  const greetingDiv = document.getElementById('greeting');
  if (profileInfo && profileInfo.length > 0) {
    greetingDiv.innerHTML = `שלום ${current.name}`;
    playerForm1.innerHTML=`נצחונות: ${profileInfo[0].gameWon} <br> הפסדים: ${profileInfo[0].gameLost}`
    reputation.innerHTML=`מוניטין: ${profileInfo.reputation}`
   
  }

  // Show profile info for all players
  const profileContainer = document.getElementById('profile');
  if (profileContainer) {
    profileContainer.style.display = 'block';
    profileContainer.innerHTML = '';

    // profileInfo.forEach(player => {
    //   const playerDiv = document.createElement('div');
    //   playerDiv.innerHTML = `
    //     <h3>${player.name}</h3>
    //   <p>יש לך ${player.gameWon} נצחונות, ${player.gameLost} הפסדים, ו- ${player.reputation} נקודות מוניטין.</p>
    //   `;
    //   profileContainer.appendChild(playerDiv);
    // });
  }
});