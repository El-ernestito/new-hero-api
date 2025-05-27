const API_URL = "http://localhost:3000/api";

async function fetchHeroByName(name) {
    const response = await fetch(`${API_URL}/search/${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if (data.response === "success" && data.results.length > 0) {
        return data.results[0]; // Use the first result
    } else {
        throw new Error("Hero not found");
    }
}

document.getElementById("hero-search-btn").addEventListener("click", async () => {
    const name = document.getElementById("hero-search-input").value.trim();
    const imageBox = document.getElementById("hero-image-box");
    const statsBox = document.getElementById("hero-stats-box");
    imageBox.innerHTML = "";
    statsBox.innerHTML = "";
    if (!name) return;

    try {
        const hero = await fetchHeroByName(name);
        imageBox.innerHTML = `<img src="${hero.image.url}" alt="${hero.name}" style="max-width:90%; max-height:160px;">`;

        let statsHtml = `<h3>${hero.name}</h3><ul>`;
        for (const stat in hero.powerstats) {
            statsHtml += `<li><strong>${stat}:</strong> ${hero.powerstats[stat]}</li>`;
        }
        statsHtml += "</ul>";
        statsBox.innerHTML = statsHtml;
    } catch (err) {
        imageBox.innerHTML = "";
        statsBox.innerHTML = `<span style="color:red;">${err.message}</span>`;
    }
});