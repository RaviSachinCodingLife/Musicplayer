import { SxProps } from "@mui/material";
import bgImg from "../../assets/image/AuthPageImg.jpg";
import { CSSProperties } from "styled-components";

const bgImage: SxProps = {
  height: "70vh",
  width: "100%",
  backgroundImage: `url(${bgImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  cursor: "pointer",
  "@media only screen and (max-width: 400px)": {
    height: "50vh",
    px: 1,
    backgroundPosition: "top",
  },
  "@media only screen and (max-width: 600px)": {
    height: "55vh",
    px: 2,
  },
  "@media only screen and (min-width: 600px)": {
    height: "60vh",
  },
  "@media only screen and (min-width: 768px)": {
    height: "65vh",
  },
  "@media only screen and (min-width: 992px)": {
    height: "70vh",
  },
  "@media only screen and (min-width: 1200px)": {
    height: "70vh",
  },
};

const loginMainBox: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  bgcolor: "#121212",
  px: 2,
  "@media only screen and (max-width: 600px)": {
    py: 2,
  },
};

const loginChildBox: SxProps = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "400px",
  bgcolor: "#212121",
  borderRadius: 2,
  p: 4,
  boxShadow: 4,
  "@media only screen and (max-width: 400px)": {
    padding: "20px",
  },

  "@media only screen and (max-width: 600px)": {
    maxWidth: "90%",
    padding: "25px",
  },
};

const iconBeatBox: CSSProperties = {
  width: "60px",
  height: "60px",
  alignSelf: "center",
};

const titleTypo: SxProps = {
  fontWeight: 600,
  color: "#fff",
  textAlign: "center",
  mb: 3,
  fontSize: {
    xs: "1.5rem",
    sm: "1.8rem",
    md: "2rem",
  },
};

const textField: SxProps = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": { borderColor: "#8d2c91" },
    "&:hover fieldset": { borderColor: "#aaa" },
  },
};
const loginButton: SxProps = {
  borderRadius: "50px",
  height: "50px",
  bgcolor: "#8d2c91",
  fontWeight: 600,
  fontSize: "18px",
};

const dividerStyle: SxProps = {
  color: "#aaa",
  fontSize: 14,
};

const googleButton: SxProps = {
  borderRadius: "50px",
  height: "50px",
  color: "#fff",
  fontWeight: 500,
  borderColor: "#555",
  "&:hover": { borderColor: "#aaa" },
  pl: 2,
};

const googleIcon: CSSProperties = {
  width: 20,
  height: 20,
  marginRight: 10,
};

const bottomTypo: SxProps = {
  display: "flex",
  gap: 0.5,
  mt: 2,
  alignSelf: "center",
};
const signUpTypo: SxProps = {
  "&:hover": { color: "#8d2c91", textDecoration: "underline" },
  cursor: "pointer",
};

export {
  signUpTypo,
  bottomTypo,
  googleIcon,
  googleButton,
  dividerStyle,
  bgImage,
  loginMainBox,
  loginChildBox,
  iconBeatBox,
  titleTypo,
  textField,
  loginButton,
};
