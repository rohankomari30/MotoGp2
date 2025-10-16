# MotoGP Hub 🏍️

A comprehensive dynamic website for MotoGP enthusiasts built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). This application provides detailed information about riders, teams, rankings, sponsors, and media content related to Motorcycle Grand Prix racing.

## Features ✨

### 📊 Comprehensive MotoGP Data
- **Riders Information**: Detailed profiles with stats, achievements, and biographies
- **Teams**: Complete team information including manufacturers and history
- **Rankings**: Real-time championship standings and statistics
- **Sponsors**: All major sponsors and partners of the sport
- **Media Gallery**: Videos and photos from the racing season

### 🎨 Modern UI/UX
- Responsive design optimized for all devices
- Dark and light themes with smooth transitions
- Interactive navigation with smooth scrolling
- Card-based layouts with hover effects
- Professional racing-themed color scheme

### ⚡ High Performance
- Fast loading with optimized frontend
- RESTful API architecture
- Efficient MongoDB queries
- Scalable backend structure

## Technology Stack 🛠️

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: Interactive functionality
- **Font Awesome**: Icons and visual elements

## Prerequisites 📋

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** (comes with Node.js)

## Installation & Setup 🚀

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:**
   Make sure MongoDB is running on your system. You can start it with:
   ```bash
   mongod
   ```

3. **Seed the database with sample data:**
   ```bash
   node seed.js
   ```

4. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## API Endpoints 🔗

The application provides RESTful API endpoints:

### Riders
- `GET /api/riders` - Get all riders
- `GET /api/riders/:id` - Get single rider
- `POST /api/riders` - Create rider
- `PUT /api/riders/:id` - Update rider
- `DELETE /api/riders/:id` - Delete rider

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get single team
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Rankings
- `GET /api/rankings` - Get all rankings
- `GET /api/rankings/:id` - Get single ranking
- `POST /api/rankings` - Create ranking
- `PUT /api/rankings/:id` - Update ranking
- `DELETE /api/rankings/:id` - Delete ranking

### Sponsors
- `GET /api/sponsors` - Get all sponsors
- `GET /api/sponsors/:id` - Get single sponsor
- `POST /api/sponsors` - Create sponsor
- `PUT /api/sponsors/:id` - Update sponsor
- `DELETE /api/sponsors/:id` - Delete sponsor

## Project Structure 📁

```
motogp-hub/
├── models/                    # Mongoose models
│   ├── Rider.js
│   ├── Team.js
│   ├── Ranking.js
│   └── Sponsor.js
├── routes/                    # API route handlers
│   ├── riders.js
│   ├── teams.js
│   ├── rankings.js
│   └── sponsors.js
├── public/                    # Static frontend files
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server.js                  # Main server file
├── seed.js                    # Database seeding script
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## Database Schema 📊

### Rider
- name: String
- number: Number (unique)
- nationality: String
- team: String
- bike: String
- age: Number
- championships: Number
- wins: Number
- podiums: Number
- image: String
- bio: String

### Team
- name: String (unique)
- manufacturer: String
- country: String
- teamPrincipal: String
- founded: Number
- championships: Number
- wins: Number
- logo: String
- description: String

### Ranking
- position: Number (unique)
- riderName: String
- riderNumber: Number
- team: String
- points: Number
- wins: Number
- podiums: Number
- season: Number

### Sponsor
- name: String (unique)
- logo: String
- website: String
- category: Enum ['Title', 'Official', 'Technical', 'Media', 'Other']
- description: String

## Features Overview 🎯

1. **Hero Section**: Welcome message with call-to-action
2. **Live Statistics**: Dynamic counters for riders, teams, and season info
3. **Rider Profiles**: Comprehensive rider information with stats
4. **Team Information**: Detailed team profiles and history
5. **Championship Rankings**: Current season standings
6. **Sponsor Showcase**: All major MotoGP sponsors
7. **Media Gallery**: Racing highlights and content
8. **Responsive Design**: Works on all device sizes

## Development Scripts 📝

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm run seed`: Seed database with sample data

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License 📄

This project is licensed under the ISC License.

## Acknowledgments 🙏

- MotoGP and FIM for making this incredible sport accessible
- All riders, teams, and fans who make MotoGP great
- Image credits to various racing photographers and content creators

---

**Built with ❤️ for MotoGP fans worldwide**
