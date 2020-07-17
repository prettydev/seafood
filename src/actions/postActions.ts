export const RECEIVE_POSTS_DATA = "RECEIVE_POSTS_DATA";
export const RETRIEVED_POSTS_DATA = "RETRIEVED_POSTS_DATA";

export function receivePostsData() {
  return { type: RECEIVE_POSTS_DATA };
}

export function retrievedPostsData(data) {
  return { type: RETRIEVED_POSTS_DATA, data };
}
