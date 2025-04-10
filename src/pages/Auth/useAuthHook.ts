import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../services/FirebaseConfig";

const useLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
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

  return {
    state,
    handleChange,
    navigate,
    toggleShowPassword,
    handleLogin,
    handleGoogleLogin,
  };
};

const useSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCred.user, { displayName: formData.name });
      const token = await userCred.user.getIdToken();
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
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
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          token,
        })
      );
      navigate("/home");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return {
    formData,
    handleChange,
    toggleShowPassword,
    handleRegister,
    handleGoogleRegister,
    navigate,
  };
};

export { useLogin, useSignUp };
