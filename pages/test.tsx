import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpcomingTestsPage = () => {
  const router = useRouter();
  const [upcomingTests, setUpcomingTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`/api/testapi/gettestbyuserid/${localStorage.getItem("x-es-token")?.substring(2)}`); // Adjust the endpoint accordingly
        setUpcomingTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, []);

  const handleTestClick = (test) => {
    const testString = encodeURIComponent(JSON.stringify(test));
    router.push(`/questions?test=${testString}`);
    
  };

  return (
    <Box p={5} >
      <Heading mb={6}>Upcoming Tests</Heading>
      <SimpleGrid columns={[1, null, 3]} spacing={5} >
        {upcomingTests.map((test) => (
          <Box
            key={test._id} // Assuming the test has a unique ID
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            onClick={() => handleTestClick(test)}
          >
            <Heading fontSize="xl">{test.visibleInfo}</Heading>
            <Text mt={4}><strong>Date:</strong> {test.date}</Text>
            <Text mt={2}><strong>Time:</strong> {test.startTime}</Text>
            {test.isFlexible ? (
              <Text mt={2}><strong>End Time:</strong> {test.endTime}</Text>
            ) : <></>}
            <Text mt={2}><strong>Duration:</strong> {test.duration}</Text>
            <Text mt={2}><strong>Number of Questions:</strong> {test.numberOfQuestions}</Text>
            <Text mt={2}><strong>Total Marks:</strong> {test.questionsPerMark * test.numberOfQuestions}</Text>
            <Text mt={2}><strong>Description:</strong> {test.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UpcomingTestsPage;
