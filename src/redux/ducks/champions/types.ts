export enum ChampionsType {
  CHAMPION_REQUEST = "@champion/champion_request",
  CHAMPION_SUCCESS = "@champion/champion_success",
  CHAMPION_FAILURE = "@champion/champion_failure",
  CURRENT_CHAMPION_REQUEST = "@champion/current_champion_request",
  CURRENT_CHAMPION_SUCCESS = "@champion/current_champion_success",
  CURRENT_CHAMPION_FAILURE = "@champion/current_champion_failure",
}

export type Champions = {
  id: string;
  name: string;
  key: string;
  title: string;
  blurb: string;
};

export type Skins = {
  id: string;
  name: string;
  chromas: boolean;
};

export type Spells = {
  id: string;
  name: string;
  description: string;
};

export type Passive = {
  name: string;
  description: string;
  image: {
    full: string;
  };
};

export type SelectedChampion = {
  id: string;
  name: string;
  key: string;
  title: string;
  skins: Skins[];
  lore: string;
  spells: Spells;
  passive: Passive;
};

export type ChampionsState = {
  readonly champions: Champions[];
  readonly currentChampion: SelectedChampion;
  readonly error: {
    message: string;
    hasError: boolean;
  };
  readonly loading: boolean;
};
