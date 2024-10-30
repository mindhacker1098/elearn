"use client";
import { Box } from "@chakra-ui/react";

import Header1 from "./header1";
import { useRouter } from "next/router";

import { Constants } from "../../../Constants/Constants";
import { reactNodeProps } from "../../../types/Common.interface";


const Layout = ({ children }: reactNodeProps) => {
  const router = useRouter();
  const { pathname } = router;


  const shouldDisplayHeaderFooter = !Constants.excludedPaths.includes(pathname);

  return (
    <>
      {shouldDisplayHeaderFooter && <Header1 />}
      <Box as="main">{children}</Box>
     
    </>
  );
};

export default Layout;
