import React, { useState, ChangeEvent } from 'react';
import { AddIcon, AttachmentIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack, Input, Text, VStack, Box, IconButton, Button } from '@chakra-ui/react';
import { notify } from '@/components/Helpers/toaster';

interface FileType {
  name: string;
  file: File | null;
  src: string;
  type: string; 
}

interface Topic {
  name: string;
  files: FileType[];
}

const Upload1: React.FC = () => {
  const [courseName, setCourseName] = useState<string>('');
  const [topics, setTopics] = useState<Topic[]>([]);

  const handleTopicNameChange = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index].name = value;
    setTopics(newTopics);
  };

  const handleFileChange = async (topicIndex: number, fileIndex: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file as Blob); // Explicitly cast file as Blob
      const topicName = topics[topicIndex].name;
      formData.append('src', `${courseName}/${topicName}`);

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
      console.error('Error:', (error as Error).message); // Type assertion for better error handling
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

  return (
    <VStack>
      <Input
        type="text"
        placeholder="Enter Course Name"
        fontSize="larger"
        w="400px"
        value={courseName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseName(e.target.value)}
      />
      {topics.map((topic, topicIndex) => (
        <VStack key={topicIndex} alignItems="flex-start">
          <HStack>
            <Input
              type="text"
              placeholder="Enter Topic Name"
              fontSize="large"
              w="350px"
              value={topic.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleTopicNameChange(topicIndex, e.target.value)}
            />
            <IconButton aria-label="Close" icon={<CloseIcon />} onClick={() => setTopics(topics.filter((_, i) => i !== topicIndex))} />
          </HStack>
          {topic.files.map((file, fileIndex) => (
            <VStack key={fileIndex}>
              <HStack>
                <Box>
                  <AttachmentIcon cursor="pointer" onClick={() => document.getElementById(`fileInput-${topicIndex}-${fileIndex}`)?.click()} />
                  <Input
                    type="file"
                    id={`fileInput-${topicIndex}-${fileIndex}`}
                    display="none"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange(topicIndex, fileIndex, file);
                    }}
                  />
                </Box>
                <Input
                  type="text"
                  placeholder="Enter file name"
                  value={file.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const newTopics = [...topics];
                    newTopics[topicIndex].files[fileIndex].name = e.target.value;
                    setTopics(newTopics);
                  }}
                />
                {file.file && <Text>{file.file.name}</Text>}
                <IconButton
                  aria-label="Close"
                  icon={<CloseIcon />}
                  onClick={() => {
                    const newTopics = [...topics];
                    newTopics[topicIndex].files.splice(fileIndex, 1);
                    setTopics(newTopics);
                  }}
                />
              </HStack>
            </VStack>
          ))}
          <HStack>
            <Text fontSize="16px">Add Content</Text>
            <AddIcon onClick={() => addFile(topicIndex)} />
          </HStack>
        </VStack>
      ))}
      <HStack>
        <Text fontSize="larger">Add Topic</Text>
        <AddIcon onClick={addTopic} />
      </HStack>
      <Button colorScheme="blue" onClick={() => console.log("Course uploaded successfully")}>ADD</Button>
    </VStack>
  );
};

export default Upload1;
