const layoutWrapper = {
  display: "flex",
  flexDirection: "column",
};

const mainContainer = {
  display: "flex",
  gap: 1,
  mx: 2,
  flexDirection: {
    xs: "column",
    sm: "column",
    md: "row",
  },
};

const sidebar = (selected: boolean) => ({
  bgcolor: "#212121",
  borderRadius: "10px",
  width: {
    xs: "100%",
    sm: "100%",
    md: "30%",
  },
  height: selected ? "80vh" : "90vh",
  overflow: "auto",
  p: 2,
  mb: {
    xs: 2,
    md: 0,
  },
});

const sidebarBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

const mainContent = (selected: boolean) => ({
  bgcolor: "#212121",
  borderRadius: "10px",
  width: {
    xs: "100%",
    sm: "100%",
    md: "70%",
  },
  height: selected ? "80vh" : "90vh",
  overflow: "auto",
});

const contentInnerBox = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  mx: 3,
  my: 3,
};

export {
  sidebarBoxStyle,
  layoutWrapper,
  contentInnerBox,
  mainContent,
  sidebar,
  mainContainer,
};
