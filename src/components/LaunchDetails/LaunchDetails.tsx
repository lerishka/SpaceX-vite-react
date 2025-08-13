import type { Launch } from "../../types/types";
import defaultimage from "../../assets/defaultimage.svg";
import styles from "./LaunchDetails.module.scss";

type LaunchDetailsProps = {
  selectedLaunch: Launch;
  onClose: () => void;
};

const LaunchDetails = ({ selectedLaunch, onClose }: LaunchDetailsProps) => {
  return (
    <div className={styles.modalInfo}>
      <div className={styles.modalHeader}>
        <h2>{selectedLaunch.mission_name}</h2>
        <button
          className={styles.modalCloseButton}
          type="button"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className={styles.mainContent}>
        <img
          className={styles.modalImage}
          src={
            selectedLaunch.links?.mission_patch
              ? selectedLaunch.links?.mission_patch
              : defaultimage
          }
          alt="mission patch"
        />
        <div className={styles.infoWrapper}>
          <div className={styles.modalInfoHeader}>Mission name:</div>
          <div className={styles.modalInfoDescription}>
            {selectedLaunch.mission_name}
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.modalInfoHeader}>Rocket name:</div>
          <div className={styles.modalInfoDescription}>
            {selectedLaunch.rocket?.rocket_name
              ? selectedLaunch.rocket?.rocket_name
              : "Not found"}
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.modalInfoHeader}>Details:</div>
          <div className={styles.modalInfoDescription}>
            {selectedLaunch.details ? selectedLaunch.details : "Not found"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetails;
