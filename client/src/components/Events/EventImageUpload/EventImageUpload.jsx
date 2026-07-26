import { useRef } from "react";
import styles from "./EventImageUpload.module.scss";

export const EventImageUpload = ({
  image,
  preview,
  currentImage,
  onImageChange,
  onRemoveImage,
}) => {
  const inputRef = useRef(null);

  return (
    <div className={styles.imageUploader}>
      <img
        src={preview || currentImage || "/events/default-event.webp"}
        alt="Event cover"
        className={styles.imagePreview}
      />

      <div className={styles.actions}>
        <button type="button" onClick={() => inputRef.current.click()}>
          {preview ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
        </button>

        {image && (
          <button type="button" onClick={onRemoveImage}>
            Usuń zdjęcie
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={onImageChange}
        />
      </div>
    </div>
  );
};
