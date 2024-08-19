'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsTo(models.User)
    }
    // years(){
    //   this.age = `${this.age} years old`
    // }
    get greet(){
      if(this.educationLevel === "Beginner"){
          return this.fullName = `${this.fullName} - Beginner`
      }else if(this.educationLevel === "Intermediate"){
           return this.fullName = `${this.fullName} - Intermediate`
      }else{
          return this.fullName = `${this.fullName} - Advanced`
      }
  }
  }
  UserDetail.init({
    fullName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len : {
          args : [5, 20],
          msg : 'Input name must be fullName'
        },
        notEmpty : {
          msg : 'Name must be not empty'
        }
      }}
    ,
      age: {
        type : DataTypes.INTEGER,
        allowNull :false,
        validate : {
          min : {args : 12, msg:'Minimum age 12 years old'}
        }, 
        notEmpty : {
          msg :'Age must not be empty'
        }
      },
      educationLevel: DataTypes.STRING,
      email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail :{
          msg : ('Invalid input email')
        },
        notEmpty : {
          msg : 'Email must not be empty'
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};