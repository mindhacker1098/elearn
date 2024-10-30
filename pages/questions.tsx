import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Progress,
} from '@chakra-ui/react';

import { useCurrentTestStore } from '../Zustand/testStore';
import { useRouter } from 'next/router';
import axios from 'axios';

const QuestionsPage: React.FC = () => {
  const { questions, setQuestions } = useCurrentTestStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const router = useRouter();

  const testString = typeof router.query.test === 'string' ? router.query.test : undefined;
  const testObject = testString ? JSON.parse(decodeURIComponent(testString)) : null;

  const Timer = useCallback(async () => {
    if (testObject) {
      try {
        const response = await axios.get(
          `/api/testapi/gettimerbytime/${testObject.date}_${testObject.startTime}/${testObject.duration}`
        );
        const data = response.data;
        setTimeLeft(data.data);
      } catch (error) {
        console.error("Error fetching timer data:", error);
      }
    }
  }, [testObject]);

  useEffect(() => {
    if (!router.isReady || !testObject) return;

    if (!questions && testObject) {
      setQuestions(localStorage.getItem("x-es-token")?.substring(2) ?? "", testObject.numberOfQuestions);
    }

    Timer();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions, setQuestions, Timer, testObject, router.isReady]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log('Submitted answers:', answers);
  };

  const currentQuestion = questions ? questions[currentQuestionIndex] : null;
  const totalQuestions = questions ? questions.length : 0;

  return (
    <Box maxWidth="600px" mx="auto" mt="8">
      <Heading as="h1" size="xl" mb="8" textAlign="center">
        {submitted ? 'Test Submitted' : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
      </Heading>
      {!submitted && currentQuestion ? (
        <>
          <Progress value={(currentQuestionIndex + 1) / totalQuestions * 100} mb="4" />
          <Text fontSize="lg" mb="4">
            {currentQuestion.text}
          </Text>
          <RadioGroup value={answers[currentQuestionIndex] || ''} onChange={handleAnswerChange}>
            <Stack spacing={4}>
              {currentQuestion.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Box mt="8" display="flex" justifyContent="space-between">
            <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} colorScheme="teal">
              Previous
            </Button>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button onClick={handleNext} disabled={answers[currentQuestionIndex] === ''} colorScheme="teal">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={answers[currentQuestionIndex] === ''} colorScheme="teal">
                Submit Test
              </Button>
            )}
          </Box>
          <Box mt="4" textAlign="center">
            <Text fontSize="lg">Time Left: {formatTime(timeLeft)}</Text>
          </Box>
        </>
      ) : (
        <Alert status="success">
          <AlertIcon />
          Your test has been submitted successfully!
        </Alert>
      )}
    </Box>
  );
};

export default QuestionsPage;
