import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import callApi from "../../apiHandler";

function TrendingRow({ history }) {
  const [trending, setTrending] = useState([] as any);

  useEffect(() => {
    callTrending();
  }, []);

  const callTrending = async () => {
    const trending = await callApi("/trending");
    setTrending(trending);
  };

  const elipsisHandler = (word: string, desiredLength: number) => {
    if (word) {
      let response = word;
      if (word.length >= desiredLength) {
        response = word.slice(0, desiredLength) + "...";
      }

      return response;
    }
  };

  const generateTrending = (item, index) => {
    const { coverImage, images, title, subtitle, slug, type } = item;
    const prefix = type === "posts" ? "post" : "recipe";
    const url = type === "posts" ? coverImage.url : images[0].url;
    return (
      <div
        className="col-lg-3 col-sm-6"
        key={"trending_" + index}
        onClick={() => history.push(`/${prefix}/${slug}`)}
      >
        <div
          className="trending-box ifakelink"
          style={{ height: "100%", maxHeight: "375px" }}
        >
          <div
            className="image-holder background-image"
            style={{
              backgroundImage: `url(${url})`,
              minHeight: "300px",
            }}
          />
          <div className="text-box">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="trending-sec">
        <div className="container-md container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <h2>TRENDING</h2>
              </div>
              <div className="trending-inner">
                <div className="row row-eq-height">
                  {trending.map((item, index) => generateTrending(item, index))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withRouter(TrendingRow);
