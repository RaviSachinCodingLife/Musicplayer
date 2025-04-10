import { Fragment } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Box } from "@mui/material";
import Fotter from "../../components/Fotter/Fotter";
import { useNavigate } from "react-router-dom";
import * as style from "./style";

const AuthPage = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <NavBar
        showSearchBar={false}
        showProfile={false}
        showSupport={false}
        showMobileView={false}
      />
      <Box
        sx={style.bgImage}
        onClick={() => {
          navigate("/login");
        }}
      />
      <Fotter />
    </Fragment>
  );
};

export default AuthPage;
