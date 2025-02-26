const movieForm = document.querySelector("#form");
const movieInput = document.querySelector("#input");
const movieOta = document.querySelector("#moviesWrapper");
const movieAlfabit = document.querySelector("#select");

// Filmlar ro‘yxatini ekranga chiqarish
function renderMovies(kino) {
    movieOta.innerHTML = "";
    if (kino.length === 0) {
        movieOta.innerHTML = '<p class="bg-red-300">Bunday Film Topilmadi</p>';
    } else {
        kino.slice(0, 40).forEach(objectlar => {
            const newItem = document.createElement("li");
            newItem.className = "w-[400px] bg-[#fff] rounded flex flex-col text-center p-[20px] items-center gap-[20px]";
            newItem.innerHTML = `
                <img src="./orig.webp" alt="${objectlar.Title}">
                <h2>${objectlar.Title}</h2>
                <div>
                    <span>${objectlar.imdb_rating}</span> ||
                    <span>${objectlar.movie_year}</span> ||
                    <span>${objectlar.runtime} min</span>
                </div>
                <p>${objectlar.Categories}</p>
                <button class="bg-[#ff0000] text-[#fff] rounded px-[20px] py-[10px]">Add to watchlist</button>
            `;
            movieOta.appendChild(newItem);
        });
    }
}


renderMovies(movies);

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputQiymati = movieInput.value.toLowerCase().trim();

    const filterlanganKinolar = movies.filter(movie =>
        movie.Title && typeof movie.Title === "string" && movie.Title.toLowerCase().includes(inputQiymati)
    );

    renderMovies(filterlanganKinolar);
});

movieAlfabit.addEventListener("change", (e) => {
    const selectedSort = e.target.value;
    const validMovies = movies.filter(movie => movie.Title && typeof movie.Title === "string");

    if (selectedSort === "A-Z") {
        const sortedMovies = [...validMovies].sort((a, b) => a.Title.localeCompare(b.Title));
        renderMovies(sortedMovies);
    } else if (selectedSort === "Z-A") {
        const sortedMovies = [...validMovies].sort((a, b) => b.Title.localeCompare(a.Title));
        renderMovies(sortedMovies);
    }
});
