import React, { useState, ChangeEvent } from 'react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { VStack, Input, Text, HStack, IconButton, Button, Checkbox } from '@chakra-ui/react';
import axios from 'axios';
import { notify } from '@/components/Helpers/toaster';

export interface Question {
  no: string;
  text: string;
  options: string[];
  answer: string;
  courseid: string;
  topicid: string;
}

const QuizComponent: React.FC = () => {
  const [courseid, setCourseid] = useState<string>('');
  const [topicid, setTopicid] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    const questionNo = (questions.length + 1).toString();
    setQuestions([...questions, { no: questionNo, text: '', options: [], answer: '', courseid, topicid }]);
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (questionIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = updatedQuestions[questionIndex].options[optionIndex];
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/testapi/uploadquestion', { questions });
      notify('success', 'Quiz uploaded successfully');
    } catch (error) {
      notify('error', 'Something went wrong');
    }
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Enter Course ID"
        value={courseid}
        w={"400px"}
        onChange={(e) => setCourseid(e.target.value)}
        mb={4}
      />
      <Input
        placeholder="Enter Topic ID"
        value={topicid}
        w={"400px"}
        onChange={(e) => setTopicid(e.target.value)}
        mb={4}
      />
      {questions.map((question, questionIndex) => (
        <VStack key={questionIndex} alignItems="flex-start" spacing={2}>
          <HStack>
            <Input
              type="text"
              placeholder={`Enter Question ${questionIndex + 1}`}
              fontSize="large"
              w="350px"
              value={question.text}
              onChange={(e) => handleQuestionChange(questionIndex, e)}
            />
            <IconButton
              aria-label="Remove Question"
              icon={<CloseIcon />}
              onClick={() => removeQuestion(questionIndex)}
            />
          </HStack>
          {question.options.map((option, optionIndex) => (
            <HStack key={optionIndex}>
              <Checkbox
                isChecked={question.answer === option}
                onChange={() => handleAnswerChange(questionIndex, optionIndex)}
              />
              <Input
                fontSize="medium"
                w="300px"
                placeholder={`Enter Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
              />
              <IconButton
                aria-label="Remove Option"
                icon={<CloseIcon />}
                onClick={() => removeOption(questionIndex, optionIndex)}
              />
            </HStack>
          ))}
          <HStack>
            <Text fontSize="medium">Add option</Text>
            <IconButton
              aria-label="Add Option"
              icon={<AddIcon />}
              onClick={() => addOption(questionIndex)}
            />
          </HStack>
        </VStack>
      ))}
      <HStack>
        <Text fontSize="larger">Add question</Text>
        <IconButton
          aria-label="Add Question"
          icon={<AddIcon />}
          onClick={addQuestion}
        />
      </HStack>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </VStack>
  );
};

export default QuizComponent;
