// main.js
document
  .getElementById("character-search_form")
  .addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("character-search_input").value.trim();
    if (!name) return;

    try {
      const res  = await fetch(`/api/character?name=${encodeURIComponent(name)}`);
      const json = await res.json();
      const char = json.data.results[0];

      if (!char) {
        document.getElementById("character-info_name").textContent = "Not found.";
        return;
      }

      document.getElementById("character-info_name").textContent        = char.name;
      document.getElementById("character-info_description").textContent = char.description || "No description.";
      const img = document.getElementById("character-info_image");
      img.src    = `${char.thumbnail.path}.${char.thumbnail.extension}`;
      img.alt    = char.name;
      img.style.display = "block";
    } catch (err) {
      console.error(err);
      document.getElementById("character-info_name").textContent = "Error loading data.";
    }
  });
