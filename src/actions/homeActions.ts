export const RECEIVE_HOME_DATA = 'RECEIVE_HOME_DATA';
export const RETRIEVED_HOME_DATA = 'RETRIEVED_HOME_DATA';

export function receiveHomeData() {
    return {type: RECEIVE_HOME_DATA}
}

export function retrievedHomeData(data) {
    return {type: RETRIEVED_HOME_DATA, data}
}






