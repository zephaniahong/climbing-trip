export default function initRouteModel(sequelize, DataTypes) {
  return sequelize.define(
    'route',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      difficulty: {
        type: DataTypes.STRING,
      },
      tripId: {
        type: DataTypes.INTEGER,
        // This links the categoryId column to the id column in the categories table
        references: {
          model: 'trips',
          key: 'id',
        },
      },
      order: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
