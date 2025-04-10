import { SxProps } from "@mui/material";

const mainBoxStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 1,
  width: "148px",
  "&:hover .play-icon": {
    opacity: 1,
  },
};

const imageBoxStyle: SxProps = {
  cursor: "pointer",
  borderRadius: "8px",
  overflow: "hidden",
  width: "148px",
  height: "148px",
};

const imageStyle: SxProps = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const iconBoxStyle: SxProps = {
  position: "absolute",
  bottom: 8,
  right: 8,
  opacity: 0,
  transition: "opacity 0.3s ease",
};

const iconStyle: SxProps = { color: "#8d2c91", fontSize: "50px" };

export { iconStyle,mainBoxStyle, iconBoxStyle, imageBoxStyle, imageStyle };
