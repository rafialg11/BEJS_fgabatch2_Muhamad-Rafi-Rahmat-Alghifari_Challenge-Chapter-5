const prisma = require("../../config/prisma");

async function createTransaction(amount, date, sender_account_id, receiver_account_id, description, transfer_purpose) {
    try{
        const transaction = await prisma.transaction.create({
            data:{
                amount,
                date,
                sender_account_id,
                receiver_account_id,
                description,
                transfer_purpose
            },
        });        
        return transaction;
    }catch (error) {
        throw error;
    }
}

async function getAllTransactions(){
    try{
        const transactionData = await prisma.transaction.findMany();
        return transactionData;
    }
    catch(error){
        throw error;
    }
}

async function getOneTransaction(id) {
    try{
        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        });
        return transaction;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    createTransaction,
    getAllTransactions,
    getOneTransaction
}