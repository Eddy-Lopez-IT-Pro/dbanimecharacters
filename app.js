const API_URL = "https://dragonball-api.com/api/characters";

const container = document.getElementById("characterContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

let characters = [];
let currentPage = 1;

async function fetchCharacters(page = 1) {
    try {
        const response = await fetch(`${API_URL}?page=${page}&limit=10`);
        const data = await response.json();

        characters = [...characters, ...data.items];
        displayCharacters(characters);

        if (!data.links.next) {
            loadMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

function displayCharacters(characterList) {
    container.innerHTML = "";

    characterList.forEach(character => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="card-content">
                <h2>${character.name}</h2>
                <p><strong>Race:</strong> ${character.race}</p>
                <p><strong>Ki:</strong> ${character.ki}</p>
            </div>
        `;

        card.addEventListener("click", () => openModal(character));

        container.appendChild(card);
    });
}

function openModal(character) {
    document.getElementById("modalImage").src = character.image;
    document.getElementById("modalName").textContent = character.name;
    document.getElementById("modalRace").textContent = character.race;
    document.getElementById("modalGender").textContent = character.gender;
    document.getElementById("modalKi").textContent = character.ki;
    document.getElementById("modalMaxKi").textContent = character.maxKi;
    document.getElementById("modalAffiliation").textContent = character.affiliation;
    document.getElementById("modalDescription").textContent = character.description;

    modal.classList.remove("hidden");

    const infoPanel = document.querySelector(".modal-info");
    infoPanel.scrollTop = 0;
}

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

loadMoreBtn.addEventListener("click", () => {
    currentPage++;
    fetchCharacters(currentPage);
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(value)
    );

    displayCharacters(filtered);
});

fetchCharacters();