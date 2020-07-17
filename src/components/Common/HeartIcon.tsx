import React, { Component, ComponentType } from "react";
import { url } from "inspector";
import callApi, { postApi } from "../../apiHandler";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

type Props = {
  enabled: boolean;
  hover: boolean;
  isLeft: boolean;
  recipeId: number;
};

type State = {
  enabled: boolean;
  hover: boolean;
  isLeft: boolean;
  isOpen: boolean;
};

class HeartIcon extends Component<Props, State> {
  static defaultProps = {
    enabled: false,
    hover: false,
    isLeft: false,
  };

  state = {
    enabled: this.props.enabled,
    hover: this.props.hover,
    isLeft: this.props.isLeft,
    isOpen: false,
  };

  getHeartIcon() {
    const imgSrc = this.state.enabled
      ? require("../../assets/images/heart-fill-icon2.svg")
      : require("../../assets/images/heart-blank-icon2.svg");
    return <img src={imgSrc} className="heart-icon-image" />;
  }

  async toggle(event: React.MouseEvent, currentState: boolean) {
    event.preventDefault();
    if (localStorage.getItem("user")) {
      const likeCallResponse = await callApi(
        `/recipe/like/${this.props.recipeId}`,
        {}
      );
      if (likeCallResponse) {
        this.setState({
          enabled: !currentState,
        });
      }
    } else {
      MySwal.fire({
        title: "Like Recipe",
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
  }

  hoverIn() {}

  public render(): JSX.Element {
    return (
      <>
        <div className={this.props.isLeft ? "heart-icon-left ifakelink" : "heart-icon ifakelink"}>
          <a onClick={($event) => this.toggle($event, this.state.enabled)}>
            {this.getHeartIcon()}
          </a>
        </div>
      </>
    );
  }
}

export default HeartIcon;
