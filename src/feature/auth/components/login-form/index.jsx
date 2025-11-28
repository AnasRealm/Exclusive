import { useForm } from "react-hook-form";
import { FormInput } from "../../../../sheard/components/forms/form-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchemaValidation } from "./config";
import { useLoginMutation } from "../../services/mutations";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { appRoutes } from "../../../../routes/routes.js";
import { userStorage } from "../../storage";
import sideImage from "../../../../assets/imges/Side Image.png";

export function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginFormSchemaValidation),
  });
  const { mutateAsync: login, isPending } = useLoginMutation();
  const navigate = useNavigate();

  const onSubmitHandler = handleSubmit(async (values) => {
    try {
      const response = await login(values);
      userStorage.set(response.id);
      toast.success("Login successful");
      
      // Check if there's a redirect URL
      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl);
      } else {
        navigate(appRoutes.home);
      }
    } catch (e) {
      console.log(e);
      toast.error("Invalid credentials");
    }
  });

  return (
    <>
      <nav className="breadcrumb">
        <Link to={appRoutes.home}>Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Login</span>
      </nav>
      <div className="login-main-container">
        <div className="login-image-side">
          <img src={sideImage} alt="Login Visual" className="login-image" />
        </div>
        <div className="login-form-side">
          <form className="login-form" onSubmit={onSubmitHandler}>
            <h2 className="login-title">Log in to Exclusive</h2>
            <p className="login-subtitle">Enter your details below</p>
            <FormInput
              placeholder="Email"
              errorMessage={errors.email?.message}
              {...register("email")}
            />
            <FormInput
              type="password"
              placeholder="Password"
              errorMessage={errors.password?.message}
              {...register("password")}
            />
            <div className="login-actions">
              <button type="submit" className="login-btn" disabled={isPending}>
                {isPending ? "Loading..." : "Log In"}
              </button>
              <Link to="#" className="login-forgot">
                Forget Password?
              </Link>
            </div>
          </form>
          <div className="login-signup-link">
            Don't have an account?
            <Link className="signup-link-btn" to={appRoutes.auth.signUp}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
