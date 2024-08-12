const transaction = require("../../models/v1/transaction.model");
const account = require("../../models/v1/account.model");

async function createTransaction(req, res) {
    try{
        const { 
            amount,              
            sender_account_id, 
            receiver_account_id, 
            description, 
            transfer_purpose
        } = req.body;
        const date = new Date();
        //check if all required details are provided
        if(!amount || !sender_account_id || !receiver_account_id) 
        { 
            return res.status(400).json({status: "ERROR", message: "Please provide all required details"});
        }                
        
        //check if sender and receiver account exists        
        const senderAccount = await account.getOneAccount(sender_account_id);
        if(!senderAccount) return res.status(400).json({status: "ERROR", message: "Sender account not found"});

        const receiverAccount = await account.getOneAccount(receiver_account_id);
        if(!receiverAccount) return res.status(400).json({status: "ERROR", message: "Receiver account not found"});
        
        //check if amount is valid
        if(amount<0 || amount==0)
        {
            return res.status(400).json({status: "ERROR", message: "Invalid amount"});
        }     
        
        if(amount>senderAccount.balance || senderAccount.balance<0) 
        {
            return res.status(400).json({status: "ERROR", message: "Insufficient balance"});
        }
        
        //update balance 
        const senderBalanceUpdated = senderAccount.balance - amount;
        const receiverBalanceUpdated = receiverAccount.balance + amount;
        
        //create transaction
        const newTransaction = await transaction.createTransaction(amount, date, sender_account_id, receiver_account_id, description, transfer_purpose);            

        //update balance in Account model
        await account.updateBalance(sender_account_id, senderBalanceUpdated);
        await account.updateBalance(receiver_account_id, receiverBalanceUpdated);
        
        const data = {
            transaction: newTransaction
        }
        res.status(201).json({status: "SUCCESS", data});
    }catch(error) {
        res.status(500).json({status: "ERROR", message: error.message});
    }
}

async function getAllTransactions(req, res) {
    try{
        const transactions = await transaction.getAllTransactions();           
        const data = {
            transactions,                 
        }   
        return res.status(200).json({status: "SUCCESS", data});
    }catch(error) {
        res.status(500).json({status: "ERROR", message: error.message});
    }
}

async function getOneTransaction(req, res) {
    try{
        const id = req.params.id;
        
        if(!id) return res.status(400).json({status: "ERROR", message: "Please provide transaction id"});
        
        const transactionData = await transaction.getOneTransaction(id); 

        if(!transactionData) return res.status(404).json({status: "ERROR", message: "Transaction not found"});

        const senderAccount = await account.getOneAccount(transactionData.sender_account_id);
        const receiverAccount = await account.getOneAccount(transactionData.receiver_account_id);   

        const senderAccountData = {
            accountNumber: senderAccount.account_number,
            balance: senderAccount.balance,
            bankName: senderAccount.bank_name
        }

        const receiverAccountData = {
            accountNumber: receiverAccount.account_number,
            balance: receiverAccount.balance,
            bankName: receiverAccount.bank_name
        }
        
        const data = {
            transaction: transactionData,
            senderAccount: senderAccountData,
            receiverAccount: receiverAccountData                 
        }   
        return res.status(200).json({status: "SUCCESS", data: data});
    }catch(error) {
        res.status(500).json({status: "ERROR", message: error.message});
    }
}

module.exports = {
    createTransaction,
    getAllTransactions,
    getOneTransaction
}