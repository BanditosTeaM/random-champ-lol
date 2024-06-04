import { Role } from "@/types";
import React from "react";
import roleData from "@data/roles.json";

interface RandomRoleProps {
  randomRole: Role[];
  onChange: (name: string) => void;
  excludedRoles: string[];
}

export const RandomRole = ({
  randomRole,
  onChange,
  excludedRoles,
}: RandomRoleProps) => {
  return (
    <section>
      {roleData.map((role) => (
        <label key={role.id}>
          <input
            type="checkbox"
            checked={excludedRoles.includes(role.name)}
            onChange={() => onChange(role.name)}
          />
          {role.name}
        </label>
      ))}

      <h1>Role</h1>
      {randomRole.map((role) => (
        <div key={role.id}>{role.name}</div>
      ))}
    </section>
  );
};
