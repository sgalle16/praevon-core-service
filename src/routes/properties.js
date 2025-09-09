import { Router } from "express";
import { body } from "express-validator";
import auth from "../middlewares/auth.js"
import handleValidation from "../middlewares/validators.js";
import { getProperty, listProperties, createProperty, updateProperty, deleteProperty } from "../controllers/propertiesController.js";


const propertiesRouter = Router();

propertiesRouter.get('/', listProperties);
propertiesRouter.get('/:id', getProperty);

propertiesRouter.post('/',
  auth,
  body('title').isLength({ min: 3 }),
  body('address').notEmpty(),
  body('city').notEmpty(),
  body('price').isNumeric(),
  handleValidation,
  createProperty
);

propertiesRouter.put('/:id', auth, updateProperty);
propertiesRouter.delete('/:id', auth, deleteProperty);

export default propertiesRouter;