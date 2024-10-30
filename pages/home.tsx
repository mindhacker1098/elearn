import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { notify } from "@/components/Helpers/toaster";
import { Coursewithid } from "../types/Course";
import { useCourseIdStore } from "../Zustand/courseStore";

export default function Home() {




  const router = useRouter();

  const setCourseName = useCourseIdStore(
    (state: any) => state.setCourseName
  );
  const coursename: Coursewithid[] = useCourseIdStore(
    (state: any) => state.coursename
  );

  useEffect(()=>{
    if(!coursename){
      setCourseName();
    }

  },[])
 
  let str = "Let`s study and grow together";
  const [text, setText] = useState("Let`s study and grow together");
  const [show, setShow] = useState("inline");
  
  
  const [search, setSearch] = useState<Coursewithid[]>([]);
  const [subjects, setSubject] = useState<Coursewithid[]>([]);
  async function fuzzySearch(query: string, threshold = 0.7) {
    query = query.toLowerCase();

    return coursename.filter((sub) => {
      const sublower = sub.name.toLowerCase();
      let score = 0;
      let currentScore = 0;
      let currentIndex = 0;

      for (let i = 0; i < query.length; i++) {
        const queryChar = query.charAt(i);

        for (let j = currentIndex; j < sublower.length; j++) {
          const targetChar = sublower.charAt(j);

          if (queryChar === targetChar) {
            currentScore += 1;
            currentIndex = j + 1;
            break;
          }
        }

        score += currentScore;
        currentScore = 0;
      }

      const similarity = score / query.length;

      return similarity >= threshold;
    });
  }

  const handleInputChange = async (e: any) => {
    const query = e.target.value;

    const results = await fuzzySearch(query);
    setSearch(results);
    const token = localStorage.getItem("x-es-token");
    if (!token || token.slice(0, 2) !== "AD") {
      notify("error", "Please login to continue");
      router.push("/login");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (text == "") {
        setText("Let`s study and grow together");
      } else {
        setText("");
      }
    }, 1000);
  }, [text]);

  return (
    <>
      <Flex direction={"column"}>

        <HStack justifyContent={"center"}>
          <Input
            onChange={(e) => handleInputChange(e)}
           
            onMouseEnter={() => setShow("inline")}
            border={"2px"}
            borderColor={"#0F52BA"}
            width={300}
            type="text"
            placeholder="Search course..."
          ></Input>
        </HStack>
        <HStack justifyContent={"center"}>
          <Box
            // onMouseLeave={() => setShow("none")}
            onMouseEnter={() => setShow("inline")}
            display={show}
            width={300}
            backgroundColor={"gray"}
            position={"absolute"}
            top={120}
          >
            <VStack>
              {search.map((data , index: number) => {
                return (
                  <HStack
                  key={index}
                    w={"100%"}
                    justifyContent={"center"}
                    onClick={() => router.push(`course/${data._id}`)}
                  >
                    <Text >{data.name}</Text>
                  </HStack>
                );
              })}
            </VStack>
          </Box>
        </HStack>

        <HStack
        marginLeft={"30px"}
          paddingTop={"40px"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          {" "}
          <Image
            src="signup.jpg"
            boxSize="550px"
            objectFit="cover"
            alt="Sign In Banner"
            borderRadius={"40%"}
          
          />{" "}
          <HStack>
            <Text
              fontSize={"40"}
              fontWeight={"600"}
              paddingBottom={"400px"}
              paddingRight={"200px"}
            >
              
              {text}
            </Text>
          </HStack>
        </HStack>
      </Flex>
    </>
  );
}
