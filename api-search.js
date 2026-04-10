const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const status = document.getElementById("status");
const results = document.getElementById("results");

searchBtn.addEventListener("click", async () => {
    const term = searchInput.value.trim();

    if (!term) {
        status.textContent = "Please enter a search term.";
        return;
    }

    status.textContent = "Loading...";
    results.innerHTML = "";

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`);
        const data = await response.json();

        if (!data.meals) {
            status.textContent = "No results found.";
            return;
        }

        status.textContent = `Found ${data.meals.length} results.`;
        results.innerHTML = data.meals.map(meal => `
            <div class="card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>Category: ${meal.strCategory}</p>
                <p>Area: ${meal.strArea}</p>
            </div>
        `).join("");

    } catch (error) {
        status.textContent = "Error fetching data.";
        console.error(error);
    }
});