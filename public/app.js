// API Base URL - Use relative URL for production deployment
const API_URL = window.location.origin + '/api';

// Simple SPA Router
class SPARouter {
    constructor() {
        this.routes = {
            '/': this.homeView,
            '/riders': this.ridersView,
            '/teams': this.teamsView,
            '/rankings': this.rankingsView,
            '/sponsors': this.sponsorsView,
            '/media': this.mediaView
        };
        this.init();
    }

    init() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                this.navigate(href);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.render();
        });

        // Initial render
        this.render();
    }

    navigate(path) {
        history.pushState(null, null, path);
        this.render();
    }

    render() {
        const path = window.location.pathname;
        const view = this.routes[path] || this.homeView;
        view.call(this);
        this.updateActiveNav(path);
        // Scroll to top when navigating to a new page
        window.scrollTo(0, 0);
    }

    updateActiveNav(currentPath) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // View functions
    homeView() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="hero">
                <div class="hero-content">
                    <h1 class="hero-title">Welcome to MotoGP Hub</h1>
                    <p class="hero-subtitle">Your Ultimate Source for MotoGP Racing</p>
                    <button class="btn-primary" onclick="scrollToContent()">Explore Now</button>
                </div>
                <div class="hero-overlay"></div>
            </section>
            <section class="stats-section">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h3 class="stat-number" id="total-riders">0</h3>
                            <p class="stat-label">Active Riders</p>
                        </div>
                        <div class="stat-card">
                            <h3 class="stat-number" id="total-teams">0</h3>
                            <p class="stat-label">Teams</p>
                        </div>
                        <div class="stat-card">
                            <h3 class="stat-number">2024</h3>
                            <p class="stat-label">Season</p>
                        </div>
                        <div class="stat-card">
                            <h3 class="stat-number">20</h3>
                            <p class="stat-label">Races</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="about-motogp-section">
                <div class="container">
                    <h2 class="section-title">About MotoGP</h2>
                    <div class="section-subtitle">Discover the world's premier motorcycle racing championship</div>
                    <div class="about-content">
                        <div class="about-text">
                            <p><strong>MotoGP</strong> is the premier class of motorcycle road racing, featuring the fastest bikes and most skilled riders on the planet. Established in 1949, it has evolved into a global phenomenon that captivates millions of fans worldwide.</p>
                            <p>With top speeds exceeding 360 km/h (225 mph) and cornering forces that can reach 1.5G, MotoGP represents the pinnacle of two-wheeled motorsport technology and human performance.</p>
                        </div>
                        <div class="motogp-facts">
                            <div class="fact-card">
                                <div class="fact-number">75+</div>
                                <div class="fact-label">Years of History</div>
                            </div>
                            <div class="fact-card">
                                <div class="fact-number">360+</div>
                                <div class="fact-label">km/h Top Speed</div>
                            </div>
                            <div class="fact-card">
                                <div class="fact-number">20</div>
                                <div class="fact-label">Grand Prix per Season</div>
                            </div>
                            <div class="fact-card">
                                <div class="fact-number">1.5G</div>
                                <div class="fact-label">Cornering Force</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="shortcuts-section">
                <div class="container">
                    <h2 class="section-title">Quick Access</h2>
                    <div class="section-subtitle">Jump to your favorite sections</div>
                    <div class="shortcuts-grid">
                        <div class="shortcut-card" onclick="router.navigate('/riders')">
                            <div class="shortcut-icon">🏍️</div>
                            <h3>Riders</h3>
                            <p>Meet the world's best motorcycle racers</p>
                        </div>
                        <div class="shortcut-card" onclick="router.navigate('/teams')">
                            <div class="shortcut-icon">🏢</div>
                            <h3>Teams</h3>
                            <p>Discover the constructors behind the speed</p>
                        </div>
                        <div class="shortcut-card" onclick="router.navigate('/rankings')">
                            <div class="shortcut-icon">🏆</div>
                            <h3>Rankings</h3>
                            <p>Check the latest championship standings</p>
                        </div>
                        <div class="shortcut-card" onclick="router.navigate('/sponsors')">
                            <div class="shortcut-icon">💼</div>
                            <h3>Sponsors</h3>
                            <p>Explore our amazing partners</p>
                        </div>
                        <div class="shortcut-card" onclick="router.navigate('/media')">
                            <div class="shortcut-icon">🎥</div>
                            <h3>Media</h3>
                            <p>Watch highlights and behind the scenes</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.loadStats();
    }

    ridersView() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="section riders-section">
                <div class="container">
                    <h2 class="section-title">Top Riders</h2>
                    <div class="section-subtitle">Meet the world's best motorcycle racers</div>
                    <div class="page-info">
                        <div class="info-text">
                            <p><strong>MotoGP riders</strong> are elite athletes who compete at speeds over 360 km/h while maintaining incredible precision and endurance. They must possess exceptional physical fitness, mental strength, and technical expertise.</p>
                            <p>Professional riders typically start in lower categories like Moto3 or Moto2 before advancing to the premier MotoGP class, where they ride 1000cc prototype motorcycles.</p>
                        </div>
                        <div class="info-stats">
                            <div class="info-card">
                                <div class="info-number">22</div>
                                <div class="info-label">Riders per Race</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">1000cc</div>
                                <div class="info-label">Engine Capacity</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">157kg</div>
                                <div class="info-label">Minimum Weight</div>
                            </div>
                        </div>
                    </div>
                    <div id="riders-grid" class="riders-grid">
                        <div class="loading">Loading riders...</div>
                    </div>
                </div>
            </section>
        `;
        this.loadRiders();
    }

    teamsView() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="section teams-section">
                <div class="container">
                    <h2 class="section-title">MotoGP Teams</h2>
                    <div class="section-subtitle">The constructors behind the speed</div>
                    <div class="page-info">
                        <div class="info-text">
                            <p><strong>MotoGP teams</strong> are sophisticated racing organizations that design, develop, and race prototype motorcycles. Each team consists of engineers, mechanics, strategists, and riders working together to achieve victory.</p>
                            <p>Teams are typically backed by major motorcycle manufacturers like Ducati, Honda, Yamaha, and KTM, each bringing their unique engineering philosophy to the track.</p>
                        </div>
                        <div class="info-stats">
                            <div class="info-card">
                                <div class="info-number">12</div>
                                <div class="info-label">Teams in 2024</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">4</div>
                                <div class="info-label">Manufacturers</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">200+</div>
                                <div class="info-label">Team Members</div>
                            </div>
                        </div>
                    </div>
                    <div id="teams-grid" class="teams-grid">
                        <div class="loading">Loading teams...</div>
                    </div>
                </div>
            </section>
        `;
        this.loadTeams();
    }

    rankingsView() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="section rankings-section">
                <div class="container">
                    <h2 class="section-title">Championship Standings</h2>
                    <div class="section-subtitle">2024 Season Rankings</div>
                    <div class="page-info">
                        <div class="info-text">
                            <p><strong>MotoGP Championship</strong> points are awarded based on finishing positions in each race. The rider and team with the most points at the end of the season become world champions.</p>
                            <p>Points are distributed as follows: 25 for 1st, 20 for 2nd, 16 for 3rd, down to 1 point for 15th place. Additional rules and regulations ensure fair competition throughout the season.</p>
                        </div>
                        <div class="info-stats">
                            <div class="info-card">
                                <div class="info-number">25</div>
                                <div class="info-label">Points for 1st</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">20</div>
                                <div class="info-label">Points for 2nd</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">16</div>
                                <div class="info-label">Points for 3rd</div>
                            </div>
                        </div>
                    </div>
                    <div class="rankings-container">
                        <div class="rankings-header">
                            <div class="rank-col">Pos</div>
                            <div class="rider-col">Rider</div>
                            <div class="team-col">Team</div>
                            <div class="points-col">Points</div>
                            <div class="wins-col">Wins</div>
                            <div class="podiums-col">Podiums</div>
                        </div>
                        <div id="rankings-list" class="rankings-list">
                            <div class="loading">Loading rankings...</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.loadRankings();
    }

    sponsorsView() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="section sponsors-section">
                <div class="container">
                    <h2 class="section-title">Our Sponsors</h2>
                    <div class="section-subtitle">Powering the sport we love</div>
                    <div class="page-info">
                        <div class="info-text">
                            <p><strong>MotoGP sponsors</strong> play a crucial role in the sport, providing financial support and technical partnerships. From title sponsors to technical suppliers, they help bring the excitement of motorcycle racing to fans worldwide.</p>
                            <p>Sponsorship in MotoGP includes various categories such as title sponsors, official suppliers, and team partners, each contributing to the development and promotion of the sport.</p>
                        </div>
                        <div class="info-stats">
                            <div class="info-card">
                                <div class="info-number">50+</div>
                                <div class="info-label">Global Partners</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">€500M+</div>
                                <div class="info-label">Annual Investment</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">200+</div>
                                <div class="info-label">Countries Reached</div>
                            </div>
                        </div>
                    </div>
                    <div id="sponsors-grid" class="sponsors-grid">
                        <div class="loading">Loading sponsors...</div>
                    </div>
                </div>
            </section>
        `;
        this.loadSponsors();
    }

    mediaView() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="section media-section">
                <div class="container">
                    <h2 class="section-title">Media Gallery</h2>
                    <div class="section-subtitle">Latest photos and videos</div>
                    <div class="page-info">
                        <div class="info-text">
                            <p><strong>MotoGP media coverage</strong> brings the excitement of racing to fans worldwide through television, online streaming, and social media. Professional production teams capture every moment from multiple camera angles.</p>
                            <p>From live race broadcasts to exclusive behind-the-scenes content, MotoGP media ensures fans never miss the action, with coverage available in over 200 countries and multiple languages.</p>
                        </div>
                        <div class="info-stats">
                            <div class="info-card">
                                <div class="info-number">200+</div>
                                <div class="info-label">Countries Covered</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">400M+</div>
                                <div class="info-label">TV Viewers</div>
                            </div>
                            <div class="info-card">
                                <div class="info-number">20+</div>
                                <div class="info-label">Languages</div>
                            </div>
                        </div>
                    </div>
                    <div class="media-grid">
                        <div class="media-card video-card">
                            <div class="video-container">
                                <iframe
                                    class="highlight-video"
                                    src="https://www.youtube.com/embed/swjZZrYroyE"
                                    title="2024 MotoGP Season Highlights"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen>
                                </iframe>
                                <div class="video-overlay">
                                    <div class="video-title">2024 Season Highlights</div>
                                    <div class="video-description">Watch the best moments from this season</div>
                                </div>
                            </div>
                            <div class="media-info">
                                <h3>2024 Season Highlights</h3>
                                <p>Watch the best moments from this season</p>
                            </div>
                        </div>
                        <div class="media-card video-card">
                            <div class="video-container">
                                <iframe
                                    class="highlight-video"
                                    src="https://www.youtube.com/embed/wIrSzozUjP0?si=jzs3kghUCKN3ANBA"
                                    title="Race Day Action"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen>
                                </iframe>
                                <div class="video-overlay">
                                    <div class="video-title">Race Day Action</div>
                                    <div class="video-description">Experience the thrill of MotoGP racing</div>
                                </div>
                            </div>
                            <div class="media-info">
                                <h3>Race Day Action</h3>
                                <p>Experience the thrill of MotoGP racing</p>
                            </div>
                        </div>
                        <div class="media-card video-card">
                            <div class="video-container">
                                <iframe
                                    class="highlight-video"
                                    src="https://www.youtube.com/embed/AkweVkTeXe0?si=KHeb5lv0RP8sqFOj"
                                    title="Behind the Scenes"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen>
                                </iframe>
                                <div class="video-overlay">
                                    <div class="video-title">Behind the Scenes</div>
                                    <div class="video-description">Go behind the scenes with the teams</div>
                                </div>
                            </div>
                            <div class="media-info">
                                <h3>Behind the Scenes</h3>
                                <p>Go behind the scenes with the teams</p>
                            </div>
                        </div>
                        <div class="media-card video-card">
                            <div class="video-container">
                                <iframe
                                    class="highlight-video"
                                    src="https://www.youtube.com/embed/h8UlZHvWA80?si=jazMq_DvtQZejbs3"
                                    title="Rider Interviews"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen>
                                </iframe>
                                <div class="video-overlay">
                                    <div class="video-title">Rider Interviews</div>
                                    <div class="video-description">Exclusive interviews with top riders</div>
                                </div>
                            </div>
                            <div class="media-info">
                                <h3>Rider Interviews</h3>
                                <p>Exclusive interviews with top riders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // Data loading functions
    async loadStats() {
        try {
            const [ridersRes, teamsRes] = await Promise.all([
                fetch(`${API_URL}/riders`),
                fetch(`${API_URL}/teams`)
            ]);
            const riders = await ridersRes.json();
            const teams = await teamsRes.json();
            document.getElementById('total-riders').textContent = riders.length;
            document.getElementById('total-teams').textContent = teams.length;
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async loadRiders() {
        try {
            const response = await fetch(`${API_URL}/riders`);
            const riders = await response.json();
            
            const ridersGrid = document.getElementById('riders-grid');
            
            if (riders.length === 0) {
                ridersGrid.innerHTML = '<p class="no-data">No riders available. Add some riders to get started!</p>';
                return;
            }
            
            ridersGrid.innerHTML = riders.map(rider => `
                <div class="rider-card">
                    <div class="rider-image" style="background-image: url('${rider.image || '/images/riders/frans.jpg'}');">
                        <div class="rider-number">#${rider.number}</div>
                    </div>
                    <div class="rider-info">
                        <h3>${rider.name}</h3>
                        <p class="rider-nationality">🏴 ${rider.nationality}</p>
                        <p class="rider-team">${rider.team}</p>
                        <p class="rider-bike">${rider.bike}</p>
                        <div class="rider-stats">
                            <div class="stat">
                                <span class="stat-value">${rider.championships}</span>
                                <span class="stat-name">Championships</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">${rider.wins}</span>
                                <span class="stat-name">Wins</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">${rider.podiums}</span>
                                <span class="stat-name">Podiums</span>
                            </div>
                        </div>
                        ${rider.bio ? `<p class="rider-bio">${rider.bio}</p>` : ''}
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading riders:', error);
            document.getElementById('riders-grid').innerHTML = '<p class="error">Error loading riders. Make sure MongoDB is running.</p>';
        }
    }

    async loadTeams() {
        try {
            const response = await fetch(`${API_URL}/teams`);
            const teams = await response.json();
            
            const teamsGrid = document.getElementById('teams-grid');
            
            if (teams.length === 0) {
                teamsGrid.innerHTML = '<p class="no-data">No teams available. Add some teams to get started!</p>';
                return;
            }
            
            teamsGrid.innerHTML = teams.map(team => `
                <div class="team-card">
                    <div class="team-logo">
                        ${team.logo ? `<img src="${team.logo}" alt="${team.name}">` : `<div class="team-placeholder">${team.name.substring(0, 2)}</div>`}
                    </div>
                    <div class="team-info">
                        <h3>${team.name}</h3>
                        <p class="team-manufacturer"><strong>Manufacturer:</strong> ${team.manufacturer}</p>
                        <p class="team-country">🌍 ${team.country}</p>
                        <p class="team-principal"><strong>Team Principal:</strong> ${team.teamPrincipal}</p>
                        <p class="team-founded"><strong>Founded:</strong> ${team.founded}</p>
                        <div class="team-stats">
                            <div class="stat">
                                <span class="stat-value">${team.championships}</span>
                                <span class="stat-name">Championships</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">${team.wins}</span>
                                <span class="stat-name">Wins</span>
                            </div>
                        </div>
                        ${team.description ? `<p class="team-description">${team.description}</p>` : ''}
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading teams:', error);
            document.getElementById('teams-grid').innerHTML = '<p class="error">Error loading teams. Make sure MongoDB is running.</p>';
        }
    }

    async loadRankings() {
        try {
            const response = await fetch(`${API_URL}/rankings`);
            const rankings = await response.json();
            
            const rankingsList = document.getElementById('rankings-list');
            
            if (rankings.length === 0) {
                rankingsList.innerHTML = '<p class="no-data">No rankings available. Add some rankings to get started!</p>';
                return;
            }
            
            rankingsList.innerHTML = rankings.map((ranking, index) => `
                <div class="ranking-row ${index < 3 ? 'podium-position' : ''}">
                    <div class="rank-col">
                        ${ranking.position === 1 ? '🥇' : ranking.position === 2 ? '🥈' : ranking.position === 3 ? '🥉' : ranking.position}
                    </div>
                    <div class="rider-col">
                        <strong>${ranking.riderName}</strong>
                        <span class="rider-number-small">#${ranking.riderNumber}</span>
                    </div>
                    <div class="team-col">${ranking.team}</div>
                    <div class="points-col"><strong>${ranking.points}</strong></div>
                    <div class="wins-col">${ranking.wins}</div>
                    <div class="podiums-col">${ranking.podiums}</div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading rankings:', error);
            document.getElementById('rankings-list').innerHTML = '<p class="error">Error loading rankings. Make sure MongoDB is running.</p>';
        }
    }

    async loadSponsors() {
        try {
            const response = await fetch(`${API_URL}/sponsors`);
            const sponsors = await response.json();
            
            const sponsorsGrid = document.getElementById('sponsors-grid');
            
            if (sponsors.length === 0) {
                sponsorsGrid.innerHTML = '<p class="no-data">No sponsors available. Add some sponsors to get started!</p>';
                return;
            }
            
            sponsorsGrid.innerHTML = sponsors.map(sponsor => `
                <div class="sponsor-card">
                    <div class="sponsor-logo">
                        ${sponsor.logo ? `<img src="${sponsor.logo}" alt="${sponsor.name}">` : `<div class="sponsor-placeholder">${sponsor.name}</div>`}
                    </div>
                    <div class="sponsor-info">
                        <h3>${sponsor.name}</h3>
                        <span class="sponsor-category">${sponsor.category}</span>
                        ${sponsor.description ? `<p>${sponsor.description}</p>` : ''}
                        ${sponsor.website ? `<a href="${sponsor.website}" target="_blank" class="sponsor-link">Visit Website →</a>` : ''}
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading sponsors:', error);
            document.getElementById('sponsors-grid').innerHTML = '<p class="error">Error loading sponsors. Make sure MongoDB is running.</p>';
        }
    }
}

// Smooth scroll function for Explore Now button
function scrollToContent() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize the SPA Router
const router = new SPARouter();
