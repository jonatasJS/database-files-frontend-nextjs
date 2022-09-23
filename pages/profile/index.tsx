import Link from "next/link";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import Zoom from "react-medium-image-zoom";

import api from "../../services/api";

// https://codepen.io/nove1398/pen/OJPeYrm

export default function Profile({
  users,
}: {
  users: {
    username: string;
    email: string;
    _id: string;
    createdAt: string;
  }[];
}) {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    _id: string;
  } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("userdata");
    if (data) {
      console.log(data);
      return setUserData(JSON.parse(data));
    }

    setUserData(null);
  }, []);

  return (
    <div className="bg-light container pl-3 pr-5 pt-3 pb-3">
      <div
        className="row"
        style={{
          marginRight: "-7rem",
          marginLeft: "-6rem",
        }}
      >
        <div className="col-sm-4">
          <div className="">
            <div className="position-relative">
              <div
                id="avatar-container"
                className="position-relative mx-auto"
                data-value="Upload Image"
              >
                <span id="avatar-overlay" className="bg-primary">
                  Upload Image
                </span>
                <img
                  alt={userData?.username}
                  id="avatar-img"
                  className="rounded-circle mx-auto d-block"
                  src={`https://avatars.dicebear.com/api/identicon/${userData?.username}.svg`}
                />
              </div>
              <form
                method="post"
                encType="multipart/form-data"
                asp-page-handler="Avatar"
              >
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input d-none"
                    id="avatar-file"
                  />
                  <label className="custom-file-label d-none">
                    Choose file
                  </label>
                </div>
                {/* style="position:absolute;bottom:50px;right:1em;z-index:8"> */}
                <button
                  type="submit"
                  id="save-avatar"
                  className="btn btn-sm btn-primary d-none"
                >
                  Save
                </button>
              </form>
            </div>
            <div className="text-center">
              <div
                className="btn btn-outline-danger"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  localStorage.removeItem("userdata");
                  toast.success("Logged out successfully", {
                    theme: "dark",
                    autoClose: 5000,
                  });
                  window.location.href = "/login";
                }}
              >
                Sign Out
              </div>
            </div>
          </div>
          =
          <div className="">
            <div className="d-flex">
              <div className="col-sm-auto">Menu</div>
            </div>
            <ul className="list-group">
              <li className="list-group-item active">My Profile</li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Messages
                <span className="badge badge-primary badge-pill">0</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Email Settings
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-8 bg-white mt-5 mb-3 p-3 border">
          <h2>My Profile</h2>
          <hr />
          <div className="alert alert-success" role="alert">
            Updated successfully!
          </div>
          <div className="alert alert-warning" role="alert">
            Hmm, something seems wrong
          </div>
          <div className="col-sm-12">
            <form method="post" asp-page-handler="Account">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={userData?.username}
                  readOnly
                />
                <span asp-validation-for="" className="text-danger"></span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
                <span asp-validation-for="" className="text-danger"></span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
                <span asp-validation-for="" className="text-danger"></span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={userData?.email}
                  readOnly
                />
                <span asp-validation-for="" className="text-danger"></span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Group"
                  readOnly
                />
                <span asp-validation-for="" className="text-danger"></span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Role"
                  readOnly
                />
                <span asp-validation-for="" className="text-danger"></span>
              </div>
              <div className="form-group">
                <select className="form-control"></select>
                <span asp-validation-for="" className="text-danger"></span>
              </div>
              <button className="btn btn-outline-success" type="submit">
                Save {"&"} Continue
              </button>
            </form>

            <form method="post" className="mt-3">
              <h4>Update password</h4>
              <div className="form-group">
                <label asp-for="Password" className="control-label">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="eg. mypassword123"
                  className="form-control mb-2"
                  asp-for="Password"
                  required
                />
                <span asp-validation-for="Password"></span>
              </div>
              <div className="form-group">
                <label asp-for="Password2" className="control-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="eg. mypassword123"
                  className="form-control mb-2"
                  asp-for="Password2"
                  required
                />
                <span asp-validation-for="Password2"></span>
              </div>
              <button className="btn btn-outline-success" type="submit">
                Update
              </button>
            </form>

            <h3>Friends</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              }}
            >

              {/* carregar mais usuarios da api quando der scroll */}
              {users.map(({ _id, email, username, createdAt }) => (
                <div key={_id} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1em",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  margin: "1em",
                  textAlign: "center"
                }}>
                  <Zoom zoomMargin={100}>
                    <img
                      className="group list-group-image"
                      height={100}
                      width={100}
                      src={`https://avatars.dicebear.com/api/identicon/${username}.svg`}
                      alt={username}
                    />
                  </Zoom>
                  <div className="card-body">
                    <Link href={`/user/${username}`}>
                      <a
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <h5 className="card-title">{username}</h5>
                      </a>
                    </Link>
                    <p className="card-text">
                      {moment(createdAt).format("DD/MM/YYYY")}
                      <br />
                      <span>{moment(createdAt).format("hh:mm:ss")}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // pegar dados do usuario
  const users = await api.get(`/users`).then((response) => response.data);

  console.log(users);

  return {
    props: {
      users,
    },
  };
};
