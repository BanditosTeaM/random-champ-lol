import Image from "next/image";
import styles from "./RandomRunes.module.css";
import { Rune } from "@/types";

interface RunesProps {
  randomRunes: Rune[];
}

export const RandomRunes = ({ randomRunes }: RunesProps) => {
  return (
    <>
      <section>
        <h1>Runes</h1>
        <div className={styles.runesContainer}>
          <div className={styles.column}>
            {randomRunes.slice(0, 4).map((rune) => (
              <div key={rune?.id} title={rune.name}>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${rune?.icon}`}
                  alt={rune?.name}
                  height={48}
                  width={48}
                />
              </div>
            ))}
          </div>
          <div className={styles.column}>
            {randomRunes.slice(4).map((rune) => (
              <div key={rune?.id} title={rune.name}>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${rune?.icon}`}
                  alt={rune?.name}
                  height={48}
                  width={48}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
