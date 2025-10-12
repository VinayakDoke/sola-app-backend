import multer from 'multer';
import AWS from 'aws-sdk';
import path from 'path';

const s3 = new AWS.S3({
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  signatureVersion: 'v4',
});

const r2Storage = () => ({
  _handleFile: (req, file, cb) => {
    let folder = '';
    if (req.body?.file_path) {
      folder = req.body.file_path.replace(/\\/g, '/'); // sanitize for S3 key
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;

    const key = folder ? `${folder}/${filename}` : filename;

    const params = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET,
      Key: key,
      Body: file.stream,
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) return cb(err);

      // ✅ Include filename here
      cb(null, {
        key,
        filename, // <-- added this line
        location: data.Location,
        bucket: params.Bucket,
        mimetype: file.mimetype,
      });
    });
  },

  _removeFile: (req, file, cb) => {
    s3.deleteObject(
      { Bucket: process.env.CLOUDFLARE_R2_BUCKET, Key: file.key },
      cb
    );
  },
});

const upload = multer({
  storage: r2Storage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, or PDF files are allowed!'));
    }
  },
});

export default upload;
