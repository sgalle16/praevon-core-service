import { Router } from "express";
import { body, param } from "express-validator";
import auth from "../middlewares/auth.js";
import handleValidation from "../middlewares/validators.js";
import {
  generateUploadUrl,
  confirmUpload,
  reviewDocument,
  getMyDocuments,
  getDocumentDownloadUrl,
  deleteDocument 
} from "../controllers/documentsController.js";
import { DocumentType, DocumentStatus } from "../generated/prisma/index.js";

const documentsRouter = Router();

documentsRouter.use(auth);

documentsRouter.get("/me", getMyDocuments);
documentsRouter.get(
  "/:id/download-url",
  param("id").isInt(),
  handleValidation,
  getDocumentDownloadUrl
);

documentsRouter.post(
  "/upload-url",
  body("originalName").isString().notEmpty(),
  body("mimeType").isMimeType(),
  body("size").isInt({ min: 1 }),
  body("type").isIn(Object.values(DocumentType)),
  body("propertyId").optional().isInt(),
  handleValidation,
  generateUploadUrl
);

documentsRouter.post(
  "/:id/upload-complete",
  auth,
  param("id").isInt(),
  handleValidation,
  confirmUpload
);

documentsRouter.patch(
  "/:id/review",
  param("id").isInt(),
  body("status").isIn(Object.values(DocumentStatus)),
  handleValidation,
  reviewDocument
);

documentsRouter.delete('/:id', 
  param('id').isInt(), 
  handleValidation, 
  deleteDocument
);

export default documentsRouter;
