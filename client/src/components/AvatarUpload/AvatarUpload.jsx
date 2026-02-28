import { useRef, useState } from "react";
import { deleteAvatar, uploadAvatar } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";
import styles from "../AvatarUpload/AvatarUpload.module.scss";
import Loader from "../../assets/icons/loader.svg?react";
import Image from "../../assets/icons/image.svg?react";
import Delete from "../../assets/icons/delete.svg?react";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "/avatar/avt.jpg";

export const AvatarUpload = () => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const avatarSrc = user?.profile?.avatar || DEFAULT_AVATAR;

  const hasCustomAvatar =
    user?.profile?.avatar && user.profile.avatar !== DEFAULT_AVATAR;

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    try {
      await uploadAvatar(file);
      await refreshUser();
    } catch (error) {
      toast.error("Błąd ładowania avatara.");
      console.error(error);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAvatar();
      await refreshUser();
    } catch (error) {
      toast.error("Usunięcie nie powiodło się.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.avatar}>
      <img
        src={avatarSrc}
        alt="avatar"
        className={styles.avatar__image}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_AVATAR;
        }}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <div className={styles.avatar__buttonContainer}>
        <button
          type="button"
          onClick={openFilePicker}
          disabled={loading}
          className={styles.avatar__button}
        >
          {loading ? <Loader /> : <Image />}
          {loading
            ? "Ładowanie..."
            : hasCustomAvatar
              ? "Zmień avatar"
              : "Dodaj avatar"}
        </button>
        {hasCustomAvatar && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={styles.avatar__button}
          >
            <Delete />
            Usuń avatar
          </button>
        )}
      </div>
    </div>
  );
};
