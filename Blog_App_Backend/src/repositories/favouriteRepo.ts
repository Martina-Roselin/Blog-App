import { IFavourites } from "../Interfaces/favourites";
import Favourites from "../models/favorites";
export const createFavourite = async (favorites: IFavourites) => {
  try {
    const existingfavourite = await Favourites.findOne({
      where: {
        user_id: favorites.user_id,
        blog_id: favorites.blog_id,
      },
    });
    if (existingfavourite) {
      return null;
    }
    const addFavourite = await Favourites.create({
      user_id: favorites.user_id,
      blog_id: favorites.blog_id,
    });
    if (!addFavourite) {
      return null;
    }
    return addFavourite;
  } catch (error) {
    return { error: true, message: error };
  }
};

export const deleteFavourite = async (favorites: IFavourites) => {
  try {
    const existingfavourite = await Favourites.findOne({
      where: {
        user_id: favorites.user_id,
        blog_id: favorites.blog_id,
      },
    });
    if (!existingfavourite) {
      return null;
    }
    const addFavourite = await Favourites.destroy({
      where: {
        user_id: favorites.user_id,
        blog_id: favorites.blog_id,
      },
    });
    if (!addFavourite) {
      return null;
    }
    return addFavourite;
  } catch (error) {
    throw error;
  }
};
