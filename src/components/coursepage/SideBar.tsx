import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import { HStack, VStack,Text,Box } from "@chakra-ui/react";
const SideBar = ()=> {
  return (
    <VStack width={"500px"}  backgroundColor={"rgb(35,41,47)"} h={"89.5vh"}  >
<VStack w={"100%"}  h={"50px"} borderBottom={"1px"} borderBottomColor={"rgb(90,95,99)"} ><HStack h={"100%"} w={"80%"} alignItems={"center"} justifyContent={"flex-start"}><HamburgerIcon fontSize={"25px"} color={"white"}></HamburgerIcon><Text color={"white"} fontSize={"20px"}>Contents</Text></HStack></VStack>
<VStack w={"100%"}  h={"50px"} borderBottom={"1px"} borderBottomColor={"rgb(90,95,99)"} ><HStack h={"100%"} w={"80%"} alignItems={"center"} justifyContent={"space-between"}><Text color={"white"} fontSize={"18px"}>Introduction</Text><ChevronRightIcon color={"white"} fontSize={"30px"}/></HStack></VStack>
<VStack w={"100%"}  h={"50px"} borderBottom={"1px"} borderBottomColor={"rgb(90,95,99)"} ><HStack h={"100%"} w={"80%"} alignItems={"center"} justifyContent={"space-between"}><Text color={"white"} fontSize={"18px"}>What is Generative ai</Text><ChevronRightIcon color={"white"} fontSize={"30px"}/></HStack></VStack>
<VStack w={"100%"}  h={"50px"} borderBottom={"1px"} borderBottomColor={"rgb(90,95,99)"} ><HStack h={"100%"} w={"80%"} alignItems={"center"} justifyContent={"space-between"}><Text color={"white"} fontSize={"18px"}>What is AI model</Text><ChevronRightIcon color={"white"} fontSize={"30px"}/></HStack></VStack>
<VStack w={"100%"}  h={"50px"} borderBottom={"1px"} borderBottomColor={"rgb(90,95,99)"} ><HStack h={"100%"} w={"80%"} alignItems={"center"} justifyContent={"space-between"}><Text color={"white"} fontSize={"18px"}>What is next</Text><ChevronRightIcon color={"white"} fontSize={"30px"}/></HStack></VStack>



    </VStack>
  );
}
export default SideBar;