export const RECEIVE_EXPERTS_DATA = "RECEIVE_EXPERTS_DATA";
export const RETRIEVED_EXPERTS_DATA = "RETRIEVED_EXPERTS_DATA";

export function receiveExpertsData() {
  return { type: RECEIVE_EXPERTS_DATA };
}

export function retrievedExpertsData(data) {
  return { type: RETRIEVED_EXPERTS_DATA, data };
}
