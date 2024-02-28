const ServiceModel = require('../../models/Service/ServiceModel')

// Create Service
exports.createService = async(req, res) => {
    try {
        const reqBody = req.body
        const data = await ServiceModel.create(reqBody)
        res.status(201).json({status: 'Successfull', data: data})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// Read Service
exports.service = async(req, res) => {
    try {
        const data = await ServiceModel.find()
        res.status(200).json({status: 'Successfull', data: data})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// Get All Service List
exports.getServiceList = async (req, res) => {
    try {
        const data = await ServiceModel.find()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

// Get Single Service By ID
exports.getServiceByID = async (req, res) => {
    try {
        const id = req.params.id
        const Query = {_id: id}
        const data = await ServiceModel.findOne(Query)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

// Update Service By ID
exports.serviceUpdateByID = async (req, res) => {
    try {
        const reqBody = req.body
        const id = req.params.id
        const Query = {_id: id}
        const data = await ServiceModel.updateOne(Query, reqBody)
        res.status(200).json(data)
    } catch (error) {
        next()
    }
}

// Delete Service By ID
exports.serviceDeleteByID = async (req, res) => {
    try {
        const id = req.params.id
        const Query = {_id: id}
        const data = await ServiceModel.deleteOne(Query)
        res.status(200).json({message: 'Service Delete Successfull', data})
    } catch (error) {
        next(error)
    }
}