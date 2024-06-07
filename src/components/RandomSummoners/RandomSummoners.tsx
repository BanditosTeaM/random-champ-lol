import Image from "next/image";

import { Summoner } from "@/types";
import styles from "./RandomSummoners.module.css";
interface SummonersProps {
  randomSummoner: Summoner[];
}

export const RandomSummoners = ({ randomSummoner }: SummonersProps) => {
  return (
    <section>
      <div className={styles.summonersContainer}>
        {randomSummoner.map((summoner) => (
          <div
            title={summoner.name}
            className={styles.buildSummoner}
            key={summoner.name}
          >
            <Image
              key={summoner.name}
              src={`https://ddragon.leagueoflegends.com/cdn/${summoner.version}/img/spell/${summoner.image}`}
              alt={summoner.name}
              width={summoner.width}
              height={summoner.height}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
