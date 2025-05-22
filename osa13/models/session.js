const { Model } = require("sequelize");
const { sequelize } = require("../util/db");

class Session extends Model {}
Session.init(
  {
    id: {
      type: "INTEGER",
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: "INTEGER",
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    token: {
      type: "STRING",
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "session",
  }
);

module.exports = Session;
