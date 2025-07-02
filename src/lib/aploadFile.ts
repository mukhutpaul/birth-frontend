// pages/api/upload-image.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js's default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public', 'uploads'), // Temporary upload directory
    keepExtensions: true,
  });

  try {
    const [fields, files] = await form.parse(req);
    const imageFile = files.image?.[0]; // Assuming 'image' is the field name from the frontend

    if (!imageFile) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    const oldPath = imageFile.filepath;
    const newFileName = `${Date.now()}-${imageFile.originalFilename}`;
    const newPath = path.join(process.cwd(), 'public', 'uploads', newFileName); // Destination in public folder

    // Ensure the target directory exists
    const publicUploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(publicUploadsDir)) {
      fs.mkdirSync(publicUploadsDir, { recursive: true });
    }

    fs.renameSync(oldPath, newPath); // Move the file

    res.status(200).json({ message: 'Image uploaded successfully!', filename: newFileName, url: `/uploads/${newFileName}` });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'Error uploading file.' });
  }
}