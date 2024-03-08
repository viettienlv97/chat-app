import React from "react";

const Signup = () => {
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

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Fullname</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter email"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="text"
              placeholder="Confirm password"
              className="w-full input input-bordered h-10"
            />
          </div>
					<div className="flex items-center">
						<details className="dropdown mt-2">
							<summary className="m-1 btn">Gender</summary>
							<ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
								<li><a>Male</a></li>
								<li><a>Female</a></li>
							</ul>
						</details>
						
						<a
							href="#"
							className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-left ml-3"
						>
							Already have an account?
						</a>
					</div>
          <div>
            <button className="btn btn-block btn-sm mt-2 h-11 hover:text-blue-600">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
