const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 8.8, releaseYear: 2010 },
    { title: "The Dark Knight", genre: "Action", rating: 9.0, releaseYear: 2008 },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, releaseYear: 2014 }
  ];
  
  const addMovie = (collection, movie) => {
    collection.push(movie);
  };

  addMovie(movies, { title: "Tenet", genre: "Sci-Fi", rating: 7.5, releaseYear: 2020 });

  const listMoviesByGenre = (collection, genre) => {
    return collection.filter(movie => movie.genre === genre);
  };

  const findHighestRatedMovie = collection => {
    return collection.reduce((highest, movie) => 
      movie.rating > highest.rating ? movie : highest
    );
  };

  const getMovieTitles = collection => {
    return collection.map(movie => movie.title);
  };

  const moviesAfterYear = (collection, year) => {
    return collection.filter(movie => movie.releaseYear > year);
  };

  movies.forEach(movie => {
    console.log(`${movie.title} (${movie.releaseYear}) is a ${movie.genre} movie with a rating of ${movie.rating}.`);
  });

  console.log("Movies in Sci-Fi Genre:", listMoviesByGenre(movies, "Sci-Fi"));
  console.log("Highest-Rated Movie:", findHighestRatedMovie(movies));
  console.log("List of Movie Titles:", getMovieTitles(movies));
  console.log("Movies Released After 2010:", moviesAfterYear(movies, 2010));
  