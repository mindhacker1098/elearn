import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';

// Configure `multer` for file upload destination
const upload = multer({ dest: 'public/file' });

export const config = {
  api: {
    bodyParser: false, // Disables Next.js's default body parsing so multer can handle it
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    upload.single('file')(req as unknown as Request, res as unknown as Response, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Upload failed' });
      }

      const file = (req as any).file;
      const src = req.body.src;

      if (!file || !src) {
        return res.status(400).json({ error: 'File or source path not provided' });
      }

      const destinationPath = `./public/courses/${src}`;

      // Ensure the destination directory exists
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }

      // Get file extension and new filename
      const fileExtension = path.extname(file.originalname);
      const filenameWithExtension = `${file.filename}${fileExtension}`;

      const sourceFilePath = path.join(file.destination, file.filename);
      const destinationFilePath = path.join(destinationPath, filenameWithExtension);

      // Move the file to the destination folder
      try {
        const fileData = fs.readFileSync(sourceFilePath);
        fs.writeFileSync(destinationFilePath, fileData);
        fs.unlinkSync(sourceFilePath); // Delete the temporary file
        console.log('File moved successfully.');
        
        // Respond after all operations are complete
        return res.status(200).json({ src: `/courses/${src}/${filenameWithExtension}` });
      } catch (error) {
        console.error('File operation error:', error);
        return res.status(500).json({ error: 'File processing failed' });
      }
    });
  } else {
    // Handle invalid HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
