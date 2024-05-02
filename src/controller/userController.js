import express, { query } from 'express'
import { responseData } from '../config/reponse.js';
import sequelize from '../models/connect.js';
import initModels from '../models/init-models.js';
import { Op } from 'sequelize';
import hinh_anh from '../models/hinh_anh.js';
import nguoi_dung from '../models/nguoi_dung.js';
import multer, { diskStorage } from 'multer';
import { createToken, decodeToken } from '../config/jwt.js';

const model = initModels(sequelize);
const getUser = async(req,res)=>{

const data = await model.nguoi_dung.findAll();

responseData(res, "Thành công", 200, data)

};
const login = async (req, res) => {
    const { email, mat_khau } = req.body;

    try {
        // Assuming `model` is your Sequelize model
        const checkUser = await model.nguoi_dung.findOne({
            where: {
                email: email,
                mat_khau: mat_khau // Assuming you're comparing passwords directly, which is not recommended
            }
        });
        let token = createToken({ userId: checkUser.dataValues.nguoi_dung_id,fullName: checkUser.dataValues.ho_ten });

        if (!checkUser) {
            // User not found
            return res.status(401).send("Login không thành công!");
        }

        // User found, login successful
        responseData(res, "Login thành công!", 200, token);
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const signUp = async (req, res) => {
    const { email, mat_khau , ho_ten ,tuoi} = req.body;

    try {
        // Check if the email already exists
        const existingUser = await model.nguoi_dung.findOne({
            where: {
                email: email
            }
        });

        if (existingUser) {
            // Email already exists, return an error response
            return res.status(400).send("Email đã tồn tại.");
        }

        // Email doesn't exist, proceed with user creation
        const newUser = await model.nguoi_dung.create({
            email,
            mat_khau,
            ho_ten,
            tuoi
        });

        // Optionally, you can send a success response with the created user data
        responseData(res,"Sign up thành công",200,newUser);
    } catch (error) {
        console.error('Error in signUp:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getImage = async (req, res) => {
    try {
        // Fetch all images from the database
        const images = await model.hinh_anh.findAll();

        // Respond with success and the retrieved images
        responseData(res, "Lấy hình ảnh thành công", 200, images);
    } catch (error) {
        console.error('Error in getImage:', error);
        // Respond with an error message
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getImgByName = async(req,res) => {
    try {
        // Get the search query parameter from the request
        const { name } = req.query;

        // Define options for the Sequelize query
        const options = {
            where: {} // Initialize an empty where object
        };

        // If a name query parameter is provided, add it to the options
        if (name) {
            options.where.ten_hinh = { [Op.like]: `%${name}%` }; // Use Sequelize's like operator for partial matching
        }

        // Fetch images from the database based on the options
        const images = await model.hinh_anh.findAll(options);

        // Respond with success and the retrieved images
        responseData(res, "Lấy hình ảnh thành công", 200, images);
    } catch (error) {
        console.error('Error in getImgByName:', error);
        // Respond with an error message
        return res.status(500).json({ message: 'Internal server error' });
    }
}
const test = async (req, res) => {
    try {
        // Extract the image ID from the request parameters
        const { id } = req.params;

        // Find the image by its ID and include the associated user
        const image = await model.hinh_anh.findByPk(id, {
            include: ['nguoi_dung_id_nguoi_dungs' ] // Replace 'YourAliasHere' with the alias for the association
        });

        // Check if the image exists
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Respond with the retrieved image including user information
        responseData(res, "Lấy hình ảnh thành công", 200, image);
    } catch (error) {
        console.error('Error in getImageById:', error);
        // Respond with an error message
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getCmntById = async(req,res)=>{
const {id} = req.params;
const getCmt = await model.hinh_anh.findByPk(id,{
include:['binh_luans'],


})
responseData(res, "Thành công", 200, getCmt)

}
const checkImageSaved = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if there's an entry in luu_anh table for the given image ID
        const savedImage = await model.luu_anh.findOne({
            where: { hinh_id: id }
        });

        if (!savedImage) {
            return res.send("Hình này chưa lưu");
        }

        // If the image is found, respond with success and the saved image entry
        responseData(res, "Thành công", 200, savedImage);
    } catch (error) {
        console.error('Error in checkImageSaved:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const saveComment =async (req,res) =>{
    try {
        // Extract comment data from the request body
          const {token} = req.headers;
        const {UserId} = decodeToken(token);
        const {hinh_id, noi_dung } = req.body;

        // Create a new comment entry in the database
        // Do 
        const newComment = await model.binh_luan.create({          
            hinh_id,
            ngay_binh_luan: new Date(),
            nguoi_dung_id:UserId,
            noi_dung
        });

        // Respond with success and the created comment
        responseData(res, "Bình luận đã được lưu", 200, newComment);    
    } catch (error) {
        console.error('Error in saveComment:', error);
        // Respond with an error message
        return res.status(500).json({ message: 'Internal server error' });
    }


}
const getUserById =async (req,res)=>{
const {token} = req.headers;
const {userId} = decodeToken(token);
const getUser = await model.nguoi_dung.findByPk(userId,{

    include:['luu_anhs']
})
   
responseData(res, "Lấy hình ảnh thành công", 200, getUser);

}
const getImgByIdUser =async (req,res) =>{
const {token} = req.headers;
const {userId}= decodeToken(token)
const getImg = await model.nguoi_dung.findByPk(userId,{
    include:['hinh_id_hinh_anhs']
})
responseData(res, "Lấy hình ảnh thành công", 200, getImg);
}


const deleteImg = async (req, res) => {
    try {
       
        const { id } = req.params;
        const deleteImg = await model.hinh_anh.findByPk(id)
       if(!deleteImg){
        responseData(res, "Ảnh không tồn tại", 500, "");
        return;
       }
        await model.hinh_anh.destroy({
            where: {
                hinh_id: id
            }
        });

       
        responseData(res, "Ảnh đã được xóa", 200);
    } catch (error) {
        console.error('Error in deleteImage:', error);
        // Respond with an error message
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const uploadImg = async (req, res) => {
    try {
        let file = req.file;
        const {token} = req.headers;
        const {userId}  = decodeToken(token)
        
        // Find the user by primary key
        const user = await model.nguoi_dung.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the avatar field
        user.anh_dai_dien = file.filename;
        
        // Save the updated user
        await user.save();

        return res.status(200).json({ message: 'Avatar updated successfully' });
    } catch (error) {
        console.error('Error in uploadImg:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const editUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract user ID from request parameters
        const { email, mat_khau,ho_ten,tuoi } = req.body; // Extract updated data from request body

        // Perform validation if needed
        
        // Update user profile in the database
        const [updatedRowCount] = await model.nguoi_dung.update(
            { email,mat_khau,ho_ten,tuoi },
            { where: { nguoi_dung_id: id } }
        );

        if (updatedRowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error in editUser:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};







export{
getUser,
login,
signUp,
getImage,
getImgByName,
test,
getCmntById,
checkImageSaved,
saveComment,
getUserById,
getImgByIdUser,
deleteImg,
uploadImg,
editUser

}