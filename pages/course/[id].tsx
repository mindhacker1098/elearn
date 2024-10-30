import SideBar from "@/components/coursepage/SideBar1";
import {
  HStack,
  VStack,
  Text,
  Box,
  AspectRatio,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { useCurrentCourseStore, useCurrentSrcStore } from "../../Zustand/courseStore";
import loadingStore from "../../Zustand/loadingStore";
import CustomSpinner from "@/components/Helpers/customSpinner";
import { notify } from "@/components/Helpers/toaster";

const CoursePage = () => {
  const router = useRouter();
 
  const { id } = router.query;
  const updateCourse = useCurrentCourseStore((state: any) => state.updateCourse);
  const course = useCurrentCourseStore((state: any) => state.course);
  const updateSrcList = useCurrentSrcStore((state: any) => state.updateSrcList);
  const srclist = useCurrentSrcStore((state: any) => state.srclist);
  const Loading = loadingStore((state: any) => state.Loading);
  const setLoading = loadingStore((state: any) => state.setLoading);


  useEffect(() => {
    const token = localStorage.getItem("x-es-token");
    if (!token || token.slice(0, 2) !== "AD") {
      notify("error", "Please login to continue");
      router.push("/login");
    }

    if (id) {
      setLoading(true)
      updateCourse(id)
      .then(() => setLoading(false))
      updateSrcList(id);
    }



  }, [id]);

  let i = 1;
  const [video, setVideo] = useState("");
  const [num, setNum] = useState("0");

  const changeVideo = (src: string, no: string) => {
    console.log(no)
    setVideo(src);
    setNum(no);
    console.log(src);
  };

  const changeVideo1 = (no: string) => {
    console.log(no);
    setVideo(srclist[parseInt(no)]);
    setNum(no);
  };

 

  return course&&!Loading?(
    <HStack w={"100%"} spacing={0}>
      <SideBar setdata={changeVideo} />
      <VStack w={"100%"} h={"89.5vh"} spacing={16}>
        <HStack backgroundColor={"black"} h={"70vh"} w={"100%"}>
          <AspectRatio w="100%" ratio={2 / 1} h={"70vh"}>
            <iframe title="yt" src={video} allowFullScreen />
          </AspectRatio>
        </HStack>
        <HStack justifyContent={"center"} spacing={40} w={"100%"}>
          <Button
            onClick={() => changeVideo1(`${parseInt(num) - 1}`)}
            backgroundColor={"rgb(0,115,117)"}
            _hover={{ bg: "rgb(0,115,117)" }}
          >
            <Text color={"white"}>Prev</Text>
          </Button>
          <Button
            backgroundColor={"rgb(0,115,117)"}
            onClick={() => changeVideo1(`${parseInt(num) + 1}`)}
          >
            <Text color={"white"}>Next</Text>
          </Button>
        </HStack>
      </VStack>
    </HStack>
  ) : (
    <CustomSpinner></CustomSpinner>
  );
};

export default CoursePage;
