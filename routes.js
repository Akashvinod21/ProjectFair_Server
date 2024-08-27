//import express
const express = require('express')

//import userController
const userController = require('./controllers/userController')

//import projectController
const projectController = require('./controllers/projectController')

//import jwtmiddleware
const jwt=require('./middleware/jwtMiddleware')

//import multer
const multer = require('./middleware/multerMiddleware')

//create object for router class

const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//Add project
router.post('/add-project',jwt,multer.single("projectImg"),projectController.addProjectController)

//get home project
router.get('/home-project',projectController.getHomeProjectController)

//get all projects
router.get('/all-project',projectController.getAllProjectController)

//get user project
router.get('/user-project',jwt,projectController.getUserProjectController)

//edit user project
router.put('/edit-project/:id',jwt,multer.single("projectImg"),projectController.editUserProjectController)

//update profile
router.put('/update-profile',jwt,multer.single("profile"),userController.updateProfileController)


module.exports = router
