import * as React from "react";
import StarRating from "../Common/StarRating";
import HeartIcon from "../Common/HeartIcon";
import { withRouter } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import renderHTML from "react-render-html";

interface Props {
  title: string;
  id: string;
  starValue: number;
  link: string;
  imageLink: string;
  blurb: string;
  rawContent: any;
}

class IndividualRecipeHorizontal extends React.Component<any, {}> {
  public render(): JSX.Element {
    return (
      <div className="banner-recipes-box ifakelink">
        <div className="image-holder" onClick={()=>window.location.href=this.props.link}>
          <img src={this.props.imageLink} style={{ maxHeight: "166px" }} />
        </div>
        <div className="text-box">
          <h4>
            <a href={this.props.link} style={{ textDecoration: "none" }}>
              {this.props.title}
            </a>
          </h4>
          <a href={this.props.link}>
            <div>
              {this.props.blurb ? (
                  <p>{this.props.blurb}</p>
              ) : (
                <p></p>
              )}
            </div>
          </a>
          <StarRating
            value={this.props.starValue}
            editing={true}
            // onStarClick={(y) => {}}
            onStarHover={undefined}
            onStarHoverOut={undefined}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(IndividualRecipeHorizontal);
