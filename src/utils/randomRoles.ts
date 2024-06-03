import roleData from "@/data/roles.json";
import { Role } from "@/types";

export const getRandomRole = (): Role[] => {
  if (!roleData || roleData.length === 0) {
    return [];
  }

  const randomIndex = Math.floor(Math.random() * roleData.length);
  return [roleData[randomIndex]];
};
