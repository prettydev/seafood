import * as React from "react";
import StarRating from "../Common/StarRating";
import HeartIcon from "../Common/HeartIcon";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import renderHTML from "react-render-html";

interface Props {
  title: string;
  id: number;
  starCount: number;
  imageLink: string;
  objLink: string;
  blurb: string;
  routeAction: () => any;
  isLiked: boolean;
  rawContent: any;
}

export default class IndividualRecipe extends React.Component<Props, {}> {
  routeFunction = () => {
    window.location.href = this.props.objLink;
  };

  public render(): JSX.Element {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6">
        <HeartIcon recipeId={this.props.id} enabled={this.props.isLiked} />
        <div className="delicious-recipes-box">
          <div
            onClick={this.routeFunction}
            className="image-holder background-image ifakelink"
            style={{
              backgroundImage: `url(${this.props.imageLink})`,
            }}
          >
          </div>
          <div className="text-box">
            <div className="text-inner">
              <h3 onClick={this.routeFunction} className="ifakelink">{this.props.title}</h3>
              <div onClick={this.routeFunction} className="ifakelink">
                {this.props.blurb &&
                  <p>{this.props.blurb}</p>
                }
              </div>
              <StarRating
                value={this.props.starCount}
                editing={true}
                onStarHover={undefined}
                onStarHoverOut={undefined}
                recipeId={this.props.id}
              />
            </div>
            <a href={this.props.objLink}>CLICK FOR RECIPE</a>
          </div>
        </div>
      </div>
    );
  }
}
