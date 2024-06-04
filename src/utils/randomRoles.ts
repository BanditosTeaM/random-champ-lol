import roleData from "@/data/roles.json";
import { Role } from "@/types";

export const getRandomRole = (excludedRoles: string[] = []): Role[] => {
  const filteredRoles = roleData.filter(
    (role) => !excludedRoles.includes(role.name)
  );

  if (filteredRoles.length === 0) {
    return [];
  }

  const randomIndex = Math.floor(Math.random() * filteredRoles.length);
  return [filteredRoles[randomIndex]];
};
