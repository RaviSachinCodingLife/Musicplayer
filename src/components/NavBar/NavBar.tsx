import { FC, Fragment } from "react";
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

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar: FC<NavBarProps> = ({
  showSearchBar = true,
  showProfile = true,
  showSupport = true,
  showMobileView = true,
}) => {
  const {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
  } = useNavbar();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#000",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left Section: Logo + Name + Search */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Logo */}
              <IconButton
                aria-label="icon"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <img
                  src={icon}
                  alt="icon"
                  style={{
                    marginRight: "8px",
                    height: "45px",
                    width: "45px",
                  }}
                />
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontWeight: 400,
                  letterSpacing: ".3rem",
                  color: "inherit",
                }}
              >
                BeatBox
              </Typography>

              {/* Search (desktop only) */}
              {showSearchBar && (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    color: "#fff",
                  }}
                >
                  <style.SearchContainer>
                    <style.SearchIconWrapper>
                      <SearchIcon sx={{ color: "grey" }} />
                    </style.SearchIconWrapper>
                    <style.StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </style.SearchContainer>
                </Box>
              )}

              {/* Mobile Menu */}
              {showMobileView && (
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
              <Typography
                variant="h5"
                noWrap
                sx={{
                  display: { xs: "flex", md: "none" },
                  fontWeight: 400,
                  letterSpacing: ".3rem",
                  color: "inherit",
                }}
              >
                BeatBox
              </Typography>
            </Box>

            {/* Right Section: Support + Avatar */}
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
                      <Avatar
                        alt="User Avatar"
                        src="/static/images/avatar/2.jpg"
                      />
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
                        <Typography textAlign="center">{setting}</Typography>
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
