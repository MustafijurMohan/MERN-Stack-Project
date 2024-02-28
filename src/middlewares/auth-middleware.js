require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User/UserModel')
const secretKey = process.env.JWT_SECRET_KEY


exports.authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')
        if (!token) {
            res.status(401).json({status: 'Unauthorized'})
        }
        // const jwtToken = token.replace('Bearer', '').trim()

    try {
        const isVerified = jwt.verify(token, secretKey)
        const userData = await UserModel.findOne({email: isVerified.email}).select({password: 0})
        // console.log(isVerified)

        req.user = userData
        req.token = token,
        req.userID = userData._id
        next()
    } catch (error) {
        res.status(401).json({status: 'Unauthorized'})
    }
}






