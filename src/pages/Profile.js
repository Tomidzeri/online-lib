import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../queries/profileInfo";
// import classes from "./styles/profile.module.css";
import photo from "../Images/photo.jpg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProfileDropdown from "../components/UI/actions/ProfileActionsDropdown";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const loggedInUsername = sessionStorage.getItem("username");

    if (!token || !loggedInUsername) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const user = await fetchUserProfile(token, loggedInUsername);

        setUserProfile(user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="main-content mt-24 ml-20">
      <div className="w-full">
        <div className=" flex flex-row justify-between border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">
          {userProfile?.name} {userProfile?.surname}
          </h2>
          <ProfileDropdown />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : userProfile ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-row">
                <div className="flex flex-col text-left">
                  <div className="pb-8">
                    <p className="text-left font-black">Ime i prezime</p>
                    <p className="text-left">
                      {userProfile.name} {userProfile.surname}
                    </p>
                  </div>
                  <div className="pb-8">
                    <p className="text-left font-black">Tip korisnika:</p>
                    <p className="text-left">{userProfile.role}</p>
                  </div>
                  <div className="pb-8">
                    <p className="text-left font-black">JMBG:</p>
                    <p className="text-left">{userProfile.jmbg}</p>
                  </div>
                  <div className="pb-8">
                    <p className="text-left font-black">Email:</p>
                    <p className="text-left">{userProfile.email}</p>
                  </div>
                  <div className="pb-8">
                    <p className="text-left font-black">Korisnicko ime:</p>
                    <p className="text-left">{userProfile.username}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-baseline items-center">
                <img
                  src={photo}
                  alt="User Cover"
                  className="border border-gray-400 p-2 mt-2 w-60 h-80"
                />
              </div>
            </div>
          </>
        ) : (
          <p>Failed to load profile data.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
