const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());

router
  .route("/:reviewId")
  .get(controller.read)
  .delete(controller.delete)
  .put(controller.update);

module.exports = router;
