import Blog from './blogs';
import User from './user';
import Favorites from './favorites';
import sequelize from '../config/db';

User.belongsToMany(Blog, {
  through: Favorites,
  foreignKey: "user_id",
  otherKey: "blog_id",
});

Blog.belongsToMany(User, {
  through: Favorites,
  foreignKey: "blog_id",
  otherKey: "user_id",
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author',
});

User.hasMany(Blog, {
  foreignKey: 'user_id',
  as: 'authoredBlogs',
});

// console.log(User.associations); 
// console.log(Blog.associations);

export { sequelize, User, Blog, Favorites };

