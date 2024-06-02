import runesData from "@data/runes.json";
import { Rune } from "@/types";

export function getRandomRunes(): Rune[] {
  const newRunes: Rune[] = [];
  const usedIndexes: number[] = [];
  const randomNumber = Math.floor(Math.random() * 3) + 4;

  for (let i = 1; i <= 2; i++) {
    let randomIndex: number;

    do {
      randomIndex = Math.floor(Math.random() * runesData.length);
    } while (usedIndexes.includes(randomIndex));

    usedIndexes.push(randomIndex);

    runesData[randomIndex].slots.forEach((slot) => {
      const randomIndexRune = Math.floor(Math.random() * slot.runes.length);
      const randomRune = slot.runes[randomIndexRune];
      newRunes.push(randomRune);
    });
  }

  newRunes.splice(4, 1);
  newRunes.splice(randomNumber, 1);

  return newRunes;
}
