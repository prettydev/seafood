import React, { Children } from "react";
import LoadingOverlay from "react-loading-overlay";

export default function LoadingSpinner(props) {
  return (
    <LoadingOverlay
      active
      spinner
      text="Loading..."
      styles={{
        overlay: (base) => ({
          ...base,
          background: "#fff",
        }),
        wrapper: {
          height: "100vh",
          width: "100vw",
        },
        spinner: (base) => ({
          ...base,
          width: "100px",
          "& svg circle": {
            stroke: "#7CADD4",
          },
        }),
      }}
    />
  );
}

export function LoadingWrapper(props) {
  return (
    <>
      {props.isLoading && <LoadingSpinner />}
      <div className={props.isLoading ? "d-none" : ""}>{props.children}</div>
    </>
  );
}
