import Map from "../../assets/worldMap/world.svg?react";
import styles from "../WorldMap/WorldMap.module.scss";

export const WorldMap = () => {
  return (
    <div>
      <Map className={styles.map} />
    </div>
  );
};
