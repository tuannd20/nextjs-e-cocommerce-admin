import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import multiparty from 'multiparty';
import fs from 'fs';
import mime from 'mime-types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
const bucketName = 'images-ecommerce-site-next';

export default async function handleUploadImage(req, res) {
  const { method } = req;
  await mongooseConnect();

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log('length:', files.file);
  console.log('length:', files.file.length);

  const client = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFileName = Date.now() + '.' + ext;
    console.log(ext);
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: fs.readFileSync(file.path),
        ACL: 'public-read',
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
