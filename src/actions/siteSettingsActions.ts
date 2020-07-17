export const RECEIVE_SITE_SETTINGS_DATA = "RECEIVE_SITE_SETTINGS_DATA";
export const RETRIEVED_SITE_SETTINGS_DATA = "RETRIEVED_SITE_SETTINGS_DATA";
export const RECIEVE_CUSTOM_PAGES = "RECIEVE_CUSTOM_PAGES";
export const RETRIEVED_CUSTOM_PAGES = "RETRIEVED_CUSTOM_PAGES";

export function recieveSiteSettings() {
  return { type: RECEIVE_SITE_SETTINGS_DATA };
}

export function retreievedSiteSettings(data) {
  return { type: RETRIEVED_SITE_SETTINGS_DATA, data };
}

export function recieveCustomPages() {
  return { type: RECIEVE_CUSTOM_PAGES };
}

export function retreivedCustomPages(data) {
  return { type: RETRIEVED_CUSTOM_PAGES, data };
}
