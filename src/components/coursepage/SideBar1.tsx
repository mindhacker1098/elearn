import React from "react";
import { VStack, Text, HStack ,Box} from "@chakra-ui/react";
import { CiPlay1 } from "react-icons/ci";
import { ChevronDownIcon, ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaRegFilePdf } from "react-icons/fa";
import { Topic,Course } from "../../../types/Course";
import  { useEffect } from 'react';
import {  useCurrentCourseStore } from "../../../Zustand/courseStore";
import loadingStore from "../../../Zustand/loadingStore";
let count=0;
interface SideBarProps {
  setdata: (src: string,no:string) => void;
}
export interface SideBarItemProps {
  label: string;
  initialContent: Topic[];
  setdata: (src: string,no:string) => void;
}
const SidebarItem: React.FC<SideBarItemProps> = ({ label, initialContent, setdata }) => {
  let i=1;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState<Topic[]>(initialContent);

  const handleItemClick = async () => {
    setIsOpen(!isOpen);

    if (!isOpen && content.length === 0) {
      setIsLoading(true);
      await fetchContent();
      setIsLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newData: Topic[] = [
      ];
      setContent(newData);
    } catch (error) {
      console.error("Error fetching content:", error);
      setIsLoading(false);
    }
  };

  return (
    <VStack width="100%" borderBottom="1px" borderBottomColor="rgb(90,95,99)">
      <HStack
        width="100%"
        // height="50px"
        minHeight={"50px"}
        borderBottom="1px"
        borderBottomColor="rgb(90,95,99)"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleItemClick}
      >
        <Text color="white" fontSize="18px">
          {label}
        </Text>
        {isOpen ? (
          <ChevronDownIcon color="white" fontSize="30px" />
        ) : (
          <ChevronRightIcon color="white" fontSize="30px" />
        )}
      </HStack>
      {isOpen && isLoading && <Text color="white">Loading...</Text>}
      {isOpen && !isLoading && content.length > 0 && (
        <VStack width="100%" alignItems="flex-start">
          {content.map((item, index) => {
            

return(

            <HStack key={index} width="100%" minHeight={"50px"} onClick={() => setdata(item.src,`${count++}`)}>
              

              
{item.type === "video" ? (
               <Box> <CiPlay1  color="white" /></Box>
              ) : item.type === "document" ? (
                <Box><FaRegFilePdf color="white" /></Box>
              ) : null}
              <Text color="white" fontSize={16}>
                {item.fileName}
              </Text>
            </HStack>)


          }
          
          
          )}
        </VStack>
      )}
    </VStack>
  );
};

const SideBar: React.FC<SideBarProps> = ({ setdata }) => {


  const course:Course = useCurrentCourseStore((state: any) => state.course);
  const setLoading=loadingStore((state:any)=>state.setLoading);


  return (
    <VStack width="500px" backgroundColor="rgb(35,41,47)" height="89.5vh" padding={4} overflowY={"auto"}>
      <HStack
        width="100%"
        minHeight={"50px"}
        borderBottom="1px"
        borderBottomColor="rgb(90,95,99)"
        alignItems="center"
        justifyContent="flex-start"
      >
        <HamburgerIcon fontSize="25px" color="white" />
        <Text color="white" fontSize="20px" marginLeft={2}>
          Contents
        </Text>
      </HStack>

      {course&&course.topics.map((topic) => (
        <SidebarItem key={topic.name} label={topic.name} initialContent={topic.data} setdata={setdata} />
      ))}
    </VStack>
  );
};

export default SideBar;
