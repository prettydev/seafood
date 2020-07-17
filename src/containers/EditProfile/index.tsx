import React, { useState, useEffect } from "react";
import _ from "lodash";
import { postWithImageUpload, putApi } from "../../apiHandler";
import ClipLoader from "react-spinners/ClipLoader";

const states = [
  "Not Selected",
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

function EditProfile() {
  const [user, setUser] = useState({} as any);
  const [editDetails, setEditDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    image: "",
  } as any);
  const [saving, setSaving] = useState(false);

  const onType = (e) => {
    const { id, value } = e.target;
    setEditDetails({ ...editDetails, [id]: value });
  };

  const profileClick = () => {
    const imageUpload = document.getElementById("imageUpload");
    imageUpload?.click();
  };

  const addImage = (e) => {
    function formatBytes(a, b = 2) {
      if (0 === a) return { size: 0, format: "Bytes" };
      const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
      return {
        size: parseFloat((a / Math.pow(1024, d)).toFixed(c)),
        format: ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d],
      };
    }
    const { size, format } = formatBytes(e.target.files[0].size);

    if (format === "Bytes" || format === "KB" || format === "MB") {
      if (format === "MB" && size > 20) {
        alert("image must be 20mb or smaller");
      } else {
        setEditDetails({ ...editDetails, image: e.target.files[0] });
      }
    } else {
      alert("image must be 20mb or smaller");
    }
  };

  const submitChanges = async (e) => {
    e.preventDefault();
    setSaving(true);

    const options = _.pickBy(editDetails, (value, key) => {
      return !_.isEmpty(value);
    });

    if (editDetails.image) {
      const form: any = new FormData();
      form.append("files", editDetails.image);
      const data = await postWithImageUpload(form);
      options.profileImage = data[0].id;
    }
    const updatedUser = await putApi(`/users/${user.id}`, _.merge(options));

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setSaving(false);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!_.isEmpty(user)) {
      setUser(user);
    } else {
      window.location.href = "/join";
    }
  }, []);

  return (
    <section className="create_profile_sec">
      <div className="container-md container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-11">
            <div className="row align-items-center">
              <div className="col-12">
                <form action="#">
                  <div className="row justify-content-center">
                    <div className="flex-column" onClick={profileClick}>
                      <div
                        id="profile-container"
                        className="b-none profile_image"
                      >
                        <img
                          id="profileImage"
                          src={
                            user.profileImage
                              ? user.profileImage.url
                              : require("../../assets/images/user-icon.svg")
                          }
                          style={{ width: !user.profileImage ? "80%" : "" }}
                        />
                      </div>
                      <input
                        id="imageUpload"
                        type="file"
                        name="profile_photo"
                        placeholder="Photo"
                        onChange={addImage}
                        capture
                      />
                      <p
                        className="text-center"
                        style={{ color: "#284E8B" }}
                        onClick={profileClick}
                      >
                        Change Profile Picture
                      </p>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 mt_10">
                        <input
                          id="firstName"
                          type="text"
                          className="input_box"
                          placeholder={
                            user.firstName ? user.firstName : "First Name"
                          }
                          onChange={onType}
                        />
                      </div>

                      <div className="col-sm-6 mt_10">
                        <input
                          id="lastName"
                          type="text"
                          className="input_box"
                          placeholder={
                            user.lastName ? user.lastName : "Last Name"
                          }
                          onChange={onType}
                        />
                      </div>

                      <div className="col-sm-6 mt_10">
                        <input
                          id="email"
                          type="email"
                          className="input_box"
                          placeholder={user.email ? user.email : "Email"}
                          onChange={onType}
                        />
                      </div>

                      <div className="col-sm-6 mt_10">
                        <input
                          id="phoneNumber"
                          type="tel"
                          className="input_box"
                          placeholder={
                            user.phoneNumber ? user.phoneNumber : "Phone Number"
                          }
                          onChange={onType}
                        />
                      </div>
                      <div className="col-12 mt_10">
                        <input
                          id="address"
                          type="text"
                          className="input_box"
                          placeholder={user.address ? user.address : "Address"}
                          onChange={onType}
                        />
                      </div>
                      <div className="col-sm-12 col-lg-6 mt_10">
                        <input
                          id="city"
                          type="text"
                          className="input_box"
                          placeholder={user.city ? user.city : "City"}
                          onChange={onType}
                        />
                      </div>

                      <div className="col-sm-6 col-lg-3 mt_10">
                        <div className="select_box">
                          <select
                            id="state"
                            className="input_box"
                            onChange={onType}
                          >
                            {states.map((state, i) => (
                              <option
                                key={"state_" + i}
                                selected={user.state === state}
                              >
                                {state}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-6 col-lg-3 mt_10">
                        <input
                          id="zip"
                          type="number"
                          className="input_box"
                          placeholder={user.zip ? user.zip : "Zip Code"}
                          onChange={onType}
                        />
                      </div>

                      <div className="col-6 text-right mt_30">
                        <button
                          className="submit d-inline-block mt_10"
                          disabled={saving}
                          onClick={submitChanges}
                        >
                          {saving ? <ClipLoader color={"#fff"} /> : "Save"}
                        </button>
                      </div>

                      <div className="col-6 mt_30">
                        <button
                          type="reset"
                          className="submit d-inline-block cancel mt_10"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;
