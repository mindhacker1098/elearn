import { Box, Spinner, Stack, keyframes } from "@chakra-ui/react";


const CustomSpinner = () => {
  const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
  return (
    <Stack h={"85vh"} justify={"center"} align={"center"} w={"100%"}>
      <Box
        height={"90px"}
        width={"90px"}
        padding={"10px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"50%"}
        background={
          "conic-gradient(#1681FF40 75% , rgb(206,229, 255) 0% , rgb(22, 129, 255 , 1))"
        }
        animation={`${spin} 2s linear infinite`}
      >
        <Box
          width={"100%"}
          height={"100%"}
          backgroundColor={"white"}
          borderRadius={"50%"}
        ></Box>
      </Box>
    </Stack>
  );
};

export default CustomSpinner;
