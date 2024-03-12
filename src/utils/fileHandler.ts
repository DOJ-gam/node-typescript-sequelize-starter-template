import multer from 'multer'
import { RequestType } from '../types/types';
import fs from 'fs';


export type FileRequestType = Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }
// Define the types for file handling
export interface RequestWithFile extends RequestType {
    files?: FileRequestType;
}


const FILE_TYPE_MAP: any = {
    "image/png": 'png',
    "image/jpeg": 'jpeg',
    "image/jpg": 'jpg'
}

// Configure multer storage and file handling
const storage = multer.diskStorage({
    destination: function (req: RequestType, file, cb) {
        // Set the destination folder where uploaded files will be stored
        // cb(null, 'uploads/');
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError: Error | null = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'src/uploads/')

    },
    filename: function (req, file, cb) {
        // Define how uploaded files should be named
        // cb(null, file.originalname); // You may customize the filename as needed
        const fileName = file.originalname.split(' ').join('-').split('.').slice(0, -1).join('.')
        const extension = FILE_TYPE_MAP[file.mimetype];
        // console.log('====================================');
        // console.log("File Name:", fileName);
        // console.log('====================================');
        // Check if the fileName already contains the extension
        const fileExtension = fileName.slice(fileName.lastIndexOf('.'));
        const fileHasExtension = Object.values(FILE_TYPE_MAP).includes(fileExtension.substring(1)); // Remove the dot

        let finalFileName: string
        if (fileHasExtension) {
            // If the fileName already contains the extension, use the original filename
            finalFileName = fileName;
        } else {
            // Append the extension to the filename
            finalFileName = `${fileName}-${Date.now()}.${extension}`;
        }

        cb(null, finalFileName);
        // cb(null, `${fileName}-${Date.now()}.${extension}`)
    },
});

// Function to delete files based on an array of file objects
export const deleteFiles = (filesToDelete: any) => {
    try {
        filesToDelete?.forEach((file: Express.Multer.File) => {
            // Construct the file path from the file object
            const filePath = file.path;

            // Check if the file exists before attempting to delete it
            if (fs.existsSync(filePath)) {
                // Delete the file
                fs.unlinkSync(filePath);
                console.log('====================================');
                console.log(`File '${file.filename}' deleted successfully`);
                console.log('====================================');
            } else {
                console.log('====================================');
                console.log(`File '${file.filename}' does not exist to delete`);
                console.log('====================================');
            }
        });
    } catch (error) {
        // Handle errors while deleting files
        console.error('Error deleting files:', error);
        throw error; // Throw the error to handle it in the caller function if needed
    }
};

// Create multer instance with configured options
export const fileUploader = multer({ storage: storage });


