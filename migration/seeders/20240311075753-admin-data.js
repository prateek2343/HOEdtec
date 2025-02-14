'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/

		await queryInterface.bulkInsert('teams', [
			{
				fullName: 'Prateek Takthar',
				username: 'prateek@gmail.com',
				password: '$2a$10$Pr0oOEz.ev3kIQOL59RIJePUn5/qos8KK6cZIojh/PQUjX8XYQ0LO',
				default: false,
				createdAt: new Date(),
				updatedAt: new Date(),
		}
		])
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		await queryInterface.bulkDelete('teams', {
			[Op.or]: [
				{ username: 'prateek@gmail.com' },
			]
		})

	}
};
