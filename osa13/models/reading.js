const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Reading extends Model {}
Reading.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogs",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "reading",
  }
);

module.exports = Reading;
