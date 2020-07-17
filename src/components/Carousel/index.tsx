import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import { renderToString } from "react-dom/server";
// import "owl.carousel/dist/assets/owl.carousel.css";
import "../../styles/owl.carousel.css";
import "../../styles/owl.theme.default.css";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

interface Arrows {
  leftArrow: string;
  rightArrow: string;
}

let arrows: Arrows = {} as any;
arrows.leftArrow = renderToString(
  <img
    className="img-fluid"
    src={require("../../assets/images/left-arrow.svg")}
    alt="Scroll Left"
  />
);
arrows.rightArrow = renderToString(
  <img
    className="img-fluid"
    src={require("../../assets/images/right-arrow.svg")}
    alt="Scroll Right"
  />
);

function Carousel() {
  const speciesData = useSelector((state: any) => state.species.data);

  const speciesElement = (data) => {
    return (
      <div
        className="d-flex justify-content-around"
        key={data.id}
        onClick={() => (window.location.href = `/species/${data.slug}`)}
      >
        <div className="recipes-species-box d-flex flex-column justify-content-center ifakelink">
          <div
            className="carousel-item-image"
            style={{ backgroundImage: `url(${data.coverImage.url})` }}
          />
          <h3>{data.name}</h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="recipes-species-sec">
        <div className="container-md container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="recipes-species-inner">
                <h2>Great seafood Recipes by Species</h2>
                <div className="recipes-species-detail">
                  {speciesData.length > 0 && (
                    <OwlCarousel
                      className="recipes-owl owl-carousel owl-theme"
                      loop
                      nav
                      navText={[arrows.leftArrow, arrows.rightArrow]}
                      center={false}
                      responsive={{
                        0: {
                          items: 1,
                          nav: true,
                          dots: true,
                          mouseDrag: true,
                        },
                        600: {
                          items: 3,
                          nav: true,
                          dots: false,
                          mouseDrag: false,
                        },
                        1000: {
                          items: 3,
                          margin: 0,
                          nav: true,
                          loop: true,
                          dots: false,
                          mouseDrag: false,
                        },
                        1200: {
                          margin: 0,
                          items: 4,
                          loop: true,
                          dots: false,
                          mouseDrag: false,
                        },
                      }}
                    >
                      {speciesData.map((item) => speciesElement(item))}
                    </OwlCarousel>
                  )}
                  <div className="recipes-owl owl-carousel owl-theme"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withRouter(Carousel);
