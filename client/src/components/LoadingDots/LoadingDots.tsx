import styles from './LoadingDots.module.scss';  // Make sure to import the CSS for styles

const LoadingDots = () => {
  return (
    <div className={styles.LoadingDotsContainer}>
        <div className={styles.LoadingDots}>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </div>
    );
};

export default LoadingDots;
