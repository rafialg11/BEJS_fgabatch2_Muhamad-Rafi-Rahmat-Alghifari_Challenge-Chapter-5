const user = require("../../models/v1/user.model");
const address = require("../../models/v1/address.model");
const profile = require("../../models/v1/profile.model");
const bcrypt = require('bcrypt');

async function createUser(req, res) {
    try {
        const { 
            name, 
            email, 
            password, 
            phone, 
            birth_date, 
            birth_place, 
            gender, 
            identity_number, 
            identity_type,
            street,
            post_code,
            village,
            district,
            city,
            province
        } = req.body;
        if(!name || !email || !password || !phone) 
        { 
            return res.status(400).json({status : "ERROR", message: "Please provide all required details"});
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        const findUser = await user.getOneUser(email);
        const findProfile = await profile.getOneProfile(identity_number);
        if(findUser || findProfile) {
            return res.status(400).json({status : "ERROR", message: "User already exists"});
        } else if(!findUser || !findProfile) {
            const newUser = await user.createUser(name, email, hashedPassword, phone);         
            const userId = newUser.id;
            const newProfile = await profile.createProfile(birth_date, birth_place, gender, identity_number, identity_type, userId);
            const newAddress = await address.createAddress(street, post_code, village, district, city, province, userId);
            const data = {
                user: {
                    id: userId,
                    name: newUser.name,
                    email: newUser.email,                
                    phone: newUser.phone,
                },
                profile: newProfile,
                address: newAddress
            }
            res.status(201).json({status: "SUCCESS", message: "User created successfully", data}); 
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({status : "ERROR", message: "Something went wrong"});
    }
}

async function getAllUsers(req, res) {
    try{
        const users = await user.getAllUsers();           
        const userData = users.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,                
                    phone: user.phone,                    
                    profile: user.Profile,
                    address: user.Address
                }
            })                                         
        return res.status(200).json({status : "SUCCESS", userData});
    }catch(error) {
        console.log(error);
        res.status(500).json({status : "ERROR", message: "Something went wrong"});
    }
}

async function getOneUser(req, res) {
    try{
        const id = req.params.id;
        const userData = await user.getOneUser(id); 
        if(!userData) return res.status(400).json({status : "ERROR", message: "User not found"});         
        const data = {
            id: userData.id,
            name: userData.name,
            email: userData.email,                
            phone: userData.phone,
            profile: userData.Profile,
            address: userData.Address
        }
        return res.status(200).json({status: "SUCCESS", data});
    }catch(error) {
        console.log(error);
        res.status(500).json({status : "ERROR", message: "Something went wrong"});
    }
}

async function updateUser(req, res) {
    try{
        const user_id = req.params.id;
        
        const { 
            name, 
            email, 
            password, 
            phone, 
            birth_date, 
            birth_place, 
            gender, 
            identity_number, 
            identity_type ,
            street,
            post_code,
            village,
            district,
            city,
            province
        } = req.body;            

        const checkUserData = await user.getOneUser(user_id);
        if(!checkUserData) return res.status(404).json({status : "ERROR", message: "User not found"});

        const userData = await user.updateUser(user_id, name, email, password, phone);
        const profileData = await profile.updateProfile(user_id, birth_date, birth_place, gender, identity_number, identity_type);
        const addressData = await address.updateAddress(user_id, street, post_code, village, district, city, province);
        
        const data = {
            userData:{
                id: userData.id,
                name: userData.name,
                email: userData.email,                
                phone: userData.phone,
            },
            profileData,
            addressData
        }
        return res.status(200).json({status: "SUCCESS", message: "User updated successfully", data});
    }catch(error) {
        console.log(error);
        res.status(500).json({status : "ERROR", message: "Something went wrong"});
    }
    
}

async function deleteUser(req, res) {
    try{
        const user_id = req.params.id;

        const userData = await user.getOneUser(user_id);
        if(!userData) return res.status(404).json({status : "ERROR", message: "User not found"});

        await user.deleteUser(user_id);       
        return res.status(200).json({status: "SUCCESS", message: "User deleted successfully"});
    }catch(error) {
        console.log(error);
        res.status(500).json({status : "ERROR", message: "Something went wrong"});
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}