const service = require("./reviews.service");
const reduceProperties = require("../utils/reduce-properties"); // Import the reduceProperties function
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const {reviewId} = req.params;

    const review = await service.read(reviewId);
    if(review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Review cannot be found. `})
}

function read (req, res) {
    res.status(200).json({ data: res.locals.review })
}

async function destroy (req, res) {
    let { review_id } = res.locals.review;
    await service.destroy(review_id);
    res.sendStatus(204);
}

async function update (req, res) {
    const { review_id } = res.locals.review;
    const updatedReview = {
        ...req.body.data,
        review_id: review_id
        }
    const data = await service.update(updatedReview)
    res.status(200).json({ data })
}


module.exports = {
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)], 
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}