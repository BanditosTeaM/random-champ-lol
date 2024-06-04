"use client";

import Image from "next/image";
import { useEffect, useReducer } from "react";
import { RandomItems } from "@/components/RandomItems";
import { RandomRunes } from "@/components/RandomRunes";
import { RandomRole } from "@/components/RandomRole";
import { RandomSummoners } from "@/components/RandomSummoners";
import {
  getRandomRunes,
  getRandomSummoners,
  getRandomRole,
  getRandomItems,
  getRandomChampion,
} from "@utils";
import {
  SET_RANDOM_CHAMPIONS,
  SET_LAST_CHAMPION,
  SET_IS_RUNNING,
  SET_INDEX,
  SET_RANDOM_LEGENDARY_ITEMS,
  SET_RANDOM_RUNES,
  SET_RANDOM_SUMMONERS,
  SET_RANDOM_ROLES,
  SET_EXCLUDED_ROLES,
  initialState,
  reducer,
} from "@/store";

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const runes = getRandomRunes();
  const roles = getRandomRole(state.excludedRoles);

  useEffect(() => {
    if (!state.isRunning) return;

    const intervalId = setInterval(() => {
      dispatch({
        type: SET_INDEX,
        payload: (state.index + 1) % state.champions.length,
      });

      dispatch({ type: SET_RANDOM_RUNES, payload: runes });

      dispatch({
        type: SET_RANDOM_LEGENDARY_ITEMS,
        payload: getRandomItems(state.randomRoles[0]?.name),
      });

      dispatch({
        type: SET_RANDOM_SUMMONERS,
        payload: getRandomSummoners(state.randomRoles[0]?.name),
      });
    }, 150);

    setTimeout(() => {
      clearInterval(intervalId);
      dispatch({
        type: SET_LAST_CHAMPION,
        payload: state.champions[state.index],
      });
      dispatch({ type: SET_IS_RUNNING, payload: false });
    }, 2000);
  });

  const handleButtonClick = () => {
    dispatch({
      type: SET_LAST_CHAMPION,
      payload: null,
    });

    dispatch({ type: SET_IS_RUNNING, payload: true });
    dispatch({
      type: SET_RANDOM_CHAMPIONS,
      payload: getRandomChampion(),
    });
    dispatch({ type: SET_RANDOM_ROLES, payload: roles });
  };

  const onChangeRole = (roleName: string) => {
    if (!state.excludedRoles.includes(roleName)) {
      dispatch({
        type: SET_EXCLUDED_ROLES,
        payload: [...state.excludedRoles, roleName],
      });
    }

    if (state.excludedRoles.includes(roleName)) {
      dispatch({
        type: SET_EXCLUDED_ROLES,
        payload: state.excludedRoles.filter(
          (role: string) => role !== roleName
        ),
      });
    }
  };

  return (
    <>
      <section>
        <h1>Champions List</h1>

        <RandomRole
          randomRole={state.randomRoles}
          onChange={onChangeRole}
          excludedRoles={state.excludedRoles}
        />
        <button onClick={handleButtonClick}>Get random champion</button>

        {state.isRunning && state.champions.length > 0 && (
          <>
            <div>{state.champions[state.index]?.name}</div>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${
                state.champions[state.index]?.version
              }/img/champion/${state.champions[state.index]?.image}`}
              alt={state.champions[state.index]?.name}
              width={state.champions[state.index]?.width}
              height={state.champions[state.index]?.heigth}
            />
          </>
        )}

        {!state.isRunning && state.lastChampion && (
          <>
            <div>{state.lastChampion.name}</div>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${state.lastChampion.version}/img/champion/${state.lastChampion.image}`}
              alt={state.lastChampion.name}
              width={state.lastChampion.width}
              height={state.lastChampion.heigth}
            />
          </>
        )}

        <RandomItems randomLegendaryItems={state.randomLegendaryItems} />
        <RandomSummoners randomSummoner={state.randomSummoners} />
        <RandomRunes randomRunes={state.randomRunes} />
      </section>
    </>
  );
}
