import { InputBase, styled, SxProps } from "@mui/material";
import { CSSProperties } from "styled-components";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: "#212121",
  border: "1px solid grey",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    minWidth: "180px",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const appBar: SxProps = {
  backgroundColor: "#000",
};

const mainBoxStyle: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconBoxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 2,
};

const iconBtnStyle: SxProps = {
  display: { xs: "none", md: "flex" },
};
const iconImgStyle: CSSProperties = {
  marginRight: "8px",
  height: "45px",
  width: "45px",
};

const titleTypo: SxProps = {
  display: { xs: "none", md: "flex" },
  fontWeight: 400,
  letterSpacing: ".3rem",
  color: "inherit",
};

const desktopSearch: SxProps = {
  display: { xs: "none", md: "flex" },
  color: "#fff",
};
const mobileSearch: SxProps = { display: { xs: "flex", md: "none" } };

const titleMobileTypo: SxProps = {
  display: { xs: "flex", md: "none" },
  fontWeight: 400,
  letterSpacing: ".3rem",
  color: "inherit",
};

export {
  mainBoxStyle,
  titleMobileTypo,
  mobileSearch,
  desktopSearch,
  titleTypo,
  iconImgStyle,
  iconBtnStyle,
  iconBoxStyle,
  appBar,
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
};
