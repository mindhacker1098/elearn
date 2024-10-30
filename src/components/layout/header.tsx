import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  Spacer,
  Text,
  Image,
  Button,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('x-es-token');
      setIsLoggedIn(token?.slice(0, 2) === 'AD');
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    
    localStorage.removeItem('x-es-token');

    router.push('/home');
    setIsLoggedIn(false);
  };

  return (
    <Flex px={10} justify="space-around" alignItems="center">
      <Image boxSize={20} src="/logo.png" alt="" />
      <Spacer />
      <Text fontWeight="600" fontSize={20}>
        E-Learning
      </Text>
      <Spacer />
      <Box cursor="pointer">
        <HStack spacing={7}>
          {isLoggedIn ? (<>
            <Link href="/upload1">
                <Button
                  style={{
                    color: '#0F52BA',
                    fontWeight: 600,
                    border: '1px solid #0F52BA',
                    backgroundColor: 'white',
                  }}
                >
                  Upload Course
                </Button>
              </Link>
            <Button
              onClick={handleLogout}
              style={{
                color: '#0F52BA',
                fontWeight: 600,
                border: '1px solid #0F52BA',
                backgroundColor: 'white',
              }}
            >
              Log Out
            </Button>
            </>) : (
            <>
              <Link href="/login">
                <Button
                  style={{
                    color: '#0F52BA',
                    fontWeight: 600,
                    border: '1px solid #0F52BA',
                    backgroundColor: 'white',
                  }}
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  style={{
                    color: 'white',
                    fontWeight: 600,
                    border: '1px solid white',
                    backgroundColor: '#0F52BA',
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </HStack>
      </Box>
    </Flex>
  );
}
