import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  HStack,
  VStack,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  FormLabel,
} from "@chakra-ui/react";
import { LockIcon, EmailIcon } from "@chakra-ui/icons";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useRouter } from "next/router";
import { useState } from "react";
import { notify } from "@/components/Helpers/toaster";
import axios, { AxiosError, AxiosResponse } from "axios";


export default function SignIn() {
  
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [army_no, setArmyno] = useState("");


 
  const handleArmynoChange = (e: any) => {
    const value = e.target.value;
    setArmyno(value);
    
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        `/api/auth/login`,
        {
          army_no,password
        }
      );
      notify("sucess", "logined sucessfully");
      const newToken: string = response.data.army_no;
    localStorage.setItem("x-es-token", "AD"+newToken);
    localStorage.setItem(`x-es-token${"AD"+newToken}`,response.data.user)
    router.push("/home2")
    }
      catch(err){
  notify("error", "Incorrect Credientials");
  
      }
  };
  const handlePasswordClick = () => setShowPassword(!showPassword);
  return (
    <Flex
      backgroundColor="F2F6FD"
      height={"100vh"}
      align={"center"}
      justify={"center"}
      overflow={"hidden"}
    >
      <VStack
        backgroundColor="F2F6FD"
        direction={{ base: "column", md: "row" }}
        align={"center"}
        justify={"center"}
        w={"55%"}
      >
        <Box rounded={"lg"} background="F2F6FD">
          <Heading fontSize={"4xl"} paddingBottom={"8"} textAlign={"center"}>
            Sign In
          </Heading>
          <Stack spacing={4} w={"374px"}>
          <FormControl
              variant={"another_floating"}
              id="mobile"
           
            >
              <Input
                placeholder=""
                type="text"
                value={army_no}
                onChange={handleArmynoChange}
              />
              <FormLabel color={"gray.500"}>IC/Army No</FormLabel>
             
            </FormControl>
            <FormControl id="password" variant={"another_floating"}>
              <InputGroup size="md" display={"flex"} gap={"4"}>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.500" marginRight={"10px"} />
                </InputLeftElement>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  type={showPassword ? "text" : "password"}
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
                    onClick={handlePasswordClick}
                    background={""}
                  >
                    {showPassword ? <GoEye /> : <GoEyeClosed />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6} mt={"10px"}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                
                <HStack w={"100%"} justifyContent={"center"}>
                <Link
                  color={"#065AD8"}
                  fontWeight={"500"}
                  href="/forgotpassword"
                >
                    
                  Forgot password?
                </Link>
                </HStack>
              </Stack>
              <Button
                bg={"#065AD8"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                borderRadius={"xl"}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <HStack align={"center"} justify={"center"}>
                <Text>Don&#39;t have account?</Text>
                <Link fontWeight={"bold"} color={"#065AD8"} href="/signup">
                  SignUp Now
                </Link>
              </HStack>
            </Stack>
          </Stack>
          
        </Box>
        
      </VStack>
    </Flex>
  );
}
