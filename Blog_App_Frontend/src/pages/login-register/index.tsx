import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/auth.context";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.constant";
import styles from "./index.module.css";
import loginBgImage from "../../assets/login.png";
import { ArrowRight, UserPlus } from "@mynaui/icons-react";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { api } from "../../configs/axios.config";
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from "../../types/app.type";

const LoginRegisterScreen = () => {
  const { login, authState } = useAuth();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; login?: string; username?: string }>({});

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate(APP_ROUTES.ROOT);
    }
  }, [authState.isAuthenticated]);

  const handleLogin = async () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email ID is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    const payload = { email, password };
    try {
      const response = await api.post<ILoginResponse, ILoginRequest>(API_ENDPOINTS.LOGIN, payload, {});
      if (response.data.exception == null) {
        login(response.data.responseData.token);
      } else {
        alert(response.data.responseMessage);
      }
    } catch {
      setErrors({ login: "Invalid Credentials. Please try again." });
    }
  };

  const handleRegister = async () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email ID is required";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    const payload = { email, username, password };
    try {
      const response = await api.post<IRegisterResponse, IRegisterRequest>(API_ENDPOINTS.REGISTER, payload, {});
      if (response.data.exception == null && response.data.responseData.error != true) {
        alert("Account created! Please login.");
        setIsLoginMode(true);
      } else {
        setErrors({ login: "Something went wrong. Try again later." });
      }
    } catch {
      setErrors({ login: "Something went wrong. Try again later." });
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginFormWrapper}>
        <div className={styles.loginForm}>
          <form>
            <h2>{isLoginMode ? "Welcome Back to inkedin" : "Create Your Account"}</h2>
            {!isLoginMode && (
              <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className={styles.errorText}>{errors.username}</div>}
              </div>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className={styles.errorText}>{errors.email}</div>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className={styles.errorText}>{errors.password}</div>}
            </div>
            <button
              type="button"
              className={styles.loginButton}
              onClick={isLoginMode ? handleLogin : handleRegister}
            >
              <div className={styles.loginButtonText}>
                <div>{isLoginMode ? "Log In" : "Register"}</div>
                {isLoginMode ? <ArrowRight size={24} /> : <UserPlus size={24} />}
              </div>
            </button>
            {errors.login && <div className={styles.errorText}>{errors.login}</div>}
            <div className={styles.toggleModeText}>
              {isLoginMode ? (
                <>
                  Don't have an account?{" "}
                  <span onClick={() => setIsLoginMode(false)}>Register</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setIsLoginMode(true)}>Login</span>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className={styles.loginImage}>
        <img src={loginBgImage} alt="login" />
      </div>
    </div>
  );
};

export default LoginRegisterScreen;
