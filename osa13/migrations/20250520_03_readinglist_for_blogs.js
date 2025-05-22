module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("readings", {
      id: {
        type: "INTEGER",
        autoIncrement: true,
        primaryKey: true,
      },
      read: {
        type: "BOOLEAN",
        allowNull: false,
        defaultValue: false,
      },
      user_id: {
        type: "INTEGER",
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      blog_id: {
        type: "INTEGER",
        allowNull: false,
        references: {
          model: "blogs",
          key: "id",
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("readings");
  },
};
