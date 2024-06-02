import Image from "next/image";

import { Item } from "@/types";

interface ItemsProps {
  randomLegendaryItems: Item[];
}

export const RandomItems = ({ randomLegendaryItems }: ItemsProps) => {
  return (
    <>
      <section>
        <h1>Random Legendary Items</h1>
        {randomLegendaryItems.map((item) => (
          <Image
            key={item?.name}
            src={`https://ddragon.leagueoflegends.com/cdn/${item?.version}/img/item/${item?.image}`}
            alt={item?.name}
            width={item?.width}
            height={item?.height}
          />
        ))}
      </section>
    </>
  );
};
