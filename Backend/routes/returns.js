const express = require("express");
const Joi = require("joi");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");
const router = express.Router();

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(
    req.body.customerId,
    req.body.movieId,
    true
  );

  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed");

  rental.return();
  await rental.save();

  await Movie.updateOne({ $inc: { numberInStock: 1 } });

  return res.send(rental);
});

function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(req);
}

module.exports = router;
