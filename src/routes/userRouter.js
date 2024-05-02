import express from 'express';
import { middleToken } from '../config/jwt.js';
import { upload } from '../config/upload.js';
import { getImage, test, getImgByName, getUser, login, signUp, getCmntById, checkImageSaved, saveComment, getUserById, getImgByIdUser, deleteImg, uploadImg, editUser } from '../controller/userController.js';

const userRouter = express.Router();
userRouter.get("/get-user",middleToken ,getUser);
userRouter.post("/login",login);
userRouter.post("/sign-up",signUp);
userRouter.get("/get-image",middleToken,getImage);
userRouter.get("/getimgbyname",middleToken,getImgByName);
userRouter.get("/test/:id",test)
userRouter.get("/get-cmt-byid/:id",middleToken,getCmntById);
userRouter.get("/check-img/:id",checkImageSaved)
userRouter.post("/save-cmt",middleToken,saveComment)
userRouter.get("/get-user-by-id",middleToken,getUserById)
userRouter.get("/get-img-by-user-id",middleToken,getImgByIdUser)
userRouter.post("/delete-img/:id",deleteImg)
userRouter.post("/upload-img/:id", middleToken,upload.single("avatar"), uploadImg)
userRouter.post("/uploadData",upload.single("avatar"),(req,res)=>{
    let file = req.file
    res.send(file);
    
    })
userRouter.put("/edit/:id",middleToken,editUser);
export default userRouter;
