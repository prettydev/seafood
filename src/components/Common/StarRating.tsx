import React, { Component, ComponentType } from "react";
import * as _ from "lodash";
import { postApi } from "../../apiHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

type Props = {
  starCount?: number;
  value: number;
  editing: boolean;
  showCount?: boolean;
  onStarClick?: (e: any) => number;
  onStarHoverOut?: Function | undefined;
  onStarHover?: Function | undefined;
  recipeId?: number | undefined;
  center?: boolean | undefined;
};

type State = {
  value: number;
  isOpen: boolean;
};

type StarValue = {
  starValue: number;
};

export default class StarRating extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isOpen: false,
    };

    this.runExternalFunction = this.runExternalFunction.bind(this);
  }

  static defaultProps = {
    starCount: 5 as number,
    value: 0 as number,
    showCount: true,
  };

  onChange(inputValue) {
    const { editing, value } = this.props;

    if (!editing) {
      return;
    }

    if (value != null) {
      return;
    }

    this.setState({ value: inputValue });
  }

  public onStarClick: React.MouseEventHandler<HTMLImageElement> = (e) => {
    e.preventDefault();
    const { editing } = this.props;

    if (!editing) {
      return;
    }
    let val = Number(e.currentTarget.id);
    const jwtToken = localStorage.getItem("jwtToken");
    if (
      !_.isEmpty(jwtToken) &&
      val !== this.state.value &&
      this.props.recipeId
    ) {
      postApi(`/recipe-ratings/create/${this.props.recipeId}`, {
        rating: val,
        reviewContent: "",
      }).then(() =>
        this.setState({
          value: val,
        })
      );
    }
    if (_.isEmpty(jwtToken)) {
      MySwal.fire({
        title: "Rate Recipe",
        text: "You must be logged in to use this feature",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sign Up",
        reverseButtons: true,
        preConfirm: () => {
          window.location.href = "/join";
        },
      });
    }
  };

  onStarHover(index, value, name, e) {
    e.stopPropagation();

    const { onStarHover, editing } = this.props;

    if (!editing) {
      return;
    }

    onStarHover && onStarHover(index, value, name, e);
  }

  onStarHoverOut(index, value, name, e) {
    e.stopPropagation();

    const { onStarHoverOut, editing } = this.props;

    if (!editing) {
      return;
    }

    onStarHoverOut && onStarHoverOut(index, value, name, e);
  }

  renderStars() {
    const { value } = this.props;
    const { value: stateValue } = this.state;

    // populate stars
    let starNodes: JSX.Element[] = [];

    const valueToUse = stateValue > 0 ? stateValue : value;

    for (let i = 1; i <= this.props.starCount!; i++) {
      const id = `sc_${i}`;
      starNodes.push(this.renderIcon(i <= valueToUse, i));
    }

    return starNodes.length ? starNodes : null;
  }

  runExternalFunction(e) {
    if (this.props.onStarClick) {
      const val = this.props.onStarClick(e);
      this.setState({ value: val });
    }
  }

  renderIcon(value, index) {
    const { onStarClick } = this.props;
    if (value === true) {
      return (
        <li key={index} className="d-inline">
          <button className="starbtn">
            <img
                id={index}
                src={require("../../assets/images/star-icon.svg")}
                onClick={onStarClick ? this.runExternalFunction : this.onStarClick}
                defaultValue={index}
            />
          </button>
        </li>
      );
    }
    return (
      <li key={index} className="d-inline">
        <button className="starbtn">
          <img
              id={index}
              src={require("../../assets/images/star-blank.svg")}
              onClick={onStarClick ? this.runExternalFunction : this.onStarClick}
              defaultValue={index}
          />
        </button>
      </li>
    );
  }

  renderCount() {
    const { showCount } = this.props;
    if (showCount) {
      return <span>{this.state.value || this.props.value}</span>;
    }
  }

  public render(): JSX.Element {
    let className = "ratting";
    if(this.props.center){
     className = "ratting centerstars"
    }
    return (
        <>
          <div className={className}>
            <ul>{this.renderStars()}</ul>
            {this.props.showCount && (
                <span>{this.state.value || this.props.value}</span>
            )}
          </div>
        </>
    );
  }
}
