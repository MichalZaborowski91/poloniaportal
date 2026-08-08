import { useRef, useState } from "react";
import { deleteAvatar, uploadAvatar } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";
import styles from "../AvatarUpload/AvatarUpload.module.scss";
import Loader from "../../assets/icons/loader.svg?react";
import { MdAddPhotoAlternate, MdPhotoCamera, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { Spinner } from "../Spinner/Spinner";

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
      <div className={styles.imageWrapper}>
        <img
          src={avatarSrc}
          alt="avatar"
          className={styles.image}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR;
          }}
        />

        {hasCustomAvatar && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={styles.removeButton}
            aria-label="Usuń avatar"
          >
            <MdClose />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={openFilePicker}
          disabled={loading}
          className={styles.button}
        >
          {loading ? (
            <Spinner />
          ) : hasCustomAvatar ? (
            <MdPhotoCamera />
          ) : (
            <MdAddPhotoAlternate />
          )}

          {loading
            ? "Ładowanie..."
            : hasCustomAvatar
              ? "Zmień avatar"
              : "Dodaj avatar"}
        </button>
      </div>
    </div>
  );
};
