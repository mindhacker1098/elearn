import { notify } from "@/components/Helpers/toaster";
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, HStack, Text, VStack, Box, Input } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import { GoDotFill } from "react-icons/go";
import { useCourseIdStore } from "../Zustand/courseStore";
import { Coursewithid } from "../types/Course";

function Home2() {
  const router = useRouter();
  const setCourseName = useCourseIdStore((state: any) => state.setCourseName);
  const coursename: Coursewithid[] = useCourseIdStore((state: any) => state.coursename);

  // Define data with numeric keys explicitly
  const data: Record<number, { text1: string; text2: string; text3: string; img: string }> = {
    0: {
      text1: "Advanced E-learning Management",
      text2: "Learn anywhere in the world",
      text3: "You have the power to change the world",
      img: "/background.png",
    },
    1: {
      text1: "Advanced Testing System",
      text2: "To keep you on track",
      text3: "Take tests and showcase yourself",
      img: "/background1.png",
    },
    2: {
      text1: "Structured Course Materials",
      text2: "Tension-free Study Plan",
      text3: "Learn effectively, grow properly",
      img: "/background2.png",
    },
  };

  const [no, setNo] = useState(0);
  const [content, setContent] = useState(data[0]);
  const [show, setShow] = useState("inline");
  const [search, setSearch] = useState<Coursewithid[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // Define changeContent with useCallback to stabilize function reference
  const changeContent = useCallback((newNo: number) => {
    newNo = (newNo + 3) % 3;
    setContent(data[newNo]);
    setNo(newNo);
  }, []);

  const coursepage = async () => {
    if (!token) {
      notify("error", "Please login to start");
      return;
    }
    try {
      const response = await axios.post(`/api/courseapi/getcourseidbyid`, { army_no: token.slice(2) });
      router.push(`/course/${response.data.courseid}`);
    } catch (err) {
      notify("error", "Something went wrong");
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("x-es-token"));

    if (!coursename) {
      setCourseName();
    }

    const interval = setInterval(() => {
      changeContent(no + 1);
    }, 7000);

    return () => clearInterval(interval);
  }, [no, coursename, setCourseName, changeContent]);

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

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const results = await fuzzySearch(query);
    setSearch(results);

    if (!token || token.slice(0, 2) !== "AD") {
      notify("error", "Please login to continue");
      router.push("/login");
    }
  };

  return (
    <VStack
      justifyContent={"flex-start"}
      alignItems={"center"}
      bgGradient="linear(to-r, rgb(254,254,255), rgb(241,246,255),rgb(241,246,255),rgb(253,254,255))"
      h={"87vh"}
    >
      {token?.slice(0, 2) === "AD" && (
        <Input
          onChange={handleInputChange}
          onMouseEnter={() => setShow("inline")}
          fontSize={"medium"}
          width={"23%"}
          type="text"
          placeholder="Search course..."
        />
      )}
      <HStack justifyContent={"center"} boxShadow={"0px 2px 3px rgba(0, 0, 0, 0.1)"}>
        <Box
          onMouseEnter={() => setShow("inline")}
          display={show}
          width={"23%"}
          backgroundColor={"rgb(255,255,255)"}
          position={"absolute"}
          top={135}
          zIndex={"3"}
          maxHeight={"400px"}
          overflowY={"auto"}
          borderRadius={"8px"}
          boxShadow={"0px 2px 3px rgba(0, 0, 0, 0.1)"}
        >
          <VStack justifyContent={"center"} w={"100%"}>
            <VStack w={"80%"} justifyContent={"flex-start"} spacing={3}>
              {search.map((data, index) => (
                <HStack
                  key={data._id || index} // Use unique key for each element
                  w={"100%"}
                  justifyContent={"flex-start"}
                  onClick={() => router.push(`course/${data._id}`)}
                >
                  <Text color={"rgb(102,118,142)"}>{data.name}</Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>
      </HStack>

      <VStack position={"absolute"} left={"12%"} top={"26%"} alignItems={"flex-start"}>
        <VStack alignItems={"flex-start"}>
          <Text fontSize={"4xl"} fontWeight={"600"} color={"rgb(19,100,241)"}>
            {content.text1}
          </Text>
          <Text fontSize={"4xl"} fontWeight={"600"}>
            {content.text2}
          </Text>
          <Text color={"rgb(102,118,142)"}>{content.text3}</Text>

          <HStack>
            <Button
              borderRadius={"0"}
              backgroundColor={"rgb(19,100,241)"}
              marginTop={"10px"}
              onClick={coursepage}
            >
              <Text color={"rgb(245,245,245)"}>
                Start learning <ArrowForwardIcon />
              </Text>
            </Button>
            <Button borderRadius={"0"} backgroundColor={"transparent"} marginTop={"10px"}>
              <Text color={"rgb(19,100,241)"}>Know more</Text>
            </Button>
          </HStack>

          <HStack marginTop={"20px"}>
            <ChevronLeftIcon
              color={"rgb(19,100,241)"}
              onClick={() => changeContent(no - 1)}
              fontSize={"20px"}
            />
            {Object.keys(data).map((key, index) => (
              <GoDotFill
                key={index}
                color={no === index ? "rgb(21,102,241)" : "rgb(191,200,214)"}
              />
            ))}
            <ChevronRightIcon
              color={"rgb(19,100,241)"}
              onClick={() => changeContent(no + 1)}
              fontSize={"20px"}
            />
          </HStack>
        </VStack>
      </VStack>

      <HStack w={"80%"} justifyContent={"flex-end"}>
        <HStack
          h={"550px"}
          w="85%"
          backgroundPosition={"right"}
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          style={{ backgroundImage: `url(${content.img})` }}
        />
      </HStack>

      <HStack
        h={"55px"}
        w={"83%"}
        backgroundColor={"rgb(255,255,255)"}
        borderRadius={"10px"}
        marginTop={"-25px"}
        boxShadow={"0px 2px 3px rgba(0, 0, 0, 0.1)"}
      >
        <Box w={"4px"} h={"20px"} backgroundColor={"rgb(19,100,241)"} borderRightRadius={"8px"} />
        <SearchIcon marginLeft={"15px"} />
        <Text>Search here</Text>
      </HStack>
    </VStack>
  );
}

export default Home2;
