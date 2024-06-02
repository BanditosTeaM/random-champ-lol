import Image from "next/image";

import { Summoner } from "@/types";

interface SummonersProps {
  randomSummoner: Summoner[];
}

export const RandomSummoners = ({ randomSummoner }: SummonersProps) => {
  return (
    <section>
      <h1>Summoners</h1>
      {randomSummoner.map((summoner) => (
        <Image
          key={summoner.name}
          src={`https://ddragon.leagueoflegends.com/cdn/${summoner.version}/img/spell/${summoner.image}`}
          alt={summoner.name}
          width={summoner.width}
          height={summoner.height}
        />
      ))}
    </section>
  );
};
