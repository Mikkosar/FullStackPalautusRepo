module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: "INTEGER",
      allowNull: false,
      validate: {
        min: 1991,
        max: new Date().getFullYear(),
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
