import { SxProps } from "@mui/material";

const mainBoxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  bgcolor: "#000",
  px: 2,
  py: 1,
  color: "#fff",
  borderRadius: "10px",
};

const avtarStyle: SxProps = { width: 56, height: 56 };
const siderStyle: SxProps = { color: "white", flex: 1 };
const volBoxStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  width: 200,
};

export { mainBoxStyle, avtarStyle, siderStyle, volBoxStyle };
