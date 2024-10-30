import { HStack, Image, Text, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUser } from 'react-icons/fa';

export default function Header1() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(""); // Ensure user is a string
  
  const router = useRouter();
  
  const Student = [{"name": "Home", "path": "/home2"}, {"name": "Test", "path": "/test"}, {"name": "Result", "path": "/result"}];
  const Instructor = [{"name": "Course", "path": "/course"}, {"name": "Home", "path": "/home2"}, {"name": "Createtest", "path": "/uploadtest"}, {"name": "Results", "path": "/result"}, {"name": "UploadQuestions", "path": "/uploadquestions"}, {"name": "UploadCourse", "path": "/upload"}];
  const Admin = [{"name": "Course", "path": "/course"}, {"name": "Home", "path": "/home2"}, {"name": "Test", "path": "/test"}, {"name": "Result", "path": "/result"}, {"name": "search", "path": "/search"}];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('x-es-token');
      
      // Check if token exists and is valid for setting user type
      if (token) {
        setIsLoggedIn(token.slice(0, 2) === 'AD');
        const userType = localStorage.getItem(`x-es-token${token}`) || ""; // Provide a default value
        setUser(userType);
        console.log(userType);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('x-es-token');
    router.push('/home2');
    setIsLoggedIn(false);
    setUser(""); // Clear user state on logout
  };

  const getMenuItems = () => {
    if (user === "Student") return Student;
    if (user === "Instructor") return Instructor;
    if (user === "Admin") return Admin;
    return [];
  };

  return (
    <HStack
      justifyContent={"center"}
      bgGradient="linear(to-r, rgb(254,254,255), rgb(235,245,255),rgb(241,246,255),(254,254,255))"
    >
      <HStack
        justifyContent={"space-between"}
        w={"80%"}
        h={"90px"}
        bgGradient="linear(to-r, rgb(254,254,255), rgb(241,246,255),rgb(241,246,255),rgb(253,254,255))"
      >
        <HStack justifyContent={"space-around"} w={`${getMenuItems().length * 10}%`}>
          <Image boxSize={14} src="/logo.png" alt="Logo" />
          {getMenuItems().map((item) => (
            <Link key={item.name} href={item.path}>
              <Text color={"rgb(108,120,136)"}>{item.name}</Text>
            </Link>
          ))}
        </HStack>
        <HStack>
          {isLoggedIn ? (
            <>
              <HStack>
                <FaUser color={"rgb(108,120,136)"} />
                <Text fontWeight={"600"} color={"rgb(108,120,136)"}>{user}</Text>
              </HStack>
              <Button
                borderRadius={"0"}
                backgroundColor={"rgb(255,255,255)"}
                onClick={handleLogout}
              >
                <Text color={"rgb(19,100,241)"}>Log Out</Text>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button borderRadius={"0"} backgroundColor={"rgb(255,255,255)"}>
                  <Text color={"rgb(19,100,241)"}>Login</Text>
                </Button>
              </Link>
              <Link href="/signup">
                <Button borderRadius={"0"} backgroundColor={"rgb(19,100,241)"}>
                  <Text color={"rgb(245,245,245)"}>Sign Up</Text>
                </Button>
              </Link>
            </>
          )}
        </HStack>
      </HStack>
    </HStack>
  );
}
