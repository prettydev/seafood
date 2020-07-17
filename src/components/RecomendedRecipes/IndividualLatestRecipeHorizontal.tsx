import * as React from "react";
import StarRating from "../Common/StarRating";
import HeartIcon from "../Common/HeartIcon";
import { withRouter } from "react-router-dom";

class IndividualLatestRecipeHorizontal extends React.Component<any, {}> {
  public render(): JSX.Element {
    return (
      <div
        className="row"
        style={{
          backgroundColor: "white",
          minHeight: "250px",
          maxHeight: "270px",
          minWidth: "400px",
        }}
      >
        <div className="col" style={{ padding: 0 }}>
          <img
            src={this.props.imageLink}
            alt=""
            style={{ minWidth: "200px" }}
          />
          <img
            src="https://media-exp1.licdn.com/dms/image/C4E03AQEawrNobW6JgA/profile-displayphoto-shrink_200_200/0?e=1591833600&v=beta&t=WgD_EhoJlTGgYHfjYjn0LDEC76ayeAKGTFCGgmo4uD4"
            style={{
              borderRadius: "250px",
              width: "90px",
              position: "absolute",
              top: "15px",
              left: "210px",
              border: "solid #F15A24 2px",
            }}
          />
          <HeartIcon
            recipeId={this.props.recipeId}
            enabled={this.props.isLiked}
            isLeft
          />
        </div>
        <div className="text-box col">
          <div className="p-2">
            <h4 className="p-2 ml-4">
              <a
                // onClick={() => this.props.history.push(this.props.link)}
                href={this.props.link}
                style={{ color: "#3D659E" }}
              >
                {this.props.title}
              </a>
            </h4>
            <p
              className="ml-4"
              style={{
                fontSize: "15px",
                lineHeight: "normal",
                color: "#959595",
              }}
            >
              {this.props.blurb}
            </p>
          </div>
          <div>
            <button
              className="recipe-button"
              style={{ marginTop: "70px" }}
              onClick={() => {
                //console.log("Load More...")
              }}
            >
              Click for Recipe
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(IndividualLatestRecipeHorizontal);
