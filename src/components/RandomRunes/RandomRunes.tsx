import Image from "next/image";

import { Rune } from "@/types";

interface RunesProps {
  randomRunes: Rune[];
}

export const RandomRunes = ({ randomRunes }: RunesProps) => {
  return (
    <>
      <section>
        <h1>Runes</h1>
        <div>
          {randomRunes.map((rune) => (
            <div key={rune?.id}>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune?.icon}`}
                alt={rune?.name}
                height={48}
                width={48}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
