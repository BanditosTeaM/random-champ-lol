import { Role } from "@/types";
import React from "react";

interface RandomRoleProps {
  randomRole: Role[];
}

export const RandomRole = ({ randomRole }: RandomRoleProps) => {
  return (
    <section>
      <h1>Role</h1>
      {randomRole.map((role) => (
        <div key={role.id}>{role.name}</div>
      ))}
    </section>
  );
};
