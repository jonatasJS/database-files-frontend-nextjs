import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

import {} from "../../styles/ProfileStyles";
import api from "../../services/api";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";

// https://codepen.io/nove1398/pen/OJPeYrm

export default function User({
  userData,
}: {
  userData: {
    username: string;
    email: string;
    _id: string;
  };
}) {

  console.log(userData)

  return (
    <div className="bg-light container pl-3 pr-5">
      <div className="row ">
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
          </div>
        </div>
      </div>
    </div>
  );
}

// pegar dados de um usiario
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username }: {
    username: string[];
  } = context.query;
  
  // pegar dados do usuario
  const userData = await api.get(`/user/${username}`).then(
    (response) => response.data
  );

  return {
    props: {
      userData
    },
  };
}
