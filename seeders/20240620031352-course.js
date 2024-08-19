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
    const dataCourse = require('../PPcourse.json')
    .map((el)=>{
       delete el.id
       el.createdAt = new Date ()
       el.updatedAt = new Date ()
       return el
    })
    await queryInterface.bulkInsert("Courses", dataCourse)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Courses", null, {truncate: true, restartIdentity: true} )
  }
};
