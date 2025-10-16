const mongoose = require('mongoose');
const Rider = require('./models/Rider');
const Team = require('./models/Team');
const Ranking = require('./models/Ranking');
const Sponsor = require('./models/Sponsor');

// ...existing code...
const sampleRiders = [
  {
    name: "Francesco Bagnaia",
    number: 1,
    nationality: "Italy",
    team: "Ducati Lenovo Team",
    bike: "Ducati GP23",
    age: 27,
    championships: 0,
    wins: 4,
    podiums: 34,
    image: "/images/riders/frans.jpg",
    bio: "Italian rider, former Moto2 champion, current MotoGP World Champion for 2022 and 2023."
  },
  {
    name: "Marc Márquez",
    number: 93,
    nationality: "Spain",
    team: "Gresini Racing MotoGP",
    bike: "Ducati GP22",
    age: 31,
    championships: 8,
    wins: 59,
    podiums: 142,
    image: "/images/riders/marc.jpg",
    bio: "8-time MotoGP champion, considered one of the greatest riders of all time."
  },
  {
    name: "Jorge Martín",
    number: 89,
    nationality: "Spain",
    team: "Prima Pramac Racing",
    bike: "Ducati GP24",
    age: 26,
    championships: 0,
    wins: 1,
    podiums: 17,
    image: "/images/riders/jorge.jpg",
    bio: "Young Spanish talent, 2024 MotoGP runner-up."
  },
  {
    name: "Brad Binder",
    number: 33,
    nationality: "South Africa",
    team: "Red Bull KTM Factory Racing",
    bike: "KTM RC16",
    age: 29,
    championships: 1,
    wins: 3,
    podiums: 17,
    image: "/images/riders/brad.jpg",
    bio: "Only South African rider to win a MotoGP race, 2020 MotoGP champion."
  },
  {
    name: "Aleix Espargaró",
    number: 41,
    nationality: "Spain",
    team: "Trackhouse Racing",
    bike: "Aprilia RS-GP24",
    age: 35,
    championships: 0,
    wins: 0,
    podiums: 20,
    image: "/images/riders/alex.jpg",
    bio: "Veteran rider, led Aprilia to success before joining factory team."
  },
  {
    name: "Jack Miller",
    number: 43,
    nationality: "Australia",
    team: "Red Bull KTM Factory Racing",
    bike: "KTM RC16",
    age: 29,
    championships: 0,
    wins: 2,
    podiums: 23,
    image: "/images/riders/jack.jpg",
    bio: "Australian rider, aggressive riding style, known for overtaking maneuvers."
  }
];


const sampleTeams = [
  {
    name: "Ducati Lenovo Team",
    manufacturer: "Ducati",
    country: "Italy",
    teamPrincipal: "Luigi Dall'Igna",
    founded: 2021,
    championships: 2,
    wins: 45,
    logo: "/images/Teams/duc.jpg",
    description: "Official Ducati factory team, among the most successful teams in recent years."
  },
  {
    name: "Red Bull KTM Factory Racing",
    manufacturer: "KTM",
    country: "Austria",
    teamPrincipal: "Pit Beirer",
    founded: 2007,
    championships: 1,
    wins: 5,
    logo: "/images/Teams/red.jpg",
    description: "KTM's factory team, making significant progress in MotoGP."
  },
  {
    name: "Prima Pramac Racing",
    manufacturer: "Ducati",
    country: "Italy",
    teamPrincipal: "Paolo Campinoti",
    founded: 2002,
    championships: 0,
    wins: 10,
    logo: "/images/Teams/pram.jpg",
    description: "Italian satellite team riding Ducati bikes."
  },
  {
    name: "Gresini Racing MotoGP",
    manufacturer: "Ducati",
    country: "Italy",
    teamPrincipal: "Nadia Padovani",
    founded: 1997,
    championships: 1,
    wins: 27,
    logo: "/images/Teams/gr.jpg",
    description: "Experienced team in MotoGP, recently partnered with Dionisi Racing."
  },
  {
    name: "Trackhouse Racing",
    manufacturer: "Aprilia",
    country: "Italy",
    teamPrincipal: "Justin Marks",
    founded: 2023,
    championships: 0,
    wins: 1,
    logo: "/images/Teams/tr.jpg",
    description: "F1 team Trackhouse Racing's MotoGP venture, partnered with Aprilia."
  },
  {
    name: "Repsol Honda Team",
    manufacturer: "Honda",
    country: "Japan",
    teamPrincipal: "Alberto Puig",
    founded: 1995,
    championships: 16,
    wins: 225,
    logo: "/images/Teams/rep.jpg",
    description: "The most successful team in MotoGP history."
  }
];

