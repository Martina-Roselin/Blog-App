import sequelize from "../config/db";
import { DataTypes } from "sequelize";

const FavoritesSchema = sequelize.define(
  "Favorites",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      references: {
        model: "blogs",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "favorites",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default FavoritesSchema;
