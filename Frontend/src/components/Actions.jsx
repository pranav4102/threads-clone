import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { AiOutlineRetweet } from "react-icons/ai";
import axios from "axios";
import { useToast, useColorMode } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "@chakra-ui/react";
const Actions = ({ id, likes, currentUser }) => {
  const {colorMode}= useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading]=useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const Schema = yup.object().shape({
      text: yup.string().max(500).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm({ resolver: yupResolver(Schema) });

 
  const toast = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(likes?.length);
    setIsLiked(likes?.includes(currentUser?.id));
  }, [likes, currentUser]);

  const likePost = async () => {
    try {
      let response = await axios({
        url: `/api/v1/like/${id}`,
        method: "post",
      });
      // Update the like count and isLiked state
      setLikeCount(response.data.newLikeCount);
      setIsLiked((prevIsLiked) => !prevIsLiked); // Toggle isLiked
      toast({
        description: response.data.message,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      toast({
        description: error.response.data.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  const onSubmit = async(data) => {
    try {
      setIsLoading(true);
      let response = await axios({
        url: `/api/v1/reply/${id}`,
        method: "post",
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
      reset();
      onClose();
    } catch (error) {
      toast({
        description: response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex items-center gap-2 pt-4 ">
      <div
        className={`${colorMode === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'} rounded-full p-2 flex items-center justify-center  cursor-pointer`}
        onClick={likePost}
      >
        <FiHeart
          size={20}
          style={{ fill: isLiked ? "red" : null, stroke: isLiked ? "red" : null }}
        />
      </div>
      <div
        className={`${colorMode === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'} rounded-full p-2 flex items-center justify-center  cursor-pointer`}
        onClick={onOpen}
      >
        <FaRegComment size={20} />
      </div>
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          
        >
          <ModalOverlay />
          <ModalContent bg={colorMode === 'dark' ? "gray.dark" : "whiteAlpha.900"}>
            <ModalHeader bg={colorMode === 'dark' ? "gray.dark" : "whiteAlpha.900"} textColor={colorMode == 'dark' ? 'white' : 'black'}>Reply</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} 
           bg={colorMode === 'dark' ? "gray.dark" : "whiteAlpha.900"}>
              <FormControl bg={colorMode === 'dark' ? "gray.dark" : "whiteAlpha.900"}>
                <input
                  type="text"
                  placeholder="Your thoughts..."
                  className={` outline-none focus:none bg-transparent text-lg w-full `}
                  {...register("text")}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter bg={colorMode === 'dark' ? "gray.dark" : "whiteAlpha.900"}>
             <Button onClick={onClose}
               borderRadius={"full"}
               margin2={4}
              
               bg={colorMode=== 'dark' ? 'white' : 'black'}
               textColor={colorMode== 'dark' ? 'black' : 'white'}
             >Cancel</Button>

             {
              isLoading ?   <Button
              isLoading
              marginLeft={4}
              loadingText="Saving"
              spinnerPlacement="start"
              paddingX={6}
              borderRadius={"full"}
            >
            save
            </Button> : 
              <Button
                marginLeft={4}
                borderRadius={"full"}
                paddingX={6}
                backgroundColor={colorMode== 'dark' ? 'white' : 'black'}
               
                textColor={colorMode== 'dark' ? 'black' : 'white'}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
             }
              

       
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

      <div className={`${colorMode == 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'} rounded-full p-2 flex items-center justify-center  cursor-pointer`}>
        <AiOutlineRetweet size={20} />
      </div>
      <div className={`${colorMode == 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'} rounded-full p-2 flex items-center justify-center  cursor-pointer`}>
        <PiPaperPlaneTilt size={20} />
      </div>
    </div>
  );
};

export default Actions;
