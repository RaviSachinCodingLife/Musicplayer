import { FC } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import icon from "../../assets/image/PurpleCircleCropedImg.png";
import SearchIcon from "@mui/icons-material/Search";
import * as style from "./style";
import { NavBarProps } from "./types";
import { useNavbar } from "./useNavbarHook";

const NavBar: FC<NavBarProps> = ({
  showSearchBar = true,
  showProfile = true,
  showSupport = true,
  showMobileView = true,
  onSearchChange = () => {},
}) => {
  const {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    handleSearchInputChange,
    userInitial,
    settings,
    navigate,
  } = useNavbar(onSearchChange);

  return (
    <AppBar position="sticky" sx={style.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={style.mainBoxStyle}>
            <Box sx={style.iconBoxStyle}>
              <IconButton aria-label="icon" sx={style.iconBtnStyle}>
                <img src={icon} alt="icon" style={style.iconImgStyle} />
              </IconButton>

              <Typography variant="h6" noWrap sx={style.titleTypo}>
                BeatBox
              </Typography>

              {/* Desktop Search */}
              {showSearchBar && (
                <Box sx={style.desktopSearch}>
                  <style.SearchContainer>
                    <style.SearchIconWrapper>
                      <SearchIcon sx={{ color: "grey" }} />
                    </style.SearchIconWrapper>
                    <style.StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      onChange={handleSearchInputChange}
                    />
                  </style.SearchContainer>
                </Box>
              )}

              {/* Mobile Menu */}
              {showMobileView && (
                <Box sx={style.mobileSearch}>
                  <IconButton
                    size="large"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElNav}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    sx={{ display: { xs: "block", md: "none" } }}
                  >
                    {showSearchBar && (
                      <MenuItem>
                        <style.SearchContainer>
                          <style.SearchIconWrapper>
                            <SearchIcon />
                          </style.SearchIconWrapper>
                          <style.StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            onChange={handleSearchInputChange}
                          />
                        </style.SearchContainer>
                      </MenuItem>
                    )}
                  </Menu>
                </Box>
              )}

              {/* Mobile Logo */}
              <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
                <img
                  src={icon}
                  alt="icon"
                  style={{ height: "32px", width: "32px" }}
                />
              </IconButton>
              <Typography variant="h5" noWrap sx={style.titleMobileTypo}>
                BeatBox
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {showSupport && (
                <Typography variant="h6" sx={{ color: "#fff" }}>
                  Support
                </Typography>
              )}

              {showProfile && (
                <Box>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: "#8d2c91", color: "#fff" }}>
                        {userInitial}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{ mt: "45px" }}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/");
                          }}
                          textAlign="center"
                          color="#000"
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
