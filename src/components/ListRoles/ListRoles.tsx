import React from "react";
import roleData from "@data/roles.json";
import Image from "next/image";
import styles from "./ListRoles.module.css";

interface RandomRoleProps {
  onChange: (name: string) => void;
  excludedRoles: string[];
}

export const ListRoles = ({ onChange, excludedRoles }: RandomRoleProps) => {
  return (
    <section className={styles.checkboxSection}>
      {roleData.map((role) => (
        <label key={role.id} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={!excludedRoles.includes(role.name)}
            onChange={() => onChange(role.name)}
          />
          <div className={styles.imageRole}>
            <Image
              src={`/assets/roles/${role.image}`}
              alt={role.name}
              width={40}
              height={40}
              className={styles.checkboxImage}
            />
          </div>
        </label>
      ))}
    </section>
  );
};
