const FriendDropdown = () => {
  const blockUser = () => {

  }

  const reportUser = () => {

  }
    
  return (
    <div>
      <details className="dropdown dropdown-end w-full">
        <summary className={`btn w-full bg-transparent border-none pb-2`}>
          ...
        </summary>
        <ul
          className={`shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-25
        `}
        >
          <li onClick={() => blockUser}>
            <a>Block</a>
          </li>
          <li onClick={() => reportUser}>
            <a>Report</a>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default FriendDropdown;
