import React, { useState, ChangeEvent } from 'react';
import { AddIcon, AttachmentIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack, Input, Text, VStack, Box, IconButton, Button } from '@chakra-ui/react';
import { notify } from '@/components/Helpers/toaster';

interface File {
  name: string;
  file: File | null;
  src: string;
  type: string; 
}

interface Topic {
  name: string;
  files: File[];
}

interface TopicData {
  fileName: string;
  type: string;
  src: string;
  no: string;
}

interface SubTopic {
  name: string;
  data: TopicData[];
}

interface Course {
  name: string;
  topics: SubTopic[];
}

const Upload1: React.FC = () => {
  
  const [courseName, setCourseName] = useState<string>('');
  const [topics, setTopics] = useState<Topic[]>([]);

  const handleTopicNameChange = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index].name = value;
    setTopics(newTopics);
  };

  const handleFileNameChange = (topicIndex: number, fileIndex: number, value: string) => {
    const newTopics = [...topics];
    newTopics[topicIndex].files[fileIndex].name = value;
    setTopics(newTopics);
  };

  const handleFileChange = async (topicIndex: number, fileIndex: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const topicName = topics[topicIndex].name;
      formData.append('src',`${courseName}/${topicName}` );

   
      const fileName = file.name.toLowerCase();
      const isVideo = fileName.endsWith('.mp4') || fileName.endsWith('.mov') || fileName.endsWith('.avi');

      const response = await fetch(`/api/courseapi/uploadsinglefile`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const responseData = await response.json();
      const newSrc = responseData.src;

      const newTopics = [...topics];
      newTopics[topicIndex].files[fileIndex].file = file;
      newTopics[topicIndex].files[fileIndex].src = newSrc;
     
      newTopics[topicIndex].files[fileIndex].type = isVideo ? 'video' : 'document';
      setTopics(newTopics);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const addTopic = () => {
    setTopics([...topics, { name: '', files: [] }]);
  };

  const addFile = (topicIndex: number) => {
    const newTopics = [...topics];
    newTopics[topicIndex].files.push({ name: '', file: null, src: '', type: '' }); 
    setTopics(newTopics);
  };

  const removeFile = (topicIndex: number, fileIndex: number) => {
    const newTopics = [...topics];
    newTopics[topicIndex].files.splice(fileIndex, 1);
    setTopics(newTopics);
  };

  const removeTopic = (topicIndex: number) => {
    const newTopics = [...topics];
    newTopics.splice(topicIndex, 1);
    setTopics(newTopics);
  };

  const formatDataToJson = () => {
    const formattedData: Course = {
      name: courseName,
      topics: topics.map(topic => {
        return {
          name: topic.name,
          data: topic.files.map((file, index) => {
            return {
              fileName: file.name,
              type: file.type,
              src: file.src,
              no: `${index + 1}`
            };
          })
        };
      })
    };
  
    return JSON.stringify(formattedData, null, 2);
  };

  const handleSubmit = async() => {
    const jsonData = formatDataToJson();
    console.log(jsonData);
    const response = await fetch(`/api/courseapi/uploadsinglecourse`, {
      method: 'POST',
      body: jsonData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
    console.log('Form submitted');
    notify("sucess","course uploaded sucessfully");
    
  };

  return (
    <VStack>
      <Input type='text' placeholder='Enter Course Name' fontSize={"larger"} w={"400px"} value={courseName} onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseName(e.target.value)} />
      {topics.map((topic, topicIndex) => (
        <VStack key={topicIndex} alignItems={"flex-start"}>
          <HStack>
            <Input type='text' placeholder='Enter Topic Name' fontSize={"large"} w={"350px"} value={topic.name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleTopicNameChange(topicIndex, e.target.value)} />
            <IconButton aria-label="Close" icon={<CloseIcon />} onClick={() => removeTopic(topicIndex)} />
          </HStack>
          {topic.files.map((file, fileIndex) => (
            <VStack key={fileIndex}>
              <HStack>
                <Box>
                  <AttachmentIcon cursor="pointer" onClick={() => document.getElementById(`fileInput-${topicIndex}-${fileIndex}`)?.click()} />
                  <Input type='file' id={`fileInput-${topicIndex}-${fileIndex}`} display="none" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(topicIndex, fileIndex, e.target.files![0])} />
                </Box>
                <Input type='text' placeholder='Enter file name' value={file.name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileNameChange(topicIndex, fileIndex, e.target.value)} />
                {file.file && <Text>{file.file.name}</Text>}
                <IconButton aria-label="Close" icon={<CloseIcon />} onClick={() => removeFile(topicIndex, fileIndex)} />
              </HStack>
            </VStack>
          ))}
          <HStack>
            <Text fontSize={"16px"}>Add Content</Text>
            <AddIcon onClick={() => addFile(topicIndex)} />
          </HStack>
        </VStack>
      ))}
      <HStack>
        <Text fontSize={"larger"}>Add Topic</Text>
        <AddIcon onClick={addTopic} />
      </HStack>
      <Button colorScheme="blue" onClick={handleSubmit} marginTop={"30px"}>ADD</Button>
    </VStack>
  );
};

export default Upload1;
