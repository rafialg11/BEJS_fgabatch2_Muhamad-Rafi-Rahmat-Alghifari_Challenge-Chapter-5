const prisma = require("../../config/prisma");

async function createUser(name, email, password, phone) {
    try{
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password,
                phone
            },
        });        
        return user;
    }catch (error) {
        throw error;
    }
}

async function getAllUsers() {
    try{
        const users = await prisma.user.findMany({
            include: {
                Profile: true,
                Address: true
            }
        });
        return users;
    }catch (error) {
        throw error;
    }
}

async function getOneUser(id) {
    try{
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                Profile: true,
                Address: true
            }
        });
        return user; 
    }catch (error) {
        throw error;
    }
}

async function updateUser(id, name, email, password, phone) {
    try{
        const user = await prisma.user.update({
            where: {
                id
            },
            data:{
                name,
                email,
                password,
                phone
            },
        });        
        return user;
    }catch (error) {
        throw error;
    }
}

async function deleteUser(id) {
    try{
        const user = await prisma.user.delete({
            where: {
                id
            },
        });        
        return user;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,        
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}
