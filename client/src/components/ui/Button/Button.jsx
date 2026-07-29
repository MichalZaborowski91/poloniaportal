import styles from "./Button.module.scss";

const Button = ({
  children,
  variant = "primary",
  type = "button",
  size = "md",
  disabled = false,
  fullWidth = false,
  onClick,
}) => {
  let className = styles.button;

  switch (variant) {
    case "primary":
      className += ` ${styles.buttonPrimary}`;
      break;
    case "secondary":
      className += ` ${styles.buttonSecondary}`;
      break;
    case "ghost":
      className += ` ${styles.buttonGhost}`;
      break;

    default:
      className += ` ${styles.buttonPrimary}`;
  }
  switch (size) {
    case "sm":
      className += ` ${styles.buttonSm}`;
      break;

    case "lg":
      className += ` ${styles.buttonLg}`;
      break;

    default:
      className += ` ${styles.buttonMd}`;
  }
  if (fullWidth) {
    className += ` ${styles.buttonFullWidth}`;
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
