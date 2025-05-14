import sequelize from "../config/db";
import { DataTypes } from "sequelize";

const BlogSchema = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: 'SET NULL'
    }
  },
  {
    tableName: "blogs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default BlogSchema;