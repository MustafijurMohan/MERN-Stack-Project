const UserModel = require('../../models/User/UserModel')
const bcrypt = require('bcryptjs')

// Registration Controller
exports.registration = async( req, res) => {
    try {
        const {username, email, phone, password} = req.body

        const userExist = await UserModel.findOne({email: email})
        if(userExist) {
            return res.status(400).json({message: 'Email already exists.'})
        }

        // const saltRound = 10
        // const hash_password = await bcrypt.hash(password, saltRound)
        const data = await UserModel.create({username, email, phone, password})

        res.status(201).json({status: 'Successfull', data: data, token: await data.generateToken(), userId: data._id.toString()})

    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
        // next(error)
    }
}


// Login Controller
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const userExist = await UserModel.findOne({email})
        if(!userExist) {
            return res.status(400).json({message: 'Invalid Credentials'})
        }

        const user = await userExist.comparePassword(password)
        if (user) {
            res.status(200).json({message: 'Successfull', data: userExist, token: await userExist.generateToken(), userId: userExist._id.toString()})
        } else {
            res.status(400).json({message: 'Invalid email or password'})
        }


    } catch (error) {
        // res.status(400).json({status: 'Fail',data: error})
        next(error)
    }
}

// Find User
exports.user = async (req, res) => {
    try {
        const userData = req.user
        res.status(200).json({status: 'Successfull', data: userData})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// Get All User from Admin Panel
exports.getAllUsers = async (req, res) => {
    
    try {
        const Projection = {password: 0} 
        const users = await UserModel.find({}, Projection)
        if (!users || users.length === 0) {
            return res.status(404).json({message: 'No User Found'})
        }
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

// User Delete By ID Admin Panel
exports.userDeleteByID = async (req, res) => {
    try {
        const id = req.params.id
        const Query = {_id: id}
        const data = await UserModel.deleteOne(Query)
        res.status(200).json({message: 'User Delete Successfull', data: data})
    } catch (error) {
        next(error)
    }
}

// Single User By ID Admin Panel
exports.getUserByID = async (req, res) => {
    try {
        const id = req.params.id
        const Query = {_id: id}
        const data = await UserModel.findOne(Query, {password: 0})
        res.status(200).json(data) 
    } catch (error) {
        next(error)
    }
}

// Update Single User By ID Admin Panel
exports.userUpdateByID = async (req, res) => {
    try {
        const reqBody = req.body
        const id = req.params.id
        const Query = {_id: id}
        const data = await UserModel.updateOne(Query, reqBody)
        res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}