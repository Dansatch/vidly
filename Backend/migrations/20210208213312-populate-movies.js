const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
];

module.exports = {
  async up(db, client) {
    for (const genre of data) {
      const { insertedId: genreId } = await db
        .collection("genres")
        .insertOne({ name: genre.name });

      const movies = genre.movies.map((movie) => ({
        ...movie,
        genre: { _id: genreId, name: genre.name },
      }));

      await db.collection("movies").insertMany(movies);
    }
  },

  async down(db, client) {
    const genresList = [];
    const moviesList = [];

    for (const genre of data) {
      genresList.push(genre.name);
      genre.movies.map((movie) => moviesList.push(movie.title));
    }

    await db.collection("genres").deleteMany({
      title: {
        $in: genresList,
      },
    });

    await db.collection("movies").deleteMany({
      title: {
        $in: moviesList,
      },
    });
  },
};
