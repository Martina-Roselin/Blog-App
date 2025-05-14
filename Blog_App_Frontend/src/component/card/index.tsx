import React, { useState } from "react";
import styles from "./index.module.css";
import { Edit, EyeSolid, Trash } from "@mynaui/icons-react";
import { Heart, HeartSolid } from "@mynaui/icons-react"; // Hypothetical example – update based on your icon library

interface CardProps {
  title: string;
  description: string;
  imgURL: string;
  isEditable: boolean;
  isDeletable: boolean;
  isFavorited?: boolean;
  onEditClick?: () => void;
  onViewClick?: () => void;
  onDeleteClick?: () => void;
  onFavClick?: (isFavorited: boolean) => void;
}

const CardComponent: React.FC<CardProps> = ({
  title,
  description,
  imgURL,
  isEditable,
  isDeletable,
  isFavorited,
  onEditClick,
  onViewClick,
  onDeleteClick,
  onFavClick
}) => {

  const [isBlogFavorite, setIsBlogFavorite] = useState(isFavorited)

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardImage}>
        <img src={imgURL} alt="cardImage" />
        <div className={styles.favoriteIcon} onClick={() => {
          if (onFavClick) onFavClick(!isBlogFavorite);
          setIsBlogFavorite(!isBlogFavorite);
        }}>
          {isBlogFavorite ? (
            <HeartSolid size={32}/>
          ) : (
            <Heart size={32} color="pink" fontWeight={800} fill="beige"/>
          )}
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>
            <h3>{title}</h3>
          </div>
          <div className={styles.cardDescription}>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.cardAction}>
          <div className={styles.cardEditViewAction}>
            {isEditable && (
              <button className={styles.cardEditButton} onClick={onEditClick}>
                <div className={styles.cardEditText}>Edit</div>
                <div className={styles.cardEditIcon}><Edit size={14} /></div>
              </button>
            )}
            <button className={styles.cardViewButton} onClick={onViewClick}>
              <div className={styles.cardEditText}>View</div>
              <div className={styles.cardEditIcon}><EyeSolid size={14} /></div>
            </button>
          </div>
          <div className={styles.cardDeleteAction}>
            {isDeletable && (
              <button className={styles.cardDeleteButton} onClick={onDeleteClick}>
                <div className={styles.cardDeleteText}>Delete</div>
                <div className={styles.cardDeleteIcon}><Trash size={14} /></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
