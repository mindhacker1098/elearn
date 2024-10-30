import { useState } from "react";
import { 
  Flex, 
  Box, 
  Input, 
  Button, 
  VStack, 
  Textarea, 
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { notify } from "@/components/Helpers/toaster"; // Assuming you have a toaster helper

export default function CreateTest() {
  const router = useRouter();
  const [testDetails, setTestDetails] = useState({
    date: "",
    startTime: "",
    endTime: "",
    isFlexible: "false",
    duration: "",
    visibleInfo: "",
    questionsPerMark: "",
    numberOfQuestions: "",
    description: "",
    courseId: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log("submit clicked");
    try {
      await axios.post("/api/testapi/uploadtest", testDetails);
      notify("success", "Test created successfully");
      router.push("/home2");
    } catch (error) {
      console.log(error);
      notify("error", "Something went wrong");
    }
  };

  return (
    <Flex 
      align="center" 
      justify="center" 
      minH="88vh"
      bgGradient="linear(to-r, rgb(254,254,255), rgb(241,246,255),rgb(241,246,255),rgb(253,254,255))"
      w="100%"

    >
      <Box 
        p={8}
        w={"100%"}
      >
        <VStack spacing={4} onSubmit={handleSubmit} w={"100%"}>
          <Input 
            type="date" 
            name="date"
         
            w={"400px"}
            value={testDetails.date} 
            onChange={handleChange} 
            placeholder="Date"
          />
          
          <Select 
            w={"400px"}
            name="isFlexible"
            value={testDetails.isFlexible} 
            onChange={handleChange}
            placeholder="Is Time Flexible?"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </Select>

          {testDetails.isFlexible === "true" ? (
            <>
              <Input 
                w={"400px"}
                type="time" 
                name="startTime"
                value={testDetails.startTime} 
                onChange={handleChange} 
                placeholder="Start Time"
              />
              <Input 
                w={"400px"}
                type="time" 
                name="endTime"
                value={testDetails.endTime} 
                onChange={handleChange} 
                placeholder="End Time"
              />
            </>
          ) : (
            <>
              <Input 
                w={"400px"}
                type="time" 
                name="startTime"
                value={testDetails.startTime} 
                onChange={handleChange} 
                placeholder="Start Time"
              />
            </>
          )}
   
          <Input 
            type="text" 
            w={"400px"}
            placeholder="Duration (e.g., 1h 30m)" 
            name="duration"
            value={testDetails.duration} 
            onChange={handleChange} 
          />

          <Input 
            w={"400px"}
            type="text" 
            name="visibleInfo"
            value={testDetails.visibleInfo} 
            onChange={handleChange} 
            placeholder="Test Visible Info"
          />

          <Input 
            w={"400px"}
            type="number" 
            name="questionsPerMark"
            value={testDetails.questionsPerMark} 
            onChange={handleChange} 
            placeholder="Questions Per Mark"
          />

          <Input 
            w={"400px"}
            type="number" 
            name="numberOfQuestions"
            value={testDetails.numberOfQuestions} 
            onChange={handleChange} 
            placeholder="Number of Questions"
          />

          <Textarea 
            w={"400px"}
            name="description"
            value={testDetails.description} 
            onChange={handleChange} 
            placeholder="Description"
          />

          <Input 
            w={"400px"}
            type="text" 
            name="courseId"
            value={testDetails.courseId} 
            onChange={handleChange} 
            placeholder="Course ID"
          />

          <Button onClick={handleSubmit} colorScheme="blue">
            Create Test
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
