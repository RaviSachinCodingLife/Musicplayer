import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment, Stack,
  TextField,
  Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import googleIcon from "../../assets/image/GoogleLogo.png";
import icon from "../../assets/image/CirleCropedImg.png";
import Fotter from "../../components/Fotter/Fotter";
import { useSignUp } from "./useAuthHook";
import * as style from "./style";

const Register = () => {
  const {
    formData,
    handleChange,
    toggleShowPassword,
    handleRegister,
    handleGoogleRegister,
    navigate,
  } = useSignUp();

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      type: formData.showPassword ? "text" : "password",
      adornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={toggleShowPassword}
            edge="end"
            sx={{ color: "#aaa" }}
          >
            {formData.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    },
  ];

  return (
    <Box sx={style.loginMainBox}>
      <Box sx={{ ...style.loginChildBox, pt: 0 }}>
        <img src={icon} alt="icon" style={style.iconBeatBox} />
        <Typography variant="h5" sx={style.titleTypo}>
          Sign up for BeatBox
        </Typography>

        <Stack spacing={2}>
          {fields.map(({ name, label, type, adornment }) => (
            <TextField
              key={name}
              name={name}
              label={label}
              type={type}
              variant="outlined"
              value={formData[name as keyof typeof formData]}
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
            onClick={handleRegister}
            sx={style.loginButton}
          >
            Sign Up
          </Button>

          <Divider sx={style.dividerStyle}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleRegister}
            sx={style.googleButton}
          >
            <img src={googleIcon} alt="Google" style={style.googleIcon} />
            Sign up with Google
          </Button>
        </Stack>

        <Typography variant="body1" sx={style.bottomTypo}>
          Already have an account?
          <Typography
            color="#fff"
            sx={style.signUpTypo}
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in here
          </Typography>
        </Typography>
      </Box>

      <Box width="100%">
        <Fotter />
      </Box>
    </Box>
  );
};

export default Register;
