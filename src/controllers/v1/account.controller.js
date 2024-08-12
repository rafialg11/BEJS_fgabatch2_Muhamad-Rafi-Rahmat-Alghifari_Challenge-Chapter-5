const account = require("../../models/v1/account.model");
const user = require("../../models/v1/user.model");

async function createAccount(req, res) {
    try {
        const user_id = req.user.id;
        
        const { 
            bank_name, 
            account_number, 
            account_type, 
            pin, 
            balance            
        } = req.body;
        if(!bank_name || !account_number || !account_type || !pin ) 
        { 
            return res.status(400).json({status : "ERROR", message: "Please provide all required details"});
        }                
        

        const findUser = await user.getOneUser(user_id);
        if(!findUser) return res.status(400).json({status : "ERROR", message: "User not found"});        

        const newAccount = await account.createAccount(bank_name, account_number, account_type, pin, balance, user_id);
        const data = {
                id: newAccount.id,
                bank_name: newAccount.bank_name,
                account_number: newAccount.account_number,
                account_type: newAccount.account_type,                
                balance: newAccount.balance,
                user_id: newAccount.user_id
            }        
        res.status(201).json({status: "SUCCESS", message: "Account created successfully", data}); 
    }catch (error) {
        console.log(error);
        res.status(500).json({status: "ERROR", message: "Something went wrong"});
    }
}

async function getAllAccounts(req, res) {
    try{
        const accounts = await account.getAllAccounts();           
        const acocuntsData = accounts.map((account) => {
            return {
                id: account.id,
                bank_name: account.bank_name,
                account_number: account.account_number,
                account_type: account.account_type,                
                balance: account.balance,
                user_id: account.user_id
            }
        })
        const data = {
           acocuntsData           
        }   
        return res.status(200).json({status: "SUCCESS", data});
    }catch(error) {
        console.log(error);
        res.status(500).json({status: "ERROR", message: "Something went wrong"});
    }
}

async function getOneAccount(req, res) {
    try{
        const id = req.params.id;
        
        if(!id) return res.status(400).json({status: "ERROR", message: "Please provide account id"});
        
        const accountData = await account.getOneAccount(id);           
        const data = {
            account: {
                id: accountData.id,
                bank_name: accountData.bank_name,
                account_number: accountData.account_number,
                account_type: accountData.account_type,                
                balance: accountData.balance,
                user_id: accountData.user_id
            }                 
        }   
        return res.status(200).json({status : "SUCCESS", data});
    }catch(error) {
        console.log(error);
        res.status(500).json({status: "ERROR", message: "Something went wrong"});
    }
}

async function changePin(req, res) {
    try{
        const id = req.params.id;
        const { pin } = req.body;
        if(!id) return res.status(400).json({status: "ERROR", message: "Please provide account id"});
        if(!pin) return res.status(400).json({status: "ERROR", message: "Please provide pin"});
        
        await account.changePin(id, pin);           
         
        return res.status(200).json({status : "SUCCESS", message: "Pin changed successfully"});
    }catch(error) {
        console.log(error);
        res.status(500).json({status: "ERROR", message: "Something went wrong"});
    }
}

async function deleteAccount(req, res) {
    try{
        const id=req.params.id;
        if(!id) return res.status(400).json({status: "ERROR", message: "Please provide account id"});

        const findAccount = await account.getOneAccount(id);
        if(!findAccount) return res.status(404).json({status: "ERROR", message: "Account not found"});

        await account.deleteAccount(id);

        return res.status(200).json({status : "SUCCESS", message: "Account deleted successfully"});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({status: "ERROR", message: "Something went wrong"});
    }
}

module.exports = {
    createAccount,
    getAllAccounts,
    getOneAccount,
    changePin,
    deleteAccount
}