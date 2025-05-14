import {
  createFavourite,
  deleteFavourite,
} from "../repositories/favouriteRepo";
import { IFavourites } from "../Interfaces/favourites";

export const addFavouriteService = async (favorites: IFavourites) => {
  try {
    return await createFavourite(favorites);
  } catch (error) {
    return error;
  }
};

export const removeFavouriteService = async (favorites: IFavourites) => {
  try {
    return await deleteFavourite(favorites);
  } catch (error) {
    return error;
  }
};
