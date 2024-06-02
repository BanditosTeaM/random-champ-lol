"use client";

import championsData from "@data/champion.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RandomItems } from "@/components/RandomItems";
import { RandomRunes } from "@/components/RandomRunes";
import { getRandomItems } from "@utils/randomItems";
import { getRandomRunes } from "@utils/randomRunes";
import { getRandomSummoners } from "@utils/randomSummoners";
import { RandomSummoners } from "@/components/RandomSummoners";
import { Champion, Item, Rune, Summoner } from "@/types";

export default function Page() {
  const championEntries = Object.entries(championsData.data);
  const [champions, setRandomChampions] = useState<Champion[]>([]);
  const [lastChampion, setLastChampion] = useState<Champion | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [index, setIndex] = useState(0);

  const [randomLegendaryItems, setRandomLegendaryItems] = useState<Item[]>([]);
  const [randomRunes, setRandomRunes] = useState<Rune[]>([]);
  const [randomSummoners, setRandomSummoners] = useState<Summoner[]>([]);

  const items = getRandomItems();
  const runes = getRandomRunes();
  const summoners = getRandomSummoners();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % champions.length);
        setRandomLegendaryItems(items);

        setRandomRunes(runes);

        if (summoners !== undefined) {
          setRandomSummoners(summoners);
        }
      }, 150);

      setTimeout(() => {
        clearInterval(intervalId);
        setLastChampion(champions[index]);
        setIsRunning(false);
      }, 2000);
    }
  });

  const handleButtonClick = () => {
    setLastChampion(null);
    const randomItem = [];

    for (let index = 0; index < 30; index++) {
      const randomIndex = Math.floor(Math.random() * championEntries.length);
      const [, champion] = championEntries[randomIndex];
      const selectedChampion = {
        version: champion.version,
        name: champion.name,
        image: champion.image.full,
        width: champion.image.w,
        heigth: champion.image.h,
      };

      randomItem.push(selectedChampion);
    }

    setIsRunning(true);
    setRandomChampions(randomItem);
  };

  return (
    <>
      <section>
        <h1>Champions List</h1>
        <button onClick={handleButtonClick}>Get random champion</button>

        {isRunning && champions.length > 0 && (
          <>
            <div>{champions[index]?.name}</div>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${champions[index]?.version}/img/champion/${champions[index]?.image}`}
              alt={champions[index]?.name}
              width={champions[index]?.width}
              height={champions[index]?.heigth}
            />
          </>
        )}

        {!isRunning && lastChampion && (
          <>
            <div>{lastChampion.name}</div>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${lastChampion.version}/img/champion/${lastChampion.image}`}
              alt={lastChampion.name}
              width={lastChampion.width}
              height={lastChampion.heigth}
            />
          </>
        )}

        <RandomItems randomLegendaryItems={randomLegendaryItems} />
        <RandomSummoners randomSummoner={randomSummoners} />
        <RandomRunes randomRunes={randomRunes} />
      </section>
    </>
  );
}
