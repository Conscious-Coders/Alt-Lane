const bcrypt = require('bcrypt');

module.exports = [
  {
    first_name: "Mulan", 
    last_name: "Fa", 
    email: "Fa.Mulan@gmail.com",
    password: bcrypt.hashSync("disney.1998", 10), 
    photo_url: "https://i.pinimg.com/474x/c4/37/f0/c437f0b83c29b57e2b5fa34474c5ff94--disney-gift-disney-cruiseplan.jpg"
  },
  {
    first_name: "Clark", 
    last_name: "Kent", 
    email: "clark.kent@gmail.com",
    password: bcrypt.hashSync("Smallville4ever", 10), 
    photo_url: "https://static.wikia.nocookie.net/superman/images/0/0a/Clarkkent-secretorigin.jpg/revision/latest/scale-to-width-down/340?cb=20100916050519"
  },
  {
    first_name: "Caroline", 
    last_name: "Vigil", 
    email: "CarolineSVigil@yahoo.com",
    password: bcrypt.hashSync("fakepassword123", 10), 
    photo_url: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    first_name: "Fantino", 
    last_name: "Serrato", 
    email: "Lautim1973@gmail.com",
    password: bcrypt.hashSync("Aew9Iika", 10),  
    photo_url: "https://images.pexels.com/photos/6501761/pexels-photo-6501761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    first_name: "Keaana", 
    last_name: "Deldarnesb", 
    email: "KeaanaDeldarnesb@hotmail.com",
    password: bcrypt.hashSync("Aed2Xo3Xe", 10), 
    photo_url: "https://images.pexels.com/photos/6347976/pexels-photo-6347976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  }
  
]; 

