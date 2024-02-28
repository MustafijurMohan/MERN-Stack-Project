const express = require('express')
const { registration, login, user, getAllUsers, userDeleteByID, getUserByID, userUpdateByID } = require('../controllers/User/UserControllers')
const validate = require('../middlewares/validate-middleware')
const {signupSchema, loginSchema} = require('../validations/validator')
const { contact, getAllContact, contactDeleteByID } = require('../controllers/Contact/ContactController')
const { authMiddleware } = require('../middlewares/auth-middleware')
const { service, getServiceList, createService, getServiceByID, serviceUpdateByID, serviceDeleteByID } = require('../controllers/Service/ServiceController')
const { adminMiddleware } = require('../middlewares/admin-middleware')
const router = new express.Router()




// User Profile api
router.post('/registration', validate(signupSchema), registration)
router.post('/login', validate(loginSchema), login)
router.get('/user', authMiddleware, user)

// Admin Route
router.get('/getAllUsers', authMiddleware, adminMiddleware , getAllUsers)
router.get('/getUserByID/:id', authMiddleware, adminMiddleware, getUserByID)
router.post('/userUpdateByID/:id', authMiddleware, adminMiddleware, userUpdateByID)
router.delete('/userDeleteByID/:id', authMiddleware, adminMiddleware, userDeleteByID)

// Contact api
router.post('/contact', contact)

// Admin Route
router.get('/getAllContact', authMiddleware, adminMiddleware, getAllContact)
router.delete('/contactDeleteByID/:id', authMiddleware, adminMiddleware, contactDeleteByID)


// Service api
router.get('/service', service)

// Admin Route
router.post('/createService', authMiddleware, adminMiddleware, createService)
router.get('/getServiceList', authMiddleware, adminMiddleware, getServiceList)
router.get('/getServiceByID/:id', authMiddleware, adminMiddleware, getServiceByID)
router.post('/serviceUpdateByID/:id', authMiddleware, adminMiddleware, serviceUpdateByID)
router.delete('/serviceDeleteByID/:id', authMiddleware, adminMiddleware, serviceDeleteByID)



module.exports = router

