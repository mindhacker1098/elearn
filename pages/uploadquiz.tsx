import React, { useState, ChangeEvent } from 'react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { VStack, Input, Text, HStack, IconButton, Button, Checkbox } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { notify } from '@/components/Helpers/toaster';

interface Question {
  no: number;
  name: string;
  options: string[];
  answer: string; 
}

interface Quiz {
  questions: Question[];
  courseid: string;
}

const QuizComponent: React.FC = () => {
  const router = useRouter();
  const { courseid } = router.query; 

  const [questions, setQuestions] = useState<Question[]>([]);
if(!courseid){
  notify("error","first upload course");
}
  const addQuestion = () => {
    const questionNo = questions.length + 1;
    setQuestions([...questions, { no: questionNo, name: '', options: [], answer: '' }]); 
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (questionIndex: number, e: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].name = e.target.value;
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

  const handleSubmit = async() => {
    const quiz: Quiz = { questions, courseid:"12345678" };

    console.log(quiz);
    
try{
    const response = await axios.post(
      `/api/courseapi/uploadsinglequiz`,
       quiz 
    );
  notify("sucess","test uploaded sucessfully")
  }
    catch(error){
notify("error","Something went wrong")
    }

  };

  return (

    courseid?(<VStack>
      {questions.map((question, questionIndex) => (
        <VStack key={questionIndex} alignItems="flex-start">
          <HStack>
            <Input
              type='text'
              placeholder={`Enter Question ${questionIndex + 1}`}
              fontSize={"large"} w={"350px"}
              value={question.name}
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
                fontSize={"medium"} w={"300px"}
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
            <Text fontSize={"medium"}>Add option</Text>
            <AddIcon onClick={() => addOption(questionIndex)} />
          </HStack>
        </VStack>
      ))}
      <HStack>
        <Text fontSize={"larger"}>Add question</Text>
        <AddIcon onClick={addQuestion} />
      </HStack>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </VStack>
):(<></>)
      );
};

export default QuizComponent;
