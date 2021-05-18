const difficulties = [1, 2, 3, 4, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15];

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tripsList = [
      {
        name: 'krabi',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'yosemite',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Insert categories before items because items reference categories
    const trips = await queryInterface.bulkInsert(
      'trips',
      tripsList,
      { returning: true },
    );

    const routes = [];

    for (let i = 0; i < trips.length; i++) {
      const trip = trips[i];

      for (let i = 0; i < 15; i++) {
        const noun = faker.company.bsNoun(); // Rowan Nikolaus
        const adjective = faker.commerce.productAdjective(); // Rowan Nikolaus
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

        routes.push({
          name: `${adjective} ${noun}`,
          trip_id: trip.id,
          difficulty,
          order: 0,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    queryInterface.bulkInsert('routes', routes);
  },

  down: async (queryInterface, Sequelize) => {},
};
