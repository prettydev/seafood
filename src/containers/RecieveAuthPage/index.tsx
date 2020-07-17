import React, { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingWrapper";
import { callApi } from "../../apiHandler";
import * as _ from "lodash";

export default function RecieveAuthPage(props) {
  const { pathname, search } = props.location;

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const user = await callApi(`${pathname}${search}`);

    localStorage.setItem("jwtToken", user.jwt);
    localStorage.setItem("user", JSON.stringify(user.user));

    window.location.href = "/edit-profile";
  };

  return <LoadingSpinner />;
}