const sampleRankings = [
  { position: 1, riderName: "Francesco Bagnaia", riderNumber: 1, team: "Ducati Lenovo Team", points: 239, wins: 4, podiums: 10, season: 2024 },
  { position: 2, riderName: "Jorge Martín", riderNumber: 89, team: "Prima Pramac Racing", points: 226, wins: 1, podiums: 8, season: 2024 },
  { position: 3, riderName: "Marc Márquez", riderNumber: 93, team: "Gresini Racing MotoGP", points: 218, wins: 3, podiums: 7, season: 2024 },
  { position: 4, riderName: "Enea Bastianini", riderNumber: 23, team: "Ducati Lenovo Team", points: 194, wins: 0, podiums: 6, season: 2024 },
  { position: 5, riderName: "Brad Binder", riderNumber: 33, team: "Red Bull KTM Factory Racing", points: 184, wins: 1, podiums: 6, season: 2024 },
  { position: 6, riderName: "Álex Márquez", riderNumber: 73, team: "Gresini Racing MotoGP", points: 173, wins: 2, podiums: 6, season: 2024 },
  { position: 7, riderName: "Aleix Espargaró", riderNumber: 41, team: "Trackhouse Racing", points: 168, wins: 0, podiums: 4, season: 2024 },
  { position: 8, riderName: "Jack Miller", riderNumber: 43, team: "Red Bull KTM Factory Racing", points: 156, wins: 0, podiums: 5, season: 2024 },
  { position: 9, riderName: "Miguel Oliveira", riderNumber: 88, team: "Trackhouse Racing", points: 150, wins: 0, podiums: 3, season: 2024 },
  { position: 10, riderName: "Pedro Acosta", riderNumber: 31, team: "Gas Gas Factory Team Tech3", points: 123, wins: 1, podiums: 3, season: 2024 }
];

const sampleSponsors = [
  {
    name: "Monster Energy",
    logo: "/images/sponsors/mons.jpg",
    website: "https://www.monsterenergy.com",
    category: "Title",
    description: "Provides energy drinks and is the title sponsor of the MotoGP championship."
  },
  {
    name: "Pirelli",
    logo: "/images/sponsors/pir.jpg",
    website: "https://www.pirelli.com",
    category: "Official",
    description: "Official tire supplier providing high-performance tires for all MotoGP races."
  },
  {
    name: "Red Bull",
    logo: "/images/sponsors/red.jpg",
    website: "https://www.redbull.com",
    category: "Title",
    description: "Energy drink brand sponsoring multiple teams and riders in MotoGP."
  },
  {
    name: "Mobil 1",
    logo: "/images/sponsors/mob.jpg",
    website: "https://www.mobil1.com",
    category: "Technical",
    description: "Provides lubricants and technical partnership support."
  },
  {
    name: "Castrol",
    logo: "/images/sponsors/cas.jpg",
    website: "https://www.castrol.com",
    category: "Technical",
    description: "Premium oil and lubricant brand supporting various teams."
  },
  {
    name: "MT Helmets",
    logo: "/images/sponsors/mt.jpg",
    website: "https://www.mt-helmets.com",
    category: "Technical",
    description: "Official helmet supplier for many riders in MotoGP."
  },
  {
    name: "AGV",
    logo: "/images/sponsors/agv.jpg",
    website: "https://www.agv.com",
    category: "Technical",
    description: "Premium helmet manufacturer with partnerships across MotoGP."
  },
  {
    name: "Alpinestars",
    logo: "/images/sponsors/ap.jpg",
    website: "https://www.alpinestars.com",
    category: "Technical",
    description: "Provides leather suits and protective gear worldwide."
  },
  {
    name: "SKY RACING Team VR46",
    logo: "/images/sponsors/vr.jpg",
    website: "https://www.sky.it/sport/motogp",
    category: "Media",
    description: "Italian broadcaster with exclusive broadcasting rights."
  },
  {
    name: "Dorna Sports",
    logo: "/images/sponsors/dorna.jpg",
    website: "https://www.dorna.com",
    category: "Official",
    description: "Commercial rights holder overseeing the MotoGP championship."
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://23eg106b30_db_user:Wgyi9OJ9HUTqmUh4@cluster0.tqwtezl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Rider.deleteMany({}),
      Team.deleteMany({}),
      Ranking.deleteMany({}),
      Sponsor.deleteMany({})
    ]);

    // Insert sample data
    await Promise.all([
      Rider.insertMany(sampleRiders),
      Team.insertMany(sampleTeams),
      Ranking.insertMany(sampleRankings),
      Sponsor.insertMany(sampleSponsors)
    ]);

    console.log('Database seeded successfully!');
    console.log('Added:', {
      riders: sampleRiders.length,
      teams: sampleTeams.length,
      rankings: sampleRankings.length,
      sponsors: sampleSponsors.length
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
