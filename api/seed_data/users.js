const bcrypt = require('bcrypt')

module.exports = [
  { // 1
    first_name: 'Mulan',
    last_name: 'Fa',
    email: 'Fa.Mulan@gmail.com',
    password: bcrypt.hashSync('disney.1998', 10),
    photo_url: 'https://i.pinimg.com/474x/c4/37/f0/c437f0b83c29b57e2b5fa34474c5ff94--disney-gift-disney-cruiseplan.jpg',
    user_type: 'mentor'
  },
  { // 2
    first_name: 'Clark',
    last_name: 'Kent',
    email: 'clark.kent@gmail.com',
    password: bcrypt.hashSync('Smallville4ever', 10),
    photo_url: 'https://wehco.media.clients.ellingtoncms.com/img/photos/2020/08/27/resized_150246-platform0828-rgb_61-30434_t800.jpg',
    user_type: 'mentor'
  },
  { // 3
    first_name: 'Son',
    last_name: 'Gokū',
    email: 'Goku.dargon@gmail.com',
    password: bcrypt.hashSync('manga4life', 10),
    photo_url: 'https://twibbon.blob.core.windows.net/twibbon/2016/124/fc5bdc8e-2e91-4de2-8856-6b57ee90f2c4.png',
    user_type: 'mentor'
  },
  { // 4
    first_name: 'Pikkoro',
    last_name: 'Junia',
    email: 'Piccolo.jr@gmail.com',
    password: bcrypt.hashSync('piccolo123', 10),
    photo_url: 'https://pbs.twimg.com/media/ETWF0xCXsAMPUPi.jpg',
    user_type: 'mentor'
  },
  { // 5
    first_name: 'Wanda',
    last_name: 'Maximoff',
    email: 'Wanda.Scarlet@gmail.com',
    password: bcrypt.hashSync('Avengers127', 10),
    photo_url: 'https://i.pinimg.com/280x280_RS/e3/88/66/e388666d37bd5ab29861912b00837108.jpg',
    user_type: 'mentor'
  },
  { // 6
    first_name: 'Diana',
    last_name: 'Prince',
    email: 'Wonder.Women@gmail.com',
    password: bcrypt.hashSync('Diana125', 10),
    photo_url: 'https://i.pinimg.com/280x280_RS/e3/88/66/e388666d37bd5ab29861912b00837108.jpg',
    user_type: 'mentor'
  },
  { // 7
    first_name: 'Samuel',
    last_name: 'Wilson',
    email: 'Flacon@gmail.com',
    password: bcrypt.hashSync('flying230', 10),
    photo_url: 'https://i.pinimg.com/originals/cc/5a/fc/cc5afc42603251a6272288247b331be6.jpg',
    user_type: 'mentor'
  },
  { // 8
    first_name: 'Aì',
    last_name: 'Luò',
    email: 'Iroh@gmail.com',
    password: bcrypt.hashSync('WhiteLotus', 10),
    photo_url: 'https://i1.sndcdn.com/avatars-000315856604-uemu3w-t500x500.jpg',
    user_type: 'mentor'
  },
  { // 9
    first_name: 'Bruce',
    last_name: 'Wayne',
    email: 'Bruce.Wayne@gmail.com',
    password: bcrypt.hashSync('GothmanCity', 10),
    photo_url: 'https://static.wikia.nocookie.net/youngjustice/images/0/0f/Bruce_Wayne.png',
    user_type: 'mentor'
  },
  { // 10
    first_name: 'Groot',
    last_name: 'Garden',
    email: 'Groot@gmail.com',
    password: bcrypt.hashSync('galaxyGarden', 10),
    photo_url: 'https://wallpapercave.com/wp/wp3913853.jpg',
    user_type: 'mentor'
  },
  { // 11
    first_name: 'Yoda',
    last_name: 'Jedi',
    email: 'Yoda@gmail.com',
    password: bcrypt.hashSync('StarWars', 10),
    photo_url: 'https://images2.minutemediacdn.com/image/upload/c_crop,h_1349,w_2400,x_0,y_92/f_auto,q_auto,w_1100/v1576687935/shape/mentalfloss/72897-gettyimages-1163281433.jpg',
    user_type: 'mentor'
  },
  { // 12
    first_name: 'Kakashi',
    last_name: 'Hatake',
    email: 'Kakashi@gmail.com',
    password: bcrypt.hashSync('Hatake1234', 10),
    photo_url: 'https://static.wikia.nocookie.net/naruto/images/2/27/Kakashi_Hatake.png',
    user_type: 'mentor'
  },
  { // 13
    first_name: 'Harley',
    last_name: 'Quinn',
    email: 'Harley.Quinn@gmail.com',
    password: bcrypt.hashSync('Queen.Quinn123', 10),
    photo_url: 'https://i.pinimg.com/originals/a3/c6/3a/a3c63aa8aedb5ec4df669d24ed011cb1.jpg',
    user_type: 'mentee'
  },
  { // 14
    first_name: 'Zǔ',
    last_name: 'Kòu',
    email: 'Zuko@gmail.com',
    password: bcrypt.hashSync('Fire.Nation!', 10),
    photo_url: 'https://static.wikia.nocookie.net/avatar/images/4/4b/Zuko.png',
    user_type: 'mentee'
  },
  { // 15
    first_name: 'Korra',
    last_name: 'Water',
    email: 'Korra@gmail.com',
    password: bcrypt.hashSync('LegendKorra', 10),
    photo_url: 'https://decider.com/wp-content/uploads/2020/08/the-legend-of-korra.jpg',
    user_type: 'mentee'
  },
  { // 16
    first_name: 'Peter',
    last_name: 'Parker',
    email: 'Peter@gmail.com',
    password: bcrypt.hashSync('NYC4Ever', 10),
    photo_url: 'https://www.superherohype.com/assets/uploads/2020/09/PeterParker-1280x720.jpg',
    user_type: 'mentee'
  },
  { // 17
    first_name: 'Son',
    last_name: 'Goten',
    email: 'Goten@gmail.com',
    password: bcrypt.hashSync('Dragon102', 10),
    photo_url: 'https://static.wikia.nocookie.net/dragonball/images/9/91/Goten_1.jpg',
    user_type: 'mentee'
  },
  { // 18
    first_name: 'Prince',
    last_name: 'Trunks',
    email: 'Trunks@gmail.com',
    password: bcrypt.hashSync('trunks125', 10),
    photo_url: 'https://i.pinimg.com/originals/ad/72/dd/ad72dd44249e80a1a39a105f5fe6a826.jpg',
    user_type: 'mentee'
  },
  { // 19
    first_name: 'Naruto',
    last_name: 'Uzimaki',
    email: 'Uzimaki@gmail.com',
    password: bcrypt.hashSync('Uzimaki123', 10),
    photo_url: 'https://pm1.narvii.com/6460/0f3756bba7afd3b5541085f1f24e9334046cd19c_hq.jpg',
    user_type: 'mentee'
  },
  { // 20
    first_name: 'Sakura',
    last_name: 'Haruno',
    email: 'Haruno@gmail.com',
    password: bcrypt.hashSync('Haruno555', 10),
    photo_url: 'https://static.wikia.nocookie.net/shipping/images/2/2a/Sakura_Haruno.png',
    user_type: 'mentee'
  },
  { // 21
    first_name: 'Sasuke',
    last_name: 'Uchiha',
    email: 'Uchiha@gmail.com',
    password: bcrypt.hashSync('Uchiha', 10),
    photo_url: 'https://i.pinimg.com/474x/23/48/89/2348896bdfd34968b13a01b68fe4c8bd.jpg',
    user_type: 'mentee'
  },
  { // 22
    first_name: 'Baby',
    last_name: 'Yoda',
    email: 'Baby.Yoda@gmail.com',
    password: bcrypt.hashSync('cuteyoda123', 10),
    photo_url: 'https://i.pinimg.com/originals/03/4d/ab/034dabc2b3ae989305a5c7923637f4be.png',
    user_type: 'mentee'
  }
]

// trunks

// naruto uzimaki(ninja, hokage, village leader ),

// Sakura Haruno (medical ninja) -> EMT

// Sasuke Uchiha (sercurity) all work for the Hidden Leaf Village
