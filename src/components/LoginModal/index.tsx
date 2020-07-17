import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: "1001",
  },
};

function LoginModal({ isOpen, close }) {
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <h2 className="p-1 pb-4">You can unlock this feature by signing up.</h2>
      <div className="d-flex justify-content-around">
        <button type="button" className="btn btn-danger" onClick={close}>
          <h4>No Thanks!</h4>
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => (window.location.href = "/join")}
        >
          <h4>Sign up!</h4>
        </button>
      </div>
    </Modal>
  );
}

export default LoginModal;
