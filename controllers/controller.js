
const {UserDetail, User, Category, Course} = require('../models')
const { toHoursAndMinutes } = require("../helper/index")
const bcrypt = require('bcryptjs')
const {Op} = require('sequelize')


class Controller {
    static async showLandpage(req, res){
        try {
            const {err} = req.query
            res.render('landpage', {err})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async showPageRegister(req,res){
        try {
            const {errors} = req.query
            res.render('register', {errors})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async postRegister(req,res){
        try {
            // console.log(req.body);
            const {fullName, age, educationLevel, role, email, phoneNumber, password}= req.body
            let data = await User.create({email, password, role})
            await UserDetail.create({fullName, age, educationLevel, email, phoneNumber, UserId : data.id})
            await User.sendEmail(data)
            res.redirect('/login')
        } catch (error) {
            try {
                if(error.name === "SequelizeValidationError"){
                    let errors = error.errors.map(el => el.message)
                    res.redirect(`/register?errors=${errors}`)
                }else{
                    res.send(error)
                }
            } catch (error) {
                res.send(error)
                console.log(error);
                
            }
        }
    }
    static async showLogin(req,res){
        try {
            const {err} = req.query
            res.render('login', {err})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async postLogin(req,res){
        try {
            const {email, password} = req.body
            let err = 'email or password is wrong!'
            // console.log(req.body);

            let data = await User.findOne({where : {email}})
            if(!data) {
                res.redirect(`/login?err=${err}`)
            }else{

                let checkValid = bcrypt.compareSync(password, data.password);

                    if(checkValid === true){
                        req.session.userId = data.id
                        req.session.role = data.role
                        res.redirect('/student')
                    }else{
                        res.redirect(`/?err=${err}`)
                    }
            }
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async pageLevelStudent(req,res){
        try {
            let data = await Category.findAll({
                include : Course,
                order : [["id", "ASC"]]
            })
            let dataUser =  await UserDetail.findAll()
            // res.send(data)
            res.render('studentPage', {data,dataUser,toHoursAndMinutes})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async pageTeacher(req,res){
        try {
            const {id} = req.params
            const {search} = req.query

            let data = await Category.findAll({
                include : Course,
                order : [["id", "ASC"]]
            })
            if(search){
                data = await Category.findAll({
                    where : {
                        name : {
                            [Op.iLike] : `%${search}%`
                        }
                    },
                    include : {
                        model : Course,
                    } 
                })
            }
            let dataUser = await UserDetail.findAll({include : User, order : [["UserId", "ASC"]]})
            // let dataTeacher = await UserDetail.findByPk(+id)
            // res.send(dataUser)
            res.render('teacher', {data, dataUser, toHoursAndMinutes})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
    static async showFormUp (req, res){
        try {
            const {id} =req.params
            let data = await UserDetail.findByPk(id)
            // res.send(data)
            res.render('formEditStudent', {data})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postUpStudent(req, res){
        try {
            // console.log(req.body);
            const {id} = req.params
            const {fullName, age, educationLevel, phoneNumber} = req.body
            let data = await UserDetail.update({
                fullName : fullName, 
                age : age, 
                educationLevel : educationLevel, 
                phoneNumber : phoneNumber},{
                where : {id : id}
            })
            // res.send(data)
            res.redirect('/teacher')
        } catch (error) {
            console.log(error);
            res.send(error.message)
        }
    }
    static async deleteStudent(req, res){
        try {
            // console.log(req.params);
            const {UserId, id} = req.params //id userdetail
            await UserDetail.destroy({where : {id : id}})
            await User.destroy({where : {id : UserId}})
            res.redirect('/teacher')
        } catch (error) {
            console.log(error);
        }
    }
    static async logOut(req, res){
        try {
            req.session.destroy((err) =>{
                if (err) {
                    res.send(err)
                }else{
                    res.redirect('/login')
                }
            })
        } catch (error) {

            res.send(error)
        }
    }
    static async showCourse(req, res){
        try {
            // const { User.iId =  reu}
        } catch (error) {
            
        }
    }
}

module.exports = Controller