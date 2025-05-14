// src/component/card-list/CardList.tsx
import { IBlog } from "../../types/app.type";
import CardComponent from "../card"; // assuming you have index.tsx inside /card
import styles from "./index.module.css"; // create styles if needed

interface CardListProps {
  blogs: IBlog[];
  onDeleteClick: (blogId: number) => void;
  onFavClick: (isFavorited: boolean, blogId: number) => void;
  onViewClick: (blog: IBlog) => void;
  onEditClick: (blog: IBlog) => void;
}

const CardList = ({ blogs, onDeleteClick, onFavClick, onViewClick, onEditClick }: CardListProps) => {
  return (
    <div className={styles.container}>
      {blogs.map((blog) => (
        <div key={blog.id} className={styles.cardsBody}>
          <CardComponent 
            title={blog.title}
            description={blog.description}
            imgURL={blog.image_url}
            isEditable={blog.isMyBlog ?? false}
            isDeletable={blog.isMyBlog ?? false}
            isFavorited={blog.isFavourite}
            onEditClick={() => onEditClick(blog)}
            onViewClick={() => onViewClick(blog)}
            onDeleteClick={() => onDeleteClick(blog.id ?? 0)}
            onFavClick={(isFavorited) => onFavClick(isFavorited, blog.id ?? 0)}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
