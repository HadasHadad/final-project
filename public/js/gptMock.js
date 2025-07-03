function isOffensive(message ) {
    const badWords = ["טיפש", "אידיוט", "מטומטם", "fuck", "fuckyou" , "go to hell" , "בן זונה" , "זונה" , "בת זונה", "פאק", "shit","bitch","asshole", "damn","זונה", "מניאק", "חרא", "מטומטם","דביל", "כוסאמאשך","כוסאמק","כוסעמק ","אינעל אבוק ","אינעל רבאק","פאק יו"]; 
    return badWords.some(word => message.includes(word));
  }
  