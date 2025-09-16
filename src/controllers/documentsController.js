import { documentsService } from '../services/documentsService.js';

const generateUploadUrl = async (req, res, next) => {
  try {
    const result = await documentsService.prepareUpload({ ...req.body, userId: req.userId });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const confirmUpload = async (req, res, next) => {
  try {
    const updatedDocument = await documentsService.confirmUpload(parseInt(req.params.id), req.userId);
    res.json(updatedDocument);
  } catch (err) {
    next(err);
  }
};

const unifiedUpload = async (req, res, next) => {
  try {
    const { type, propertyId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const document = await documentsService.superUpload({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      buffer: file.buffer, // el archivo en memoria
      type,
      propertyId,
      userId: req.userId,
    });

    res.status(201).json(document);
  } catch (err) {
    next(err);
  }
};

const reviewDocument = async (req, res, next) => {
    try {
        const updatedDocument = await documentsService.reviewDocument(parseInt(req.params.id), req.body.status, req.userId);
        res.json(updatedDocument);
    } catch (err) {
        next(err);
    }
};

const getMyDocuments = async (req, res, next) => {
    try {
        const documents = await documentsService.getMyDocuments(req.userId);
        res.json(documents);
    } catch (err) {
        next(err);
    }
};

const getDocumentDownloadUrl = async (req, res, next) => {
    try {
        const downloadUrl = await documentsService.getDocumentDownloadUrl(parseInt(req.params.id), req.userId);
        res.json({ downloadUrl });
    } catch (err) {
        next(err);
    }
};

const deleteDocument = async (req, res, next) => {
    try {
        await documentsService.deleteDocument(parseInt(req.params.id), req.userId);
        res.status(204).send(); // 204 No Content response sent when deletion is successful
    } catch (err) {
        next(err);
    }
};

export { 
  generateUploadUrl, 
  confirmUpload, 
  reviewDocument,
  getMyDocuments,
  getDocumentDownloadUrl,
  deleteDocument,
  unifiedUpload
};