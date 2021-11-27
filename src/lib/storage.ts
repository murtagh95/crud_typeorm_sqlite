import { Request } from 'express'
import path from "path";
import { v4 as uuid } from "uuid";

import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, './media/img/product')
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        const extension = path.extname(file.originalname)
        callback(null, `${file.fieldname}-${uuid()}${extension}`)
    }
})

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    const filetypes = /jpeg|jpg|png|gif/
    if ( filetypes.test(file.mimetype)
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

export const upload = multer(
    {
        storage: fileStorage, 
        fileFilter : fileFilter, 
        limits: {fileSize: 1000000}
    }
);
