"use client";
import styles from "./BreadCrumb.module.scss";

const BreadCrumb: React.FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <div className={styles.BreadCrumbContainer}>
      <ul className={styles.BreadCrumb}>
        {categories?.map((category) => (
          <li key={category}>{category}</li>
        ))} 
      </ul>
    </div>
  );
}


export default BreadCrumb;