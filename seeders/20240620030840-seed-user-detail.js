'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataUserDetail = require('../PPuserDetail.json')
    .map((el)=>{
       delete el.id
       el.createdAt = new Date ()
       el.updatedAt = new Date ()
       return el
    })
    await queryInterface.bulkInsert("UserDetails", dataUserDetail)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserDetails", null, {truncate: true, restartIdentity: true} )
  }
};
