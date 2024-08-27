const projects = require('../model/projectModel')

exports.addProjectController = async(req,res)=>{
    console.log('inside addProjectController');
    

    const userId = req.payload
    console.log(userId);

    const {title,language,github,website,overview}=req.body
    console.log(title,language,github,website,overview);

    const projectimage = req.file.filename
    console.log(projectimage);

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project already exists')
        }
        else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImg:projectimage,
                userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
    
        
    
}

//get all project
exports.getAllProjectController = async(req,res)=>{

    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        language:{
            //i removes case sensitivity
            $regex:searchKey,$options:'i'
        }
    }
    

    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

//get projects on home
exports.getHomeProjectController = async(req,res)=>{
    try {
        const homeproject = await projects.find().limit(3)
        res.status(200).json(homeproject)
    } catch (error) {
        res.status(401).json(error)
    }
}

//get user project
exports.getUserProjectController = async(req,res)=>{
    const userId = req.payload

    try {
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editUserProjectController = async(req,res)=>{
    const{title,language,github,website,overview,projectImg}=req.body

    const projectimage =req.file? req.file.filename:projectImg
    console.log(projectimage);

    const {id} = req.params
    console.log(id);
    const userId = req.payload


    try {

        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImg:projectimage,
            userId
            
        },{new:true})
        await existingProject.save()
        res.status(200).json(existingProject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}