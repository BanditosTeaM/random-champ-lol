"use client";

import Image from "next/image";
import styles from "./dashboard.module.css";
import { useEffect, useReducer, useState } from "react";
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
  SET_EXCLUDED_CHAMPIOINS,
  initialState,
  reducer,
} from "@/store";
import championsData from "@data/champion.json";
import { ListRoles } from "@/components/ListRoles";

export default function Page() {
  const championValues = Object.values(championsData.data);
  const [searchValue, setSearchValue] = useState("");

  const initialStates = {
    ...initialState,
    excludedChampions: [...championValues.map((champion) => champion.name)],
  };

  const [state, dispatch] = useReducer(reducer, initialStates);

  const runes = getRandomRunes();
  const roles = getRandomRole(state.excludedRoles);

  useEffect(() => {
    if (!state.isRunning) return;

    const intervalId = setInterval(() => {
      dispatch({
        type: SET_INDEX,
        payload: (state.index + 1) % state.excludedChampions.length,
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
    }, 300);

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

    if (state.excludedChampions.length) {
      dispatch({
        type: SET_RANDOM_CHAMPIONS,
        payload: getRandomChampion(state.excludedChampions),
      });
      dispatch({ type: SET_IS_RUNNING, payload: true });
      dispatch({ type: SET_RANDOM_ROLES, payload: roles });
    }

    if (!state.excludedChampions.length) {
      alert("Ошибка: у вас убраны все чемпионы, выберите некоторых из них");
    }
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

  const onChangeChampion = (championName: string) => {
    if (!state.excludedChampions.includes(championName)) {
      dispatch({
        type: SET_EXCLUDED_CHAMPIOINS,
        payload: [...state.excludedChampions, championName],
      });
    }

    if (state.excludedChampions.includes(championName)) {
      dispatch({
        type: SET_EXCLUDED_CHAMPIOINS,
        payload: state.excludedChampions.filter(
          (champion: string) => champion !== championName
        ),
      });
    }
  };

  const handleButtonAll = () => {
    dispatch({
      type: SET_EXCLUDED_CHAMPIOINS,
      payload: [
        ...new Set([
          ...state.excludedChampions,
          ...championValues.map((champion) => champion.name),
        ]),
      ],
    });
  };

  const handleButtonClear = () => {
    dispatch({
      type: SET_EXCLUDED_CHAMPIOINS,
      payload: [],
    });
  };

  const filteredChampions = () => {
    if (searchValue === "") {
      return championValues;
    }

    if (searchValue !== "") {
      return championValues.filter((champion) =>
        champion.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles.randomContainer}>
          <h1>Champions List</h1>

          <button className={styles.searchButton} onClick={handleButtonClick}>
            Get random champion
          </button>

          <div className={styles.championWithSummoner}>
            {state.isRunning && state.champions.length > 0 && (
              <>
                <section>
                  <h2>{state.champions[state.index]?.name}</h2>
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${
                      state.champions[state.index]?.version
                    }/img/champion/${state.champions[state.index]?.image}`}
                    alt={state.champions[state.index]?.name}
                    width={state.champions[state.index]?.width}
                    height={state.champions[state.index]?.heigth}
                    className={styles.imageChampion}
                  />
                </section>
              </>
            )}

            {!state.isRunning && state.lastChampion && (
              <>
                <section>
                  <h2>{state.lastChampion.name}</h2>
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${state.lastChampion.version}/img/champion/${state.lastChampion.image}`}
                    alt={state.lastChampion.name}
                    width={state.lastChampion.width}
                    height={state.lastChampion.heigth}
                    className={styles.imageChampion}
                  />
                </section>
              </>
            )}

            <div className={styles.randomSummoners}>
              <RandomSummoners randomSummoner={state.randomSummoners} />
            </div>
            <RandomRole randomRole={state.randomRoles} />
          </div>

          {state.champions.length > 0 && (
            <>
              <RandomItems randomLegendaryItems={state.randomLegendaryItems} />
              <RandomRunes randomRunes={state.randomRunes} />
            </>
          )}
        </div>

        <div className={styles.searchContainer}>
          <div style={{ display: "flex", alignItems: "end" }}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Search champion"
                name="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchInput}
                autoComplete="off"
              />
              <label className={styles.searchLabel}>Search</label>
            </div>

            <ListRoles
              onChange={onChangeRole}
              excludedRoles={state.excludedRoles}
            />
          </div>

          <div className={styles.searchButtons}>
            <button className={styles.searchButton} onClick={handleButtonAll}>
              All
            </button>
            <button className={styles.searchButton} onClick={handleButtonClear}>
              Clear
            </button>
          </div>

          {filteredChampions()?.map((champion) => (
            <label key={champion.name}>
              <input
                type="checkbox"
                checked={state.excludedChampions.includes(champion.name)}
                onChange={() => onChangeChampion(champion.name)}
                className={styles.hiddenInput}
              />
              <div className={styles.imageContainer}>
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  width={champion.image.w}
                  height={champion.image.h}
                  className={styles.championList}
                />
              </div>
            </label>
          ))}
        </div>
      </section>
    </>
  );
}
