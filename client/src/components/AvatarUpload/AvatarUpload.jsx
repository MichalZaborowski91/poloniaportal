import { useRef, useState } from "react";
import { deleteAvatar, uploadAvatar } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";
import defaultAvatar from "../../assets/avatar/avt.jpg";

export const AvatarUpload = () => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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
      alert("Upload failed");
      console.error(error);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Remove avatar?")) {
      return;
    }

    setLoading(true);
    try {
      await deleteAvatar();
      await refreshUser();
    } catch (error) {
      alert("Delete failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <img
        src={user?.profile?.avatar || defaultAvatar}
        alt="avatar"
        width={96}
        height={96}
        style={{ borderRadius: "50%", border: "2px solid black" }}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <button type="button" onClick={openFilePicker} disabled={loading}>
        {loading ? "Uploading..." : "Change avatar"}
      </button>
      {user?.profile?.avatar && (
        <button type="button" onClick={handleDelete} disabled={loading}>
          Remove avatar
        </button>
      )}
    </div>
  );
};
