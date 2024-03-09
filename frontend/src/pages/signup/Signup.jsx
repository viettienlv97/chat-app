import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GenderDropdown from "./GenderDropdown";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const {loading, signup} = useSignup()

  const [validForm, setValidForm] = useState({
    fullname: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    gender: false,
  });

  const [isSubmit, setSubmit] = useState(false);

  const handleDropdown = (gender) => {
    setInputs({ ...inputs, gender });
    setValidForm({...validForm, gender: true})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    setSubmit(true);

    await signup(inputs) 
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div
        className="w-full p-6 rounded-lg shadow-md 
            bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-400"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text font-semibold text-gray-400">
                Fullname {
                  isSubmit && !validForm.fullname
                  ? (<span className="text-red-600 font-semibold underline">required</span>)
                  : (<span className="text-red-600 font-semibold">* </span>)
                }
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full input input-bordered h-10 ${isSubmit && !validForm.fullname ? 'input-error' : ''}`}
              value={inputs.fullname}
              onChange={(e) => {
                setInputs({ ...inputs, fullname: e.target.value })
                setValidForm({...validForm, fullname: e.target.value ? true : false})
              }
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-400 font-semibold">
                Username {
                  isSubmit && !validForm.username
                  ? (<span className="text-red-600 font-semibold underline">required</span>)
                  : (<span className="text-red-600 font-semibold">*</span>)
                }
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className={`w-full input input-bordered h-10 
                ${isSubmit && !validForm.username ? 'input-error' : ''}`
              }
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text font-semibold text-gray-400">
                Email {
                  isSubmit && !validForm.email
                  ? (<span className="text-red-600 font-semibold underline">required</span>)
                  : (<span className="text-red-600 font-semibold">*</span>)
                }
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter email"
              className={`w-full input input-bordered h-10
                ${isSubmit && !validForm.email ? 'input-error' : ''}
              `}
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text font-semibold text-gray-400">
                Password {
                  isSubmit && !validForm.password
                  ? (<span className="text-red-600 font-semibold underline">required</span>)
                  : (<span className="text-red-600 font-semibold">*</span>)
                }
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className={`w-full input input-bordered h-10
                ${isSubmit && !validForm.password ? 'input-error' : ''}
              `}
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text font-semibold text-gray-400">
                Confirm Password {
                  isSubmit && !validForm.confirmPassword
                  ? (<span className="text-red-600 font-semibold underline">required</span>)
                  : (<span className="text-red-600 font-semibold">*</span>)
                }
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className={`w-full input input-bordered h-10
              ${isSubmit && !validForm.confirmPassword ? 'input-error' : ''}
            `}
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <GenderDropdown
            invalid={isSubmit && !validForm.gender}
            selectedGender={inputs.gender}
            onSelectDropdown={handleDropdown}
          />

          <div className="flex">
            <Link
              to="/login"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-left ml-3"
            >
              Already have an account?
            </Link>
          </div>
          <div>
            <button className="btn btn-block btn-sm mt-3 h-11 hover:text-blue-600">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
