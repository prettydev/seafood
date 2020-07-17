import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
} from "react-share";
import { hostName } from "../../environment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ShareModal({ isOpen, runAfter, recipe }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
    runAfter();
  };
  useEffect(() => setModalIsOpen(isOpen), [isOpen]);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Share"
      id="share"
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">
          Share:
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" onClick={closeModal}>
            X
          </span>
        </button>
      </div>
      <div className="modal-body">
        <form action="#">
          <div className="row">
            <div
              className="col-12 text-center"
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <a className="pl-2 pr-2">
                <EmailShareButton
                  url={`${window.location.origin}/recipe/${recipe.slug}`}
                  formTarget={"_blank"}
                  children={
                    <img
                      src={require("../../assets/images/email.png")}
                      alt=""
                    />
                  }
                />
                <p>Email</p>
              </a>
              <a className="pl-2 pr-2">
                <PinterestShareButton
                  media={recipe.images[0].url}
                  url={`${window.location.origin}/recipe/${recipe.slug}`}
                  formTarget={"_blank"}
                  children={
                    <img
                      src={require("../../assets/images/pinterest.png")}
                      alt=""
                    />
                  }
                />
                <p>Pinterest</p>
              </a>

              <a className="pl-2 pr-2">
                <FacebookShareButton
                  url={`${window.location.origin}/recipe/${recipe.slug}`}
                  formTarget={"_blank"}
                  children={
                    <img
                      src={require("../../assets/images/facebook-2.png")}
                      alt=""
                    />
                  }
                />
                <p>Facebook</p>
              </a>
              <a className="pl-2 pr-2">
                <TwitterShareButton
                  url={`${window.location.origin}/recipe/${recipe.slug}`}
                  formTarget={"_blank"}
                  children={
                    <img
                      src={require("../../assets/images/twitter.png")}
                      alt=""
                    />
                  }
                />
                <p>Twitter</p>
              </a>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ShareModal;
