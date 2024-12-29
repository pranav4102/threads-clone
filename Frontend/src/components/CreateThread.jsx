import React, { useRef, useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useToast, Button } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useColorMode } from "@chakra-ui/react";

const CreateThread = ({ pfp, id }) => {
  const { colorMode } = useColorMode();

  const [imageUrl, setImageUrl] = useState();
  const [imagefile, setImagefile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currUser, setCurrUser] = useState();
  const openFileRef = useRef();
  const toast = useToast();
  const openFiles = () => {
    openFileRef.current.click();
  };
  const getImagePreview = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
  };

  const onChangeFile = (e) => {
    setImagefile(e.target.files[0]);
    getImagePreview(e);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/v1/user/${id}`);
        setCurrUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const Schema = yup.object().shape({
    posttext: yup.string().max(500).required("Please add content for a thread"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("posttext", data.posttext);
      formData.append("postImage", imagefile);
      setIsLoading(true);
      const response = await axios.post("/api/v1/post/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      resetField("posttext");
      resetField("postImage");
      setImageUrl("");

      toast({
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex px-4 py-6 mt-16">
          <Link to={`/user/${id}`}>
            {" "}
            <img
              src={currUser?.pfp ? currUser?.pfp : "/nopfp.jpeg"}
              alt=""
              className="size-12 rounded-full cursor-pointer object-cover"
            />
          </Link>
          <input
            type="text"
            placeholder="What is happening!?"
            className="pl-4 outline-none focus:none text-lg w-full bg-transparent"
            {...register("posttext")}
          />
          {errors.posttext && (
            <div className="px-4">
              {toast({
                description: errors.posttext?.message,
                status: "warning",
                duration: 3000,
                isClosable: true,
              })}
            </div>
          )}
        </div>
        <input
          type="file"
          placeholder="Image"
          name="postImage"
          className="pl-4 outline-none focus:none text-lg w-full bg-transparent hidden"
          {...register("postImage")}
          ref={openFileRef}
          onChange={onChangeFile}
        />
        {imageUrl ? (
          <div className="relative">
            <div className="w-full flex items-center justify-center absolute">
              {" "}
              <div className="w-7/12 p-2 flex pl-72 ml-8  items-center ">
                <div
                  className="backdrop-blur-sm bg-black/50 hover:bg-black/70 rounded-full p-1 cursor-pointer "
                  onClick={() => {
                    setImageUrl("");
                  }}
                >
                  <IoMdClose size={20} />
                </div>
              </div>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={imageUrl}
                alt=""
                className="rounded-lg size-7/12 object-cover"
              />
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-between px-8 border-b">
          <CiImageOn size={25} className="cursor-pointer" onClick={openFiles} />
          {isLoading ? (
            <Button
              isLoading
              loadingText="Posting"
              spinnerPlacement="start"
              borderRadius="full"
              className="py-2 px-8 font-semibold ml-2 my-4"
            >
              Post
            </Button>
          ) : (
            <button
              className={`${
                colorMode == "dark"
                  ? "bg-white text-black"
                  : "bg-black text-white"
              } py-2 px-8 font-semibold  rounded-full ml-2 my-4 hover:scale-95 transition-all`}
              type="submit"
            >
              Post
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateThread;
