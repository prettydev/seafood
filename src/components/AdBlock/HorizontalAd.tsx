import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import callApi from "../../apiHandler";
import { hostName } from "../../environment";

export default function HorizontalAd() {
  const [ad, setAd] = useState({} as any);
  const grabAd = async () => {
    const response = await callApi(`/ads`);
    setAd(response);
  };

  useEffect(() => {
    grabAd();
  }, []);

  return (
    <div className="container-md container-fluid">
      <div className="row">
        <div className="col-12">
          <div
            className="add-holder"
            onClick={() => {
              window.open(`${hostName}/ad/${ad.id}`, "_blank");
            }}
          >
            <img src={ad?.image?.url} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}
