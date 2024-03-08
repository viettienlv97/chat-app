import React, { useState, useRef } from "react";

const GenderDropdown = ({ invalid, selectedGender, onSelectDropdown }) => {
  const detail = useRef();

  const handleSelectDropdown = (gender) => {
    onSelectDropdown(gender)
    detail.current.open = false
  }

  return (
    <div>
      <label className="label p-2">
        <span className="text-base label-text font-semibold text-gray-400">
          Gender {
            invalid
            ? (<span className="text-red-600 font-semibold underline">required</span>)
            : (<span className="text-red-600 font-semibold">*</span>)
          }
        </span>
      </label>
      <details className="dropdown w-full" ref={detail}>
        <summary className={`btn w-full ${invalid ? 'btn-error' : ''}`}
        >
          {selectedGender || "Gender"}
        </summary>
        <ul className={`p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52
          
        `}>
          <li onClick={() => handleSelectDropdown('Male')}>
            <a>Male</a>
          </li>
          <li onClick={() => handleSelectDropdown('Female')}>
            <a>Female</a>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default GenderDropdown;
