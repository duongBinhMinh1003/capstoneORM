
// yarn add multer

// process.cwd() => trả về đường dẫn gốc của project => /Users/Download/node40_backend /public/img
// bị trùng tên hình

import multer, { diskStorage } from 'multer';

export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img", 
        filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
});