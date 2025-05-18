function isOffensive(message ) {
    const badWords = ["טיפש", "אידיוט", "מטומטם", "fuck", "fuckyou","faggot","kill yout self","kys","stupid","i hate trump","joe biden is good","i love russia","idiot","מניאק"];
    return badWords.some(word => message.includes(word));
  }
  