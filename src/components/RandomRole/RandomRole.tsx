import { Role } from "@/types";
import React from "react";
import Image from "next/image";
import styles from "./RandomRole.module.css";

interface RandomRoleProps {
  randomRole: Role[];
}

export const RandomRole = ({ randomRole }: RandomRoleProps) => {
  return (
    <section>
      {randomRole.map((role) => (
        <div key={role.id} className={styles.randomRole}>
          <Image
            title={role.name}
            src={`/assets/roles/${role.image}`}
            alt={role.name}
            width={48}
            height={48}
          />
        </div>
      ))}
    </section>
  );
};
