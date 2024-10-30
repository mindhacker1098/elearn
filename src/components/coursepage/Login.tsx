import {
  Flex,
  Box,
  FormControl,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Image,
  HStack,
  useBreakpointValue,
  Divider,
  VStack,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { LockIcon, EmailIcon } from "@chakra-ui/icons";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useRouter } from "next/router";
import { useState } from "react";

// import { AxiosResponse } from "axios";
import { notify } from "@/components/Helpers/toaster";

export default function Login() {
  return (<VStack h={"100%"} w={"100%"} justifyContent={"center"} alignItems={"center"} zIndex={3}  backgroundColor={"white"}>

    <VStack h={"400px"} w={"400px"} justifyContent={"center"} alignItems={"center"}>
            <FormControl
              variant={"another_floating"}
              id="email"
              
            >
              <InputGroup size="md" display={"flex"} gap={"4"}>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.500" marginRight={"10px"} />
                </InputLeftElement>
                <Input
                
                  placeholder=""
                  type="email"
                />
                <FormLabel
                  color={"gray.500"}
                  display="flex"
                  alignItems={"center"}
                >
                  Army no
                </FormLabel>
              </InputGroup>
            
            </FormControl>
            <FormControl id="password" variant={"another_floating"}>
              <InputGroup size="md" display={"flex"} gap={"4"}>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.500" marginRight={"10px"} />
                </InputLeftElement>
                <Input
       
                  placeholder=""
                 
                />
                <FormLabel
                  color={"gray.500"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  Password
                </FormLabel>
                <InputRightElement>
                  <Button
                    color={"#797979"}
                    size={"xl"}
                    
                    background={""}
                  >
                    
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            </VStack>
            </VStack>
  );
}
