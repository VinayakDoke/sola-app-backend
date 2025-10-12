import express from 'express'
import AWS from 'aws-sdk';
const router = express.Router()

const s3 = new AWS.S3({
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
  signatureVersion: 'v4',
});

router.get('/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const params = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET,
      Key: filename,
      Expires: 3600, // Signed URL expires in 1 hour
    };

    const url = s3.getSignedUrl('getObject', params);
    res.json({ signedUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});

router.get('/:folder/:filename', (req, res) => {
  try {
    const { folder, filename } = req.params;
    const params = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET,
      Key: `${folder}/${filename}`,
      Expires: 3600, // Signed URL expires in 1 hour
    };

    const url = s3.getSignedUrl('getObject', params);
    res.json({ signedUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});


export default router