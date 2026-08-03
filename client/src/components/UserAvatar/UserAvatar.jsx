import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import defaultAvatar from "../../assets/avatar/avt.jpg";
import styles from "./UserAvatar.module.scss";

export const UserAvatar = ({
  onClick,

  className = "",
  buttonClassName = "",
}) => {
  const { user } = useAuth();

  const avatarSrc = useMemo(() => {
    if (!user?.profile?.avatar) {
      return defaultAvatar;
    }

    return `${user.profile.avatar}?v=${user.profile.avatar}`;
  }, [user?.profile?.avatar]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.triggerButton} ${buttonClassName}`}
    >
      <img
        src={avatarSrc}
        alt="Avatar użytkownika"
        className={`${styles.avatar} ${className}`}
      />
    </button>
  );
};
