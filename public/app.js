// API Base URL
const API_URL = 'http://localhost:3000/api';

// Smooth scroll function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Fetch and display riders
async function loadRiders() {
    try {
        const response = await fetch(`${API_URL}/riders`);
        const riders = await response.json();
        
        const ridersGrid = document.getElementById('riders-grid');
        document.getElementById('total-riders').textContent = riders.length;
        
        if (riders.length === 0) {
            ridersGrid.innerHTML = '<p class="no-data">No riders available. Add some riders to get started!</p>';
            return;
        }
        
        ridersGrid.innerHTML = riders.map(rider => `
            <div class="rider-card">
                <div class="rider-image" style="background-image: url('${rider.image || '\images\frans.jpg'}');">
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

// Fetch and display teams
async function loadTeams() {
    try {
        const response = await fetch(`${API_URL}/teams`);
        const teams = await response.json();
        
        const teamsGrid = document.getElementById('teams-grid');
        document.getElementById('total-teams').textContent = teams.length;
        
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

// Fetch and display rankings
async function loadRankings() {
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

// Fetch and display sponsors
async function loadSponsors() {
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

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadRiders();
    loadTeams();
    loadRankings();
    loadSponsors();
});
