// pages/questions.tsx
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';

import questions from './data.json';
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
import { Question } from '../types/Question';
import { useCurrentTestStore } from '../Zustand/testStore';

interface QuestionsProps {
  questions: Question[];
}

const QuestionsPage: React.FC<QuestionsProps> = ({ questions }) => {

   

    
   
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
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

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;





  return (
    <Box maxWidth="600px" mx="auto" mt="8">
      <Heading as="h1" size="xl" mb="8" textAlign="center">
        {submitted ? 'Test Submitted' : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
      </Heading>
      {!submitted ? (
        <>
          <Progress value={(currentQuestionIndex + 1) / totalQuestions * 100} mb="4" />
          <Text fontSize="lg" mb="4">
            {currentQuestion.text}
          </Text>
          <RadioGroup
            value={answers[currentQuestionIndex]}
            onChange={handleAnswerChange}
          >
            <Stack spacing={4}>
              {currentQuestion.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Box mt="8" display="flex" justifyContent="space-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              colorScheme="teal"
            >
              Previous
            </Button>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestionIndex] === ''}
                colorScheme="teal"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={answers[currentQuestionIndex] === ''}
                colorScheme="teal"
              >
                Submit Test
              </Button>
            )}
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

export const getStaticProps: GetStaticProps = async () => {
    
  return {
    props: {
      questions
    }
  };
};

export default QuestionsPage;
