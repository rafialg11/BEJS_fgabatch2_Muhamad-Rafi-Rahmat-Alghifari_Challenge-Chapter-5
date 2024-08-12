const prisma = require("../../config/prisma");

async function createAccount(bank_name, account_number, account_type, pin, balance, user_id) {
    try{
        const account = await prisma.bankAccount.create({
            data:{
                bank_name,
                account_number,
                account_type,
                pin,
                balance,
                user_id
            },
        });        
        return account;
    }catch (error) {
        throw error;
    }
}

async function getAllAccounts() {
    try{
        const accounts = await prisma.bankAccount.findMany();
        return accounts;
    }catch (error) {
        throw error;
    }
}

async function getOneAccount(id) {
    try{
        const account = await prisma.bankAccount.findUnique({
            where: {
                id
            }
        });
        return account;
    }catch (error) {
        throw error;
    }
}

async function changePin(id, pin) {
    try{
        const account = await prisma.bankAccount.update({
            where: {
                id
            },
            data:{
                pin
            },
        });        
        return account;
    }catch (error) {
        throw error;
    }
}

async function deleteAccount(id) {
    try{
        const account = await prisma.bankAccount.delete({
            where: {
                id
            },
        });        
        return account;
    }catch (error) {
        throw error;
    }
}

async function updateBalance(id, balance) {
    try{
        const account = await prisma.bankAccount.update({
            where: {
                id
            },
            data:{
                balance
            },
        });        
        return account;
    }catch (error) {
        throw error;
    }
}

module.exports = {
    createAccount,
    getAllAccounts,
    getOneAccount,
    changePin,
    deleteAccount, 
    updateBalance
}