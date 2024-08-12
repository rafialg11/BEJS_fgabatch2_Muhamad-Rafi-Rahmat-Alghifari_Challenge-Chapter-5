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
            res.status(201).json({status: "SUCCESS", data}); 
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


module.exports = {
    createUser,
    getAllUsers
}