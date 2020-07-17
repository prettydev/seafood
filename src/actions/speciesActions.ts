export const RECEIVE_SPECIES_DATA = "RECEIVE_SPECIES_DATA";
export const RETRIEVED_SPECIES_DATA = "RETRIEVED_SPECIES_DATA";

export function receiveSpeciesData() {
  return { type: RECEIVE_SPECIES_DATA };
}

export function retrievedSpeciesData(data) {
  return { type: RETRIEVED_SPECIES_DATA, data };
}
