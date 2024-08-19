'use strict';
const {
  Model,
  where
} = require('sequelize');
const bcrypt = require('bcryptjs');
const {transporter, mailOptions} = require('../index')
var nodemailer = require('nodemailer');
// const { sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail)
      User.hasMany(models.UserCourse)
    }

    static async sendEmail(newUser){
      let data = await sequelize.models.UserDetail.findAll({where : {
        UserId : newUser.id
      }})
      console.log(data);
        var mailOptions = {
          from: 'registration@happylearn.ac.id',
          to: `${newUser.email}`,
          subject: 'Register Success',
          text: `Welcome ${data[0].fullName} as ${newUser.role}`
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        console.log(mailOptions);
    }

  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(instance, option){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        
        instance.password = hash 
      },
      afterCreate() {
        
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};