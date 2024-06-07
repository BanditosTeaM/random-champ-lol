import Link from "next/link";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <>
      <section className={styles.header}>
        <h1>Logo</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/dashboard" className={styles.link}>
                Random build
              </Link>
            </li>
            <li className={styles.navItemRight}>
              <Link href="/rules" className={styles.link}>
                Rules
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};
