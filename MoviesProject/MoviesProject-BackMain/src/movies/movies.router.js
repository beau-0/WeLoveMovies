const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());

router.route("/:movieId/theaters")
    .get(controller.listTheatersShowingMovie)
    .all(methodNotAllowed)

router.route("/:movieId/reviews")
    .get(controller.listMovieReviews)
    .all(methodNotAllowed)

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

router.route("/")
    .get(controller.listMovies)
    .all(methodNotAllowed)

module.exports = router;