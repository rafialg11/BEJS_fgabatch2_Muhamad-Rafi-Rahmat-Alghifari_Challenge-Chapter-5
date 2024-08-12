const prisma = require("../../config/prisma");

async function createProfile(birth_date, birth_place, gender, identity_number, identity_type, user_id) {
    try{
        const profile = await prisma.profile.create({
            data:{
                birth_date,
                birth_place,
                gender,
                identity_number,
                identity_type,
                user_id
            },
        });        
        return profile;
    }catch (error) {
        throw error;
    }
}

async function updateProfile(user_id, birth_date, birth_place, gender, identity_number, identity_type) {
    try{
        const profile = await prisma.profile.update({
            where: {
                user_id
            },
            data:{
                birth_date,
                birth_place,
                gender,
                identity_number,
                identity_type
            },
        });        
        return profile;
    }catch (error) {
        throw error;
    }
}

async function getOneProfile(identity_number) {
    try{
        const profile = await prisma.profile.findUnique({
            where: {
                identity_number
            },
        });        
        return profile;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    createProfile,
    updateProfile,
    getOneProfile
}