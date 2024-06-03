import itemsData from "@data/item.json";
import { Item } from "@/types";

const excludedItems = [
  "Atma's Reckoning",
  "Stormrazor",
  "Deathfire Grasp",
  "Sword of the Divine",
  "Lifeline",
  "Innervating Locket",
  "The Golden Spatula",
  "Hubris<br>",
  "Guardian's Hammer",
  "Guardian's Orb",
  "Guardian's Horn",
  "Guardian's Blade",
  "Guardian's Shroud",
  "Guardian's Amulet",
  "Guardian's Blade",
  "Guardian's Dirk",
  "Spellthief's Edge",
  "Steel Shoulderguards",
  "Relic Shield",
  "Spectral Sickle",
  "World Atlas",
  "Obsidian Edge",
];

const specialItems = new Set([
  "Mortal Reminder",
  "Morellonomicon",
  "Chempunk Chainsword",
]);

const boots = ["3047", "3009", "3010", "3020", "3111", "3158", "3006"];

export function getRandomItems(role: string): Item[] {
  const itemsEntries = Object.entries(itemsData.data);

  const filteredLegendaryItems = itemsEntries.filter(
    ([, item]) =>
      item?.depth === 3 &&
      item?.inStore !== false &&
      !excludedItems.includes(item?.name)
  );

  const filteredStartItems = itemsEntries.filter(([, item]) => {
    if (role === "Support") {
      return (
        Array.isArray(item.tags) &&
        (item.tags as string[]).includes("Lane") &&
        (item.tags as string[]).includes("GoldPer") &&
        item?.inStore !== false &&
        !item?.stacks &&
        !excludedItems.includes(item?.name)
      );
    }

    if (role === "Jungle") {
      return (
        Array.isArray(item.tags) &&
        item?.inStore !== false &&
        !item?.stacks &&
        (item.tags as string[]).includes("Jungle") &&
        !(item.tags as string[]).includes("Lane") &&
        !excludedItems.includes(item?.name)
      );
    }

    return (
      Array.isArray(item.tags) &&
      (item.tags as string[]).includes("Lane") &&
      item?.inStore !== false &&
      !item?.stacks &&
      !(item.tags as string[]).includes("Vision") &&
      !(item.tags as string[]).includes("Active") &&
      !(item.tags as string[]).includes("GoldPer") &&
      !excludedItems.includes(item?.name)
    );
  });

  const formattedStartItems = filteredStartItems.map(([, item]) => ({
    version: itemsData.version,
    name: item.name,
    image: item.image.full,
    width: item.image.w,
    height: item.image.h,
  }));

  const formattedLegendaryItems = filteredLegendaryItems.map(([, item]) => ({
    version: itemsData.version,
    name: item.name,
    image: item.image.full,
    width: item.image.w,
    height: item.image.h,
  }));

  const selectedLegendaryItems = [...formattedLegendaryItems];
  const finalSelectedItems: Item[] = [];
  const selectedSpecialItems = new Set<string>();

  const randomBootIndex = Math.floor(Math.random() * boots.length);
  const selectedBootEntry = itemsEntries.find(
    ([key]) => key === boots[randomBootIndex]
  );

  if (selectedBootEntry) {
    const [, bootItem] = selectedBootEntry;

    finalSelectedItems.push({
      version: itemsData.version,
      name: bootItem.name,
      image: bootItem.image.full,
      width: bootItem.image.w,
      height: bootItem.image.h,
    });
  }

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(
      Math.random() * selectedLegendaryItems.length
    );
    const selectedItem = selectedLegendaryItems[randomIndex];
    selectedLegendaryItems.splice(randomIndex, 1);

    if (specialItems.has(selectedItem.name)) {
      if (
        !selectedSpecialItems.has(selectedItem.name) &&
        selectedSpecialItems.size < 1
      ) {
        finalSelectedItems.push(selectedItem);
        selectedSpecialItems.add(selectedItem.name);
      }
    } else {
      finalSelectedItems.push(selectedItem);
    }
  }
  const selectedStartItems = [...formattedStartItems];

  const randomIndexStart = Math.floor(
    Math.random() * selectedStartItems.length
  );

  const selectedStartEntry = selectedStartItems[randomIndexStart];

  if (selectedStartEntry) {
    finalSelectedItems.push(selectedStartEntry);
  }

  return finalSelectedItems;
}
