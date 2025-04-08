import { SxProps } from "@mui/material";

const DividerStyle:SxProps = {
    borderColor:"lightgray",
    mb:2
  };

  const MainBoxStyle:SxProps={
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexWrap:"wrap",
    gap:2,
  }

  const IconButtonStyle:SxProps={
    border: "1px solid White",
    borderRadius: "50%",
    color: "White",
    transition: "0.3s",
    "&:hover": {
      color: "#8d2c91",
      borderColor: "#8d2c91",
    },
  }


  export {DividerStyle,MainBoxStyle,IconButtonStyle}