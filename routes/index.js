const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()


const middleware = function(req, res, next){
    // console.log(req.session);
    if(!req.session.userId){
        let err = 'Please login first!'
        res.redirect(`/login?err=${err}`)
    }else{
        next()
    }
  }
const teacher = function(req, res, next){
    console.log(req.session);
    if(req.session.role !== "Teacher"){
        let err = 'You have no access to Teachers page!'
        res.redirect(`/?err=${err}`)
    }else{
        next()
    }
  }

// const student = require('./student')

router.get('/', Controller.showLandpage)


router.get('/register', Controller.showPageRegister)
router.post('/register', Controller.postRegister)

router.get('/login', Controller.showLogin)
router.post('/login', Controller.postLogin)

router.get('/student/:CourseId', Controller.showLandpage)
router.get('/student', middleware, Controller.pageLevelStudent)
router.get('/teacher/update/:id', Controller.showFormUp)
router.post('/teacher/update/:id', Controller.postUpStudent)
router.get('/teacher/delete/:UserId/:id', Controller.deleteStudent)
router.get('/teacher', teacher, Controller.pageTeacher)


router.get('/logout', Controller.logOut)






module.exports = router