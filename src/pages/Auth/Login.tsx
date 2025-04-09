import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/FirebaseConfig";
import googleIcon from "../../assets/image/GoogleLogo.png";
import icon from "../../assets/image/CirleCropedImg.png";
import Fotter from "../../components/Fotter/Fotter";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const user = userCred.user;
      const token = await user.getIdToken();
      localStorage.setItem(
        "user",
        JSON.stringify({ name: user.displayName, email: user.email, token })
      );
      navigate("/home");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem(
        "user",
        JSON.stringify({ name: user.displayName, email: user.email, token })
      );
      navigate("/home");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#121212"
      px={2}
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth="400px"
        bgcolor="#212121"
        borderRadius={2}
        p={4}
        boxShadow={4}
      >
        <img
          src={icon}
          alt="icon"
          width="60px"
          height="60px"
          style={{ alignSelf: "center" }}
        />
        <Typography
          variant="h5"
          fontWeight={600}
          color="#fff"
          textAlign="center"
          mb={3}
        >
          Login to BeatBox
        </Typography>

        <Stack spacing={2}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            value={loginData.email}
            onChange={handleChange}
            InputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#aaa" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#8d2c91" },
                "&:hover fieldset": { borderColor: "#aaa" },
              },
            }}
          />
          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            value={loginData.password}
            onChange={handleChange}
            InputProps={{
              style: { color: "#fff" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{ color: "#aaa" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: "#aaa" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#8d2c91" },
                "&:hover fieldset": { borderColor: "#aaa" },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              borderRadius: "50px",
              height: "50px",
              bgcolor: "#8d2c91",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            Login
          </Button>

          <Divider sx={{ color: "#aaa", fontSize: 14 }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={{
              borderRadius: "50px",
              height: "50px",
              color: "#fff",
              fontWeight: 500,
              borderColor: "#555",
              "&:hover": { borderColor: "#aaa" },
              pl: 2,
            }}
          >
            <img
              src={googleIcon}
              alt="Google"
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            Sign in with Google
          </Button>
        </Stack>
        <Typography
          variant="body1"
          display={"flex"}
          gap={0.5}
          mt={2}
          alignSelf={"center"}
        >
          Don't have an account?
          <Link
            href="/signup"
            underline="none"
            display="block"
            color="#fff"
            sx={{
              "&: hover": { color: "#8d2c91", textDecoration: "underline" },
            }}
          >
            Sign up for Spotify
          </Link>
        </Typography>
      </Box>
      <Box width="100%">
        <Fotter />
      </Box>
    </Box>
  );
};

export default Login;
