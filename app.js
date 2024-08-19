/**
 * npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string
 * npx sequelize-cli model:generate --name UserDetail --attributes fullName:string,age:integer,educationLevel:string,email:string,phoneNumber:string,UserId:integer
 * npx sequelize-cli model:generate --name Category --attributes name:string
 * npx sequelize-cli model:generate --name Course --attributes name:string,description:string,duration:string,CategoryId:integer
 * npx sequelize-cli model:generate --name UserCourse --attributes CourseId:integer
 * npx sequelize-cli migration:generate --name add-column-userid-usercourse-table
 */

const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use('/', express.static('public'))
app.use('/teacher', express.static('public'))
app.use('/teacher/update', express.static('public'))
app.use('/teacher/delete', express.static('public'))
app.use(express.urlencoded({extended:false}))

app.use(session({
  secret: 'pair project',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    sameSite : false
  }
}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})