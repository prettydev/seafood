import { receiveHomeData, retrievedHomeData } from "./homeActions";
import { receiveSpeciesData, retrievedSpeciesData } from "./speciesActions";
import {
  recieveSiteSettings,
  retreievedSiteSettings,
  recieveCustomPages,
  retreivedCustomPages,
} from "./siteSettingsActions";
import { useDispatch } from "react-redux";
import callApi from "../apiHandler";
import { receiveExpertsData, retrievedExpertsData } from "./expertsActions";

const CallAndRecieve = (
  route: string,
  recieveAction: () => any,
  action: (any) => any
) => {
  const dispatch = useDispatch();
  dispatch(recieveAction());
  callApi(route)
    .then((response) => {
      dispatch(action(response));
    })
    .catch((e) => {
      dispatch(action({}));
    });
};

export const CallAll = () => {
  CallAndRecieve("/site-settings", recieveSiteSettings, retreievedSiteSettings);
  CallAndRecieve("/home-page", receiveHomeData, retrievedHomeData);
  CallAndRecieve("/all_species", receiveSpeciesData, retrievedSpeciesData);
  CallAndRecieve("/experts", receiveExpertsData, retrievedExpertsData);
  CallAndRecieve("/site-menu", recieveCustomPages, retreivedCustomPages);
};
