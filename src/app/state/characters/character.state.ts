import { Person } from "../../services/swapi-service";

export interface CharacterState {
  characters: Person[];
  loading: boolean;
}

export const initialState: CharacterState = {
  characters: [],
  loading: false,
};