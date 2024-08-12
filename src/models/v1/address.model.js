const prisma = require("../../config/prisma");

async function createAddress(street, post_code, village, district, city, province, user_id) {
    try{
        const address = await prisma.address.create({
            data:{
                street,
                post_code,
                village,
                district,
                city,
                province,
                user_id
            },
        });        
        return address;
    }catch (error) {
        throw error;
    }
}

async function updateAddress(user_id, street, post_code, village, district, city, province) {
    try{
        const address = await prisma.address.update({
            where: {
                user_id
            },
            data:{
                street,
                post_code,
                village,
                district,
                city,
                province
            },
        });        
        return address;
    }catch (error) {
        throw error;
    }
}



module.exports = {
    createAddress,
    updateAddress
}