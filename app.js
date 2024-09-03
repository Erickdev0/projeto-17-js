const apiKey = '2163432933fb97fdb00b76b9248eb373';
const apiUrl = 'https://api.themoviedb.org/3';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const movieList = document.getElementById('movie-list');
    const detailsSection = document.getElementById('details');
    const movieDetails = document.getElementById('movie-details');
    const backBtn = document.getElementById('back-btn');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value;
        if (query) {
            const movies = await searchMovies(query);
            displayMovies(movies);
        } else {
            movieList.innerHTML = '';
        }
    });

    movieList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('movie-item')) {
            const movieId = e.target.dataset.id;
            const movie = await getMovieDetails(movieId);
            displayMovieDetails(movie);
        }
    });

    backBtn.addEventListener('click', () => {
        detailsSection.classList.add('hidden');
        movieList.classList.remove('hidden');
    });

    async function searchMovies(query) {
        const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();
        return data.results;
    }

    function displayMovies(movies) {
        movieList.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.dataset.id = movie.id;
            movieItem.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            movieList.appendChild(movieItem);
        });
    }

    async function getMovieDetails(id) {
        const response = await fetch(`${apiUrl}/movie/${id}?api_key=${apiKey}`);
        const data = await response.json();
        return data;
    }

    function displayMovieDetails(movie) {
        movieList.classList.add('hidden');
        detailsSection.classList.remove('hidden');
        movieDetails.innerHTML = `
            <h2>${movie.title}</h2>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.overview}</p>
            <p><strong>Lançamento:</strong> ${movie.release_date}</p>
            <p><strong>Nota:</strong> ${movie.vote_average}</p>
        `;
    }
});
