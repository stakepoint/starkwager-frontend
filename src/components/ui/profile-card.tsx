import { Play, UserRoundCog } from "lucide-react";
import Link from "next/link";

const ProfileCard = () => {
  return (
    <>
      <Link
        href={"/account-settings"}
        className="bg-none outline-none border-none"
      >
        <div className="flex items-center p-[6px] pr-4 bg-white rounded-2xl w-full cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-input-bg">
              <UserRoundCog />
            </div>
            <div>
              <p className="font-medium text-sm md:text-base text-blue-1 max-w-36 md:max-w-full w-full truncate">
                Account Settings
              </p>
              <p className="text-grey-1 text-sm">
                Change your profile picture, username, and other important
                information.
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <Play fill="#111" size={18} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProfileCard;
