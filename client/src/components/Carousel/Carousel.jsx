import styles from "./Carousel.module.scss";

const Carousel = ({
  items = [],
  renderItem,
  itemsPerSlide,
  autoplay = true,
  autoplayDelay = 7000,
}) => {
  return (
    <div className={styles.carousel}>
      {items.map((item) => (
        <div key={item._id}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default Carousel;
