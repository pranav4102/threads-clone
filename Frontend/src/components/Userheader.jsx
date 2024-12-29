import React, { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useColorMode, Portal, useToast } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import FollowMessageButton from "./FollowMessageButton";
import EditProfileButton from "./EditProfileButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SingleUserPost from "../components/SingleUserPost";
import UserReplies from "./UserReplies";

const Userheader = ({ user, currUser }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [togle, setTogle] = useState(false);

  const copylink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() =>
      toast({
        description: "Link copied to clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
        containerStyle: {
          backgroundColor: "black",
          color: "red",
        },
      })
    );
  };

  const logout = async () => {
    try {
      const response = await axios({
        url: "/api/v1/logout",
        method: "post",
      });
      localStorage.removeItem("currUser");
      toast({
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/authorize");
    } catch (error) {
      toast({
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleTogle = () => {
    setTogle(!togle);
  };

  return (
    <>
      <VStack align="stretch" spacing={3} className="mt-24">
        <div className="flex items-center justify-between pb-2">
          <div className="userinfo">
            <div className="username font-bold text-2xl py-2">{user?.name}</div>
            <div className="info flex">
              <div>{user?.username}</div>
              <div
                className={
                  colorMode == "dark"
                    ? "cursor-pointer text-xs ml-2 bg-zinc-800 rounded-lg px-1 flex items-center justify-center"
                    : "cursor-pointer text-xs ml-2 bg-neutral-400 rounded-lg px-1 flex items-center justify-center"
                }
              >
                threads.net
              </div>
            </div>
          </div>
          <img
            src={user?.pfp ? user?.pfp : "/nopfp.jpeg"}
            alt=""
            className="rounded-[1000px] size-24 object-cover"
          />
        </div>
        <div className="flex items-center justify-start font-normal">
          {user?.bio}
        </div>
        <div className="flex">
          <div className="left flex w-11/12 gap-2 items-center justify-start">
            <div className="followersCount font-normal hover:underline text-zinc-500 cursor-pointer">
              {user?.followers.length} followers
            </div>
            <div className="instalink font-normal hover:underline text-zinc-500 cursor-pointer lg:block md:block sm:hidden">
             . instagram.com
            </div>
          </div>
          <div className="right flex w-6/12 gap-2 items-center justify-end">
            <div
              className={`${
                colorMode == "dark"
                  ? "hover:bg-neutral-800"
                  : "hover:bg-neutral-100"
              } rounded-full p-2 flex items-center justify-center`}
            >
              <BsInstagram size={22} cursor={"pointer"} />
            </div>
            <div
              className={`${
                colorMode == "dark"
                  ? "hover:bg-neutral-800"
                  : "hover:bg-neutral-100"
              } rounded-full p-2 flex items-center justify-center`}
            >
              <Menu>
                <MenuButton>
                  <CgMoreO size={22} cursor={"pointer"} />
                </MenuButton>
                <Portal>
                  <MenuList
                    bg={colorMode === "dark" ? "gray.dark" : "whiteAlpha.800"}
                  >
                    <MenuItem
                      bg={colorMode === "dark" ? "gray.dark" : "whiteAlpha.800"}
                      onClick={copylink}
                      className={`${
                        colorMode == "dark"
                          ? "hover:bg-neutral-800"
                          : "hover:bg-neutral-100"
                      }`}
                    >
                      Copy link
                    </MenuItem>
                    {currUser?.id == user?._id && (
                      <MenuItem
                        bg={
                          colorMode === "dark" ? "gray.dark" : "whiteAlpha.800"
                        }
                        onClick={logout}
                        color={"red"}
                        className={`${
                          colorMode == "dark"
                            ? "hover:bg-neutral-800"
                            : "hover:bg-neutral-100"
                        }`}
                      >
                        Logout
                      </MenuItem>
                    )}
                  </MenuList>
                </Portal>
              </Menu>
            </div>
          </div>
        </div>
        {currUser?.id == user?._id ? (
          <EditProfileButton userid={user?._id} />
        ) : (
          <FollowMessageButton
            id={user?._id}
            currUser={currUser}
            followers={user?.followers}
          />
        )}

        <div className="flex w-full mt-10">
          <div
            className={`w-6/12 flex items-center justify-center font-semibold border-b cursor-pointer pb-2 ${
              !togle
                ? colorMode == "dark"
                  ? "border-white text-white"
                  : "border-black text-black"
                : " text-zinc-500"
            }`}
          >
            {" "}
            {togle ? (
              <button onClick={handleTogle}>Threads</button>
            ) : (
              "Threads"
            )}{" "}
          </div>
          <div
            className={`w-6/12 flex items-center justify-center font-semibold border-b cursor-pointer pb-2 ${
              togle
                ? colorMode == "dark"
                  ? "border-white text-white"
                  : "border-black text-black"
                : " text-zinc-500"
            } `}
          >
            {!togle ? (
              <button onClick={handleTogle}>Replies</button>
            ) : (
              "Replies"
            )}
          </div>
        </div>
      </VStack>
      {togle ? (
        <UserReplies />
      ) : (
        <SingleUserPost user={user} currUser={currUser} />
      )}
    </>
  );
};

export default Userheader;
