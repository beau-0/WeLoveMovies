const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties.js")
const reduceProperties = require("../utils/reduce-properties.js")

const addCriticDetails = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function list() {
      return knex('movies')
        .select("*")
    }

function getMoviesShowing() {
    return knex('movies')
        .distinct('movies.*')
        .join('movies_theaters', {'movies.movie_id': 'movies_theaters.movie_id'} )
        .where({ 'movies_theaters.is_showing': true })
    }

function read(movieId) {
    return knex('movies as m')
        .select('*')
        .where( 'm.movie_id', movieId )
        .first()
    }

function findTheaters(movieId) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .join("theaters as t", "mt.theater_id", "t.theater_id")
      .select("t.*", "mt.is_showing", "mt.movie_id")
      .where({ "m.movie_id": movieId });
}

function findReviews(movieId) {
return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => {
      const reviewsWithCriticDetails = [];
      reviews.forEach((review) => {
        const addedCritic = addCriticDetails(review);
        reviewsWithCriticDetails.push(addedCritic);
      });
      return reviewsWithCriticDetails;
    });
}



module.exports = {
    read,
    list,
    getMoviesShowing,
    findTheaters,
    findReviews,
}