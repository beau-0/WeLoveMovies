const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    const movie = await service.read(movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found. `})
}

async function listMovies (req, res) {
    const isShowing = req.query.is_showing;
    if (isShowing === 'true'){
        let moviesShowing = await service.getMoviesShowing();
        res.status(200).json({ data: moviesShowing })
    }
    let movies = await service.list();
    res.status(200).json({ data: movies })
}

function read (req, res) {
    res.status(200).json({ data: res.locals.movie })
}

async function findTheaters (req, res) {
    let movieId =  res.locals.movie.movie_id;
    let theaters = await service.findTheaters(movieId);
    res.status(200).json({ data: theaters })
}

async function findReviews (req, res) {
    let movieId = res.locals.movie.movie_id;
    let reviews = await service.findReviews(movieId);
    res.status(200).json({ data: reviews })
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listMovies: [asyncErrorBoundary(listMovies)], 
    listTheatersShowingMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(findTheaters)],
    listMovieReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(findReviews)],
}