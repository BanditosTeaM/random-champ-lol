import { Header } from "@/components/Header";
import styles from "./styles.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={styles.html}>
      <body className={styles.body}>
        <Header />
        {children}
      </body>
    </html>
  );
}
