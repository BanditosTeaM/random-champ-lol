export const SET_RANDOM_CHAMPIONS = "SET_RANDOM_CHAMPIONS";
export const SET_LAST_CHAMPION = "SET_LAST_CHAMPION";
export const SET_IS_RUNNING = "SET_IS_RUNNING";
export const SET_INDEX = "SET_INDEX";
export const SET_RANDOM_LEGENDARY_ITEMS = "SET_RANDOM_LEGENDARY_ITEMS";
export const SET_RANDOM_RUNES = "SET_RANDOM_RUNES";
export const SET_RANDOM_SUMMONERS = "SET_RANDOM_SUMMONERS";
export const SET_RANDOM_ROLES = "SET_RANDOM_ROLES";

export const initialState = {
  champions: [],
  lastChampion: null,
  isRunning: false,
  index: 0,
  randomLegendaryItems: [],
  randomRunes: [],
  randomSummoners: [],
  randomRoles: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_RANDOM_CHAMPIONS:
      return { ...state, champions: action.payload };
    case SET_LAST_CHAMPION:
      return { ...state, lastChampion: action.payload };
    case SET_IS_RUNNING:
      return { ...state, isRunning: action.payload };
    case SET_INDEX:
      return { ...state, index: action.payload };
    case SET_RANDOM_LEGENDARY_ITEMS:
      return { ...state, randomLegendaryItems: action.payload };
    case SET_RANDOM_RUNES:
      return { ...state, randomRunes: action.payload };
    case SET_RANDOM_SUMMONERS:
      return { ...state, randomSummoners: action.payload };
    case SET_RANDOM_ROLES:
      return { ...state, randomRoles: action.payload };
    default:
      return state;
  }
};
