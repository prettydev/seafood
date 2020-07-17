import * as React from "react";
import StarRating from "../Common/StarRating";
import * as _ from "lodash";
import renderHTML from "react-render-html";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import RatingModal from "../RatingModal";
import recipesReducer from "../../reducers/recipesReducer";
import callApi from "../../apiHandler";

export default class ReviewSection extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedReviewStar: 5,
      reviewLength: 5,
      reviews: [],
      openModal: false,
    };

    this.generateReviewBlocks = this.generateReviewBlocks.bind(this);
  }

  componentDidMount() {
    this.generateReviewBlocks();
  }

  isActive(i) {
    if (this.state.selectedReviewStar === i) {
      return "active";
    }
  }

  generateReviewBlocks() {
    let blocks: any[] = [];
    for (var i = 1; i < 6; i++) {
      blocks.push(i);
    }
    return blocks
      .map((v, i) => (
        <li
          key={`blocks_${i}`}
          className={this.isActive(v)}
          onClick={() =>
            this.setState({ selectedReviewStar: v, reviewLength: 5 })
          }
        >
          <a>
            {v}
            <img src={require("../../assets/images/star-blank.svg")} alt="" />
          </a>
        </li>
      ))
      .reverse();
  }

  generateReviews() {
    const filteredArray = _.filter(
      this.props.reviews,
      (item) =>
        item.rating === this.state.selectedReviewStar &&
        item.reviewContent.length > 0
    ).slice(0, this.state.reviewLength);

    return filteredArray.map((review, i) => {
      const { user } = review;
      const displayName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.email;
      return (
        <div className="reviews-recipes-box" key={`review_${i}`}>
          <div className="reviews-recipes-box-left">
            {review.user?.image ? (
              <div className="image-holder">
                <img className="img-fluid" src={review.user.image.url} alt="" />
              </div>
            ) : (
              <div className="image-holder">
                <img
                  className="img-fluid"
                  src={require("../../assets/images/reviews-user-img.png")}
                  alt=""
                />
              </div>
            )}
            <div className="text-box">
              <div className="retting">
                {user && <h3>{displayName}</h3>}
                <StarRating
                  value={review.rating}
                  editing={false}
                  showCount={false}
                />
              </div>
              {review.reviewContent && renderHTML(review.reviewContent)}
              //TODO: Strategy for handling extra text since reviews are rich
              text?{" "}
              {/* {review.reviewContent.length > 100 && <a href="#">READ MORE</a>} */}
            </div>
          </div>
          {review.image && (
            <div className="reviews-recipes-box-right">
              <div className="image-holder">
                <img
                  src={review.image.url}
                  alt=""
                  style={{ maxHeight: "200px" }}
                />
              </div>
            </div>
          )}
        </div>
      );
    });
  }

  render() {
    const filteredArray = _.filter(
      this.props.reviews,
      (item) => item.rating === this.state.selectedReviewStar
    );
    const jwtToken = localStorage.getItem("jwtToken");
    return (
      <>
        <section className="reviews-recipes-sec">
          <div className="container-md container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="title">
                  <div className="title-left">
                    <h3>REVIEWS</h3>
                    <ul>{this.generateReviewBlocks()}</ul>
                  </div>
                  <div className="title-right">
                    {!!jwtToken && (
                      <a
                        data-toggle="modal"
                        data-target="#review"
                        className="text-white"
                        onClick={() => this.setState({ openModal: true })}
                      >
                        RATE THIS RECIPE
                      </a>
                    )}
                  </div>
                </div>
                <div className="reviews-recipes-inner">
                  {this.generateReviews()}
                </div>
                {filteredArray.length > this.state.reviewLength && (
                  <button
                    onClick={() =>
                      this.setState({
                        reviewLength: this.state.reviewLength + 5,
                      })
                    }
                  >
                    More
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <RatingModal
          id={this.props.recipe.id}
          title={this.props.recipe.title}
          openModal={this.state.openModal}
          closeModal={async () => {
            const newReviews = await callApi(
              `/recipe-ratings?recipe.slug_eq=${this.props.slug}`
            );
            this.setState({ openModal: false, reviews: newReviews });
          }}
        />
      </>
    );
  }
}
