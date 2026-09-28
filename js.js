// ambil data dari js
let characters = charactersData; 

function initApp() {
    // urutin dari latest
    characters.sort((a, b) => b.id - a.id);

    // 1. home maksimal 3 uma lol
    if (document.getElementById("homeCharacterGrid")) {
        renderHomeCharacters();
    }

    // 2. di character bakal jadi grid
    if (document.getElementById("characterGrid")) {
        renderAllCharacters();
    }

    // 3. di bio tampilin berdasarkan id
    if (window.location.pathname.includes("bio.html")) {
        loadCharacterDetail();
    }
}

// render 3 chara sisanya di bio.html
function renderHomeCharacters() {
    const homeGrid = document.getElementById("homeCharacterGrid");
    homeGrid.innerHTML = "";

    const latestChars = characters.slice(0, 3);

    latestChars.forEach(char => {
        const card = document.createElement("a");
        card.href = `bio.html?id=${char.id}`;
        card.className = "character-card";
        card.innerHTML = `
            <div class="image-placeholder">
                <img src="${char.image}" alt="${char.name}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;">
            </div>
            <h3 style="margin-top: 12px; color: #333; font-size: 16px;">${char.name}</h3>
        `;
        homeGrid.appendChild(card);
    });
}

// render all chara on character.js (kikkireki)
function renderAllCharacters() {
    const grid = document.getElementById("characterGrid");
    grid.innerHTML = "";

    characters.forEach(char => {
        const card = document.createElement("a");
        card.href = `bio.html?id=${char.id}`;
        card.className = "character-card";
        card.innerHTML = `
            <div class="image-placeholder">
                <img src="${char.image}" alt="${char.name}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;">
            </div>
            <h3 style="margin-top: 12px; color: #333; font-size: 16px;">${char.name}</h3>
        `;
        grid.appendChild(card);
    });
}

// biografi di bio.html
function loadCharacterDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const charId = parseInt(urlParams.get('id')) || 1;

    const character = characters.find(c => c.id === charId);

    if (character) {
        document.getElementById("charName").textContent = character.name;
        document.getElementById("charBio").textContent = character.biography;
        
        const imageArea = document.getElementById("charImage");
        imageArea.innerHTML = `<img src="${character.image}" alt="${character.name}" style="width:100%; height:100%; object-fit:cover; border-radius:10px;">`;
        
        document.title = `Biografi - ${character.name}`;
    } else {
        document.getElementById("charName").textContent = "Karakter tidak ditemukan";
        document.getElementById("charBio").textContent = "Maaf, data karakter ini tidak tersedia.";
    }
}

// NAVIGASI MENU & SEARCH
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const overlay = document.getElementById("pageOverlay");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
}

function closeSidebar() {
    document.getElementById("sideMenu").classList.remove("active");
    document.getElementById("pageOverlay").classList.remove("active");
}

function openSearchModal() {
    document.getElementById("searchModal").style.display = "flex";
    setTimeout(() => document.getElementById("realSearchInput").focus(), 100);
}

function closeSearchModal() {
    document.getElementById("searchModal").style.display = "none";
}

function searchCharacter() {
    const query = document.getElementById("realSearchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    if (!query.trim()) {
        resultsContainer.innerHTML = "<p>Mulai ketik untuk mencari...</p>";
        return;
    }

    const filtered = characters.filter(c => c.name.toLowerCase().includes(query));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = "<p>Karakter tidak ditemukan.</p>";
        return;
    }

    filtered.forEach(char => {
        const item = document.createElement("a");
        item.href = `bio.html?id=${char.id}`;
        item.className = "search-result-item";
        item.innerHTML = `
            <div class="search-result-img" style="overflow:hidden; padding:0;">
                <img src="${char.image}" alt="${char.name}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <span style="margin-left: 10px; font-weight: bold; color: #333;">${char.name}</span>
        `;
        resultsContainer.appendChild(item);
    });
}

// JALANKAN PROGRAM SAAT HALAMAN SELESAI DIMUAT
document.addEventListener("DOMContentLoaded", initApp);