import { Router } from "express";
import { body } from "express-validator";
import auth from "../middlewares/auth.js"
import handleValidation from "../middlewares/validators.js";
import { createRental, listRentalsForOwner, listRentalsForUser, updateRentalStatus } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.post('/',
  auth,
  body('propertyId').isInt(),
  handleValidation,
  createRental
);

rentalsRouter.get('/me', auth, listRentalsForUser);

rentalsRouter.get('/owner', auth, listRentalsForOwner);

rentalsRouter.patch('/:id/status', auth, body('status').isIn(['accepted','rejected','cancelled']), handleValidation, updateRentalStatus);

export default rentalsRouter;