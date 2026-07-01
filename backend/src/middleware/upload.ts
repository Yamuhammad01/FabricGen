import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ALLOWED_MIME_TYPES } from '../constants/index.js';
import config from '../config/index.js';
import { ValidationError } from '../errors/index.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype as typeof ALLOWED_MIME_TYPES[number])) {
    cb(null, true);
  } else {
    cb(new ValidationError(`File type ${file.mimetype} is not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxUploadSize,
  },
});

export const uploadSingle = upload.single('image');
export const uploadMultiple = upload.array('images', 5);