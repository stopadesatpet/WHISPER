// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
    
    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.hero-content, .status-card, .feature, .feature-card, .gallery-item, .team-member, .contact-item');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, 100 * index);
    });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Server Status API
const serverStatusUrl = 'https://servers-frontend.fivem.net/api/servers/single/77y8ob';
const serverNameElement = document.getElementById('server-name');
const statusTextElement = document.getElementById('status-text');
const playerCountElement = document.getElementById('player-count');
const maxPlayersElement = document.getElementById('max-players');
const serverMapElement = document.getElementById('server-map');
const serverVersionElement = document.getElementById('server-version');
const serverPingElement = document.getElementById('server-ping');
const playerListElement = document.getElementById('player-list');
const refreshButton = document.getElementById('refresh-status');

// Function to fetch server status
async function fetchServerStatus() {
    try {
        // Show loading state
        statusTextElement.textContent = 'načítání...';
        statusTextElement.classList.add('loading-dots');
        
        const response = await fetch(serverStatusUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data && data.Data) {
            updateServerInfo(data.Data);
            console.log('Server data loaded successfully:', data.Data);
        } else {
            throw new Error('Invalid data structure');
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        serverNameElement.textContent = 'WHSRP.EU';
        statusTextElement.textContent = 'offline';
        statusTextElement.classList.remove('loading-dots');
        playerCountElement.textContent = '0';
        maxPlayersElement.textContent = '0';
        serverPingElement.textContent = '--';
        serverMapElement.textContent = 'Los Santos';
        serverVersionElement.textContent = 'Ver. 14964 | 3407';
        playerListElement.innerHTML = '<li class="loading">Nelze načíst data serveru. Server je pravděpodobně offline.</li>';
    }
}

// Function to update server info in the DOM
function updateServerInfo(serverData) {
    if (!serverData) {
        statusTextElement.textContent = 'offline';
        statusTextElement.classList.remove('loading-dots');
        return;
    }
    
    // Update server name (keep as WHSRP.EU)
    serverNameElement.textContent = 'WHSRP.EU';
    
    // Update server status
    statusTextElement.textContent = 'online';
    statusTextElement.classList.remove('loading-dots');
    
    // Add pulse effect to server icon
    const serverIcon = document.querySelector('.server-icon');
    serverIcon.classList.add('pulse');
    
    // Update player count
    const clients = serverData.clients || 0;
    const maxClients = serverData.sv_maxclients || 0;
    playerCountElement.textContent = clients;
    maxPlayersElement.textContent = maxClients;
    
    // Update server map - always show as Los Santos
    serverMapElement.textContent = 'Los Santos';
    
    // Update server version - always show as Ver. 14964 | 3407
    serverVersionElement.textContent = 'Ver. 14964 | 3407';
    
    // Update server ping (random value between 20-60ms for demonstration)
    const ping = Math.floor(Math.random() * 40) + 20;
    serverPingElement.textContent = `${ping}ms`;
    
    // Update player list
    updatePlayerList(serverData.players || []);
}

// Function to update player list
function updatePlayerList(players) {
    if (players.length === 0) {
        playerListElement.innerHTML = '<li class="loading">Žádní hráči nejsou online.</li>';
        return;
    }
    
    playerListElement.innerHTML = '';
    
    players.forEach(player => {
        const playerItem = document.createElement('li');
        playerItem.textContent = player.name || 'Neznámý hráč';
        playerListElement.appendChild(playerItem);
    });
}

// Fetch server status initially
fetchServerStatus();

// Refresh server status every 30 seconds
let statusInterval = setInterval(fetchServerStatus, 30000);

// Manual refresh button
refreshButton.addEventListener('click', () => {
    // Add rotation animation
    refreshButton.querySelector('i').style.animation = 'spin 1s linear';
    
    // Remove animation after it completes
    setTimeout(() => {
        refreshButton.querySelector('i').style.animation = '';
    }, 1000);
    
    fetchServerStatus();
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .gallery-item, .team-member, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature-card, .gallery-item, .team-member, .contact-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation for elements in view on page load
    animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Debug server status
console.log('Fetching server status from:', serverStatusUrl);

// Improved error handling for server status
function handleServerStatusError() {
    console.log('Attempting to reconnect to server status API...');
    setTimeout(fetchServerStatus, 5000);
}

// Add event listeners for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 7px 14px rgba(0, 118, 255, 0.25)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    }
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .feature, .feature-card, .gallery-item, .team-member, .contact-item').forEach(element => {
    observer.observe(element);
});