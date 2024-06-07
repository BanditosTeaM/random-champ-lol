import Image from "next/image";
import styles from "./RandomItems.module.css";
import { Item } from "@/types";

interface ItemsProps {
  randomLegendaryItems: Item[];
}

export const RandomItems = ({ randomLegendaryItems }: ItemsProps) => {
  return (
    <>
      <section>
        <h1>Random Legendary Items</h1>
        <div className={styles.buildItemsContainer}>
          <div className={styles.buildItems}>
            {randomLegendaryItems.map((item) => (
              <div
                key={item?.name}
                title={item.name}
                className={styles.buildItem}
              >
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${item?.version}/img/item/${item?.image}`}
                  alt={item?.name}
                  width={item?.width}
                  height={item?.height}
                  className={styles.imageItem}
                />
              </div>
            ))}
          </div>
          <span className={styles.startItem}>Start item</span>
        </div>
      </section>
    </>
  );
};
