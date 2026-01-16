import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

function Profile() {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="w-full h-full overflow-y-auto px-4 py-8 flex justify-center custom-scrollbar">
        <div className="max-w-2xl w-full h-fit">
          <EditProfile user={user} />
        </div>
      </div>
    )
  );
}

export default Profile;
