import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px) translateX(-10px)",
};

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Asap', sans-serif`,
    body: `'Asap', sans-serif`,
    text: `'Inter', sans-serif`,
  },
  components: {
    Link: {
      baseStyle: {
        textDecoration: "none",
        _active: {
          textDecoration: "underline",
        },
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 3,
              zIndex: 2,
              position: "absolute",
              pointerEvents: "none",
              backgroundColor: "#F2F6FD",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
        another_floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 3,
              zIndex: 2,
              position: "absolute",
              pointerEvents: "none",
              backgroundColor: "#FFF",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

export default theme;
