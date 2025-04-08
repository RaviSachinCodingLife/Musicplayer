import { Fragment } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Box, Link } from "@mui/material";
import bgImg from "../../assets/image/AuthPageImg.jpg";
import Fotter from "../../components/Fotter/Fotter";

const AuthPage = () => {
  return (
    <Fragment>
      <NavBar
        showSearchBar={false}
        showProfile={false}
        showSupport={false}
        showMobileView={false}
      />
      <Link href="/login" underline="none" display="block">
        <Box
          sx={{
            height: "70vh",
            width: "100%",
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            cursor: "pointer",
          }}
        />
      </Link>
      <Fotter />
    </Fragment>
  );
};

export default AuthPage;
