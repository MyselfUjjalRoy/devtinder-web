const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    // Added 'hover' effect and better border/shadow
    <div className="card bg-base-300 w-96 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/5">
      {/* 1. Improved Figure: Fixed height and 'object-cover' prevents image stretching */}
      <figure className="px-4 pt-4">
        <img
          src={photoUrl}
          alt="profile"
          className="rounded-xl h-72 w-full object-cover shadow-inner"
        />
      </figure>

      <div className="card-body">
        {/* 2. Better Header: Name and Age on the same line */}
        <div className="flex justify-between items-center">
          <h2 className="card-title text-2xl font-bold">
            {firstName + " " + lastName}
          </h2>
          {age && (
            <div className="badge badge-secondary p-3 font-bold">{age}</div>
          )}
        </div>

        {/* 3. Sub-text: Gender as a subtle tag */}
        {gender && (
          <span className="text-sm opacity-60 font-medium uppercase">
            {gender}
          </span>
        )}

        {/* 4. About: Using line-clamp ensures all cards stay the same size */}
        <p className="mt-2 text-base-content/80 line-clamp-2 italic">
          {about || "No bio available."}
        </p>

        {/* 5. Actions: Using flex-1 to make buttons equal width */}
        <div className="card-actions justify-center gap-3 mt-4">
          <button className="btn btn-error flex-1 text-white">Ignore</button>
          <button className="btn btn-primary flex-1 text-white">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
