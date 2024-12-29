import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { useColorMode, Portal, useToast } from "@chakra-ui/react";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
const ReplyMenu = ({ replyinguserid, postid, replyid, currUser}) => {
  const {colorMode}= useColorMode();
  const [user, setUser] = useState();
  const toast = useToast();



  const handleDelete = async () => {
    try {
      
      const response = await axios({
        url: `/api/v1/post/${postid}/reply/${replyid}`,
        method: "delete",
      });
      toast({
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className={`${colorMode == 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'} rounded-full p-2 flex items-center justify-center cursor-pointer`}>
        <Menu>
          <MenuButton>
            <HiDotsHorizontal size={20} />
          </MenuButton>
          <Portal>
            <MenuList bg={colorMode === 'dark' ? "gray.dark" : "whiteAlpha.800"}>
              {currUser && String(currUser.id) == String(replyinguserid) ? (
                <>
                  <MenuItem
                    bg={colorMode === 'dark' ? "gray.dark" : "whiteAlpha.800"}
                    className={`${colorMode == 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}
                    onClick={handleDelete}
                  >
                    Delete reply
                  </MenuItem>
                </>
              ) : null}
            <Link to={`/user/${replyinguserid}`}>  <MenuItem  bg={colorMode === 'dark' ? "gray.dark" : "whiteAlpha.800"}
                    className={`${colorMode == 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}>
                Visit account
              </MenuItem></Link>
            </MenuList>
          </Portal>
        </Menu>
      </div>
    </>
  );
};

export default ReplyMenu;
