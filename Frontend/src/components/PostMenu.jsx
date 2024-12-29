import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { useColorMode, Portal, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
const PostMenu = ({ id, currUser }) => {
  const [postData, setPostData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const Schema = yup.object().shape({
    posttext: yup.string().max(500).required(),
  });

  const { register, handleSubmit } = useForm({ resolver: yupResolver(Schema) });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios({
        url: `/api/v1/post/${id}`,
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });
      toast({
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          url: `/api/v1/post/${id}`,
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPostData({
          posttext: response.data.posttext,
          postImage: response.data.postImage,
          authorId: response.data.author._id,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios({
        url: `/api/v1/post/${id}`,
        method: "delete",
      });
      toast({
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`${
          colorMode == "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-100"
        } rounded-full p-2 flex items-center justify-center cursor-pointer`}
      >
        <Menu>
          <MenuButton>
            <HiDotsHorizontal size={20} />
          </MenuButton>
          <Portal>
            <MenuList
              bg={colorMode === "dark" ? "gray.dark" : "whiteAlpha.800"}
            >
              {currUser &&
              String(currUser.id) === String(postData?.authorId) ? (
                <>
                  <MenuItem
                    bg={colorMode === "dark" ? "gray.dark" : "whiteAlpha.800"}
                    className={`${
                      colorMode == "dark"
                        ? "hover:bg-neutral-800"
                        : "hover:bg-neutral-100"
                    }`}
                    onClick={onOpen}
                  >
                    Edit thread
                  </MenuItem>
                  <MenuItem
                    bg={colorMode === "dark" ? "gray.dark" : "whiteAlpha.800"}
                    className={`${
                      colorMode == "dark"
                        ? "hover:bg-neutral-800"
                        : "hover:bg-neutral-100"
                    }`}
                    onClick={handleDelete}
                  >
                    Delete Thread
                  </MenuItem>
                </>
              ) : null}
              <Link to={`/user/${postData?.authorId}`}>
                <MenuItem
                  bg={colorMode === "dark" ? "gray.dark" : "whiteAlpha.800"}
                  className={`${
                    colorMode == "dark"
                      ? "hover:bg-neutral-800"
                      : "hover:bg-neutral-100"
                  }`}
                >
                  Visit account
                </MenuItem>
              </Link>
            </MenuList>
          </Portal>
        </Menu>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="bg-neutral-800">
          <ModalHeader className="bg-neutral-900">Edit Thread</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} className="bg-neutral-900 ">
            <FormControl className="bg-neutral-900">
              <FormLabel>Thread</FormLabel>
              <input
                type="text"
                placeholder="What is happening!?"
                className=" outline-none focus:none text-lg w-full bg-neutral-900"
                defaultValue={postData?.posttext}
                {...register("posttext")}
              />

              <div className="w-full flex justify-center items-center my-4">
                <img src={postData?.postImage} alt="" className="rounded-lg" />
              </div>
            </FormControl>
          </ModalBody>

          <ModalFooter className="bg-neutral-900">
            {isLoading ? (
              <Button
                isLoading
                loadingText="Saving"
                spinnerPlacement="start"
                paddingX={6}
                borderRadius={"full"}
              >
                save
              </Button>
            ) : (
              <Button
                mr={3}
                backgroundColor={"white"}
                textColor={"black"}
                borderRadius={"full"}
                paddingX={6}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            )}
            <Button
              onClick={onClose}
              paddingX={6}
              borderRadius={"full"}
              marginX={4}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostMenu;
