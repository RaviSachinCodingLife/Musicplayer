import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../services/FirebaseConfig";
import googleIcon from "../../assets/image/GoogleLogo.png";
import icon from "../../assets/image/CirleCropedImg.png";
import Fotter from "../../components/Fotter/Fotter";
import { useNavigate } from "react-router-dom";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      await updateProfile(userCred.user, { displayName: registerData.name });
      const token = await userCred.user.getIdToken();
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          token,
        })
      );
      navigate("/home");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleRegister = async () => {
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
          Sign up for BeatBox
        </Typography>

        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={registerData.name}
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
            name="email"
            label="Email"
            variant="outlined"
            value={registerData.email}
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
            value={registerData.password}
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
            onClick={handleRegister}
            sx={{
              borderRadius: "50px",
              height: "50px",
              bgcolor: "#8d2c91",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            Sign Up
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleRegister}
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
            Sign up with Google
          </Button>
        </Stack>
        <Typography
          variant="body1"
          display="flex"
          gap={0.5}
          mt={2}
          alignSelf="center"
        >
          Already have an account?
          <Link
            href="/login"
            underline="none"
            color="#fff"
            sx={{
              "&:hover": {
                color: "#8d2c91",
                textDecoration: "underline",
              },
            }}
          >
            Log in here
          </Link>
        </Typography>
      </Box>
      <Box width="100%">
        <Fotter />
      </Box>
    </Box>
  );
};

export default Register;
