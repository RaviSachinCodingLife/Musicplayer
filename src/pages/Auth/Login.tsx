import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import googleIcon from "../../assets/image/GoogleLogo.png";
import icon from "../../assets/image/CirleCropedImg.png";
import Fotter from "../../components/Fotter/Fotter";
import { useLogin } from "./useAuthHook";
import * as style from "./style";

const Login = () => {
  const {
    state,
    handleChange,
    toggleShowPassword,
    handleLogin,
    handleGoogleLogin,
    navigate,
  } = useLogin();

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      type: state.showPassword ? "text" : "password",
      adornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={toggleShowPassword}
            edge="end"
            sx={{ color: "#aaa" }}
          >
            {state.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    },
  ];

  return (
    <Box sx={style.loginMainBox}>
      <Box sx={style.loginChildBox}>
        <img src={icon} alt="icon" style={style.iconBeatBox} />
        <Typography variant="h5" sx={style.titleTypo}>
          Login to BeatBox
        </Typography>

        <Stack spacing={2}>
          {fields.map(({ name, label, type, adornment }) => (
            <TextField
              key={name}
              name={name}
              label={label}
              type={type}
              variant="outlined"
              value={state[name as keyof typeof state]}
              onChange={handleChange}
              InputProps={{
                style: { color: "#fff" },
                endAdornment: adornment,
              }}
              InputLabelProps={{ style: { color: "#aaa" } }}
              sx={style.textField}
            />
          ))}

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={style.loginButton}
          >
            Login
          </Button>

          <Divider sx={style.dividerStyle}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={style.googleButton}
          >
            <img src={googleIcon} alt="Google" style={style.googleIcon} />
            Sign in with Google
          </Button>
        </Stack>

        <Typography variant="body1" sx={style.bottomTypo}>
          Don't have an account?
          <Typography
            color="#fff"
            sx={style.signUpTypo}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up for Spotify
          </Typography>
        </Typography>
      </Box>

      <Box width="100%">
        <Fotter />
      </Box>
    </Box>
  );
};

export default Login;
