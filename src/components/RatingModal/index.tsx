import React, { useEffect, useState } from "react";
import StarRating from "../Common/StarRating";
import { postWithImageUpload, postApi } from "../../apiHandler";
import * as _ from "lodash";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

function RatingModal({ id, title, openModal, closeModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewDetails, setReviewDetails] = useState({} as any);

  useEffect(() => {
    setIsOpen(openModal);
  }, [openModal]);

  const onChange = (e) => {
    setReviewDetails({ ...reviewDetails, [e.target.id]: e.target.value });
  };

  const sendReview = async (e) => {
    e.preventDefault();
    if (!_.isNil(reviewDetails.rating)) {
      postApi(`/recipe-ratings/create/${id}`, reviewDetails).then(
        async ({ data }: any) => {
          if (!_.isNil(reviewDetails.image)) {
            const form: any = new FormData();
            form.append("files", reviewDetails.image);
            form.append("refId", data.id);
            form.append("ref", "recipe-ratings");
            form.append("field", "image");
            postWithImageUpload(form);
          }
          close();
        }
      );
    } else {
      alert("Must have a rating to submit");
    }
  };

  const clickUploadInput = (e) => {
    document.getElementById("imageUpload")?.click();
  };

  const uploadImage = async (input) => {
    function formatBytes(a, b = 2) {
      if (0 === a) return { size: 0, format: "Bytes" };
      const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
      return {
        size: parseFloat((a / Math.pow(1024, d)).toFixed(c)),
        format: ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d],
      };
    }
    const { size, format } = formatBytes(input.target.files[0].size);

    if (format === "Bytes" || format === "KB" || format === "MB") {
      if (format === "MB" && size > 20) {
        alert("image must be 20mb or smaller");
      } else {
        setReviewDetails({
          ...reviewDetails,
          image: input.target.files[0],
        });
      }
    } else {
      alert("image must be 20mb or smaller");
    }
  };

  const close = () => {
    setIsOpen(false);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalCenterTitle">
            Review this Recipe
          </h5>
          <button
            id="close-button"
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={close}
          >
            Back to recipe <span aria-hidden="true">X</span>
          </button>
        </div>
        <div className="modal-body">
          <form action="#">
            <div className="row">
              <div className="col-12">
                <h4>{title}</h4>
                <StarRating
                  editing
                  showCount={false}
                  onStarClick={(e) => {
                    let val = Number(e.currentTarget.id);
                    setReviewDetails({ ...reviewDetails, rating: val });
                    return val;
                  }}
                />
              </div>
              <div className="col-md-6">
                <textarea
                  style={{ height: "100%", width: "100%", resize: "none" }}
                  id="reviewContent"
                  placeholder="What did you think about this recipe? Did you make any changes or notes"
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="col-md-6">
                <div className="photo_wrapper">
                  <div id="profile-container">
                    <div
                      id="profileImage"
                      className="background-image"
                      // src={require("../../assets/images/reviewCamera.svg")}
                      onClick={clickUploadInput}
                    />
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    name="profile_photo"
                    placeholder="Photo"
                    onChange={uploadImage}
                    required
                    capture
                  />
                  {_.isNil(reviewDetails?.file?.name) && (
                    <h4 className="text-center mt-4">Add Photo</h4>
                  )}
                </div>
              </div>
              <div className="col-12 text-center">
                <button onClick={sendReview} className="submit_btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default RatingModal;
