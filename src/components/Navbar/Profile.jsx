import Icon from "../Icon";
import avatar from "../../assets/avatar.png";
import useAuth from "../../customhooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  // console.log(user.photoURL);
  return (
    <div className="flex items-center flex-shrink-0 flex-grow-0 basis-auto box-border justify-end tablet:pl-8 pr-1">
      <button className="hover:bg-gray-100 items-center flex p-2 rounded-full">
        <Icon variant="Symbols" name="apps" className="text-gray-500" />
      </button>
      <button className="hover:bg-gray-100 items-center flex p-2 rounded-full">
        <img
          src={!user ? avatar : user.photoURL}
          className="h-8 w-8 rounded-full"
          alt=""
        />
      </button>
    </div>
  );
};

export default Profile;
