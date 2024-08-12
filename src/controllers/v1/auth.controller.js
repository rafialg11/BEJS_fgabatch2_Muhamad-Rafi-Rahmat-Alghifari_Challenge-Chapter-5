const prisma = require('../../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function login(req,res) {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false, 
                message: 'All fields are required' 
            });
        };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ 
                status: false, 
                message: 'Invalid credentials' 
            });
        };
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ 
                status: false, 
                message: 'Invalid credentials' 
            });
        };
        
        const payloadToken = {
            id: user.id,
            username: user.username
        };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payloadToken, secret, { expiresIn: '1h' });        
        res.status(200).json({ 
            status: "SUCCESS", 
            message: 'User logged in successfully',
            data: {token, email}
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { login }