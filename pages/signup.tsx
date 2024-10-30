import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import axios, { AxiosError, AxiosResponse } from "axios";
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
  useColorModeValue,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormLabel,
  Select,
  HStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { notify } from "@/components/Helpers/toaster";
import { useCourseIdStore } from "../Zustand/courseStore";
import { Coursewithid } from "../types/Course";

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [army_no, setArmyno] = useState("");
  const [user, setUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const setCourseName = useCourseIdStore(
    (state: any) => state.setCourseName
  );
  const coursename: Coursewithid[] = useCourseIdStore(
    (state: any) => state.coursename
  );

  const bgColor = useColorModeValue("white", "gray.700");

  const handleArmynoChange = (e: any) => {
    const value = e.target.value;
    setArmyno(value);
  };

  const handleUserChange = (e: any) => {
    const value = e.target.value;
    setUser(value);
  };

  const handleCourseChange = (e: any) => {
    const value = e.target.value;
    setSelectedCourse(value);
  };

  const users: string[] = ["Instructor", "Student"];

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handlePasswordClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<{ army_no: string; user: string }> = await axios.post(
        `/api/auth/register`,
        {
          army_no, user, password, name, courseid: selectedCourse,
        }
      );
      const newToken: string = response.data.army_no;
      localStorage.setItem("x-es-token", "AD" + newToken);
      localStorage.setItem(`x-es-token${"AD"+newToken}`, response.data.user);
      notify("success", "Register Successfully");
      router.push("/home2");
    } catch (err) {
      notify("error", "Something went wrong");
    }
  };

  useEffect(() => {
    if (!coursename.length) {
      setCourseName();
    }
  }, [coursename, setCourseName]);

  return (
    coursename ? (
      <Flex
        height={"100vh"}
        overflow={"hidden"}
        align={"center"}
        justify={"center"}
      >
        <VStack
          direction={{ base: "column", md: "row" }}
          align={"center"}
          justify={"center"}
          w={"55%"}
        >
          <Box rounded={"lg"} bg={bgColor}>
            <Heading fontSize={"4xl"} paddingBottom={"8"} textAlign={"center"}>
              Sign Up
            </Heading>
            <Stack spacing={2} w={"374px"}>
              <FormControl variant={"another_floating"} id="name">
                <Input
                  placeholder=""
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
                <FormLabel color={"gray.500"}>Name</FormLabel>
              </FormControl>
              <FormControl variant={"another_floating"} id="army_no">
                <Input
                  placeholder=""
                  type="text"
                  value={army_no}
                  onChange={handleArmynoChange}
                />
                <FormLabel color={"gray.500"}>IC/Army No</FormLabel>
              </FormControl>
              <FormControl variant={"another_floating"} id="user">
                <Select size={"md"} placeholder="Sign up as" onChange={handleUserChange}>
                  {users.map((name, index) => (
                    <option value={name} key={index}>
                      {name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant={"another_floating"} id="course">
                <Select size={"md"} placeholder="Course" onChange={handleCourseChange}>
                  {coursename.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="password" variant={"another_floating"}>
                <InputGroup size="md">
                  <InputLeftElement pointerEvents="none">
                    <LockIcon color="gray.500" marginRight={"10px"} />
                  </InputLeftElement>
                  <Input
                    placeholder=""
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
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
                <Button
                  bg={"#065AD8"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                  borderRadius={"xl"}
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
                <HStack align={"center"} justify={"center"}>
                  <Text>Already have account?</Text>
                  <Link fontWeight={"bold"} color={"#065AD8"} href="/login">
                    Sign In Now
                  </Link>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </VStack>
      </Flex>
    ) : <></>
  );
}
