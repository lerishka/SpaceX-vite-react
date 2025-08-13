import defaultimage from "../../assets/defaultimage.svg";
import styles from "./Card.module.scss";

type CardProps = {
  missionPatch?: string;
  missionName: string;
  rocketName?: string;
  onClick: () => void;
};

const Card = ({
  missionPatch,
  missionName,
  rocketName,
  onClick,
}: CardProps) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.infoWrapper}>
        <img
          className={styles.image}
          src={
            missionPatch && missionPatch.trim() !== ""
              ? missionPatch
              : defaultimage
          }
        />
        <h3 className={styles.header}>{missionName}</h3>
        <p className={styles.description}>
          {rocketName ? rocketName : "Not found"}
        </p>
      </div>
      <button onClick={onClick}>See more</button>
    </div>
  );
};

export default Card;
