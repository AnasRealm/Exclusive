import { useForm } from "react-hook-form";
import { FormInput } from "../../../../sheard/components/forms/form-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchemaValidation } from "./config";
import { useSignUpMutation } from "../../services/mutations";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { appRoutes } from "../../../../routes/routes.js";
import omit from "lodash/omit";
import { userStorage } from "../../storage";
import sideImage from "../../../../assets/imges/Side Image.png";
import googleIcon from "../../../../assets/imges/Icon-Google.png";

export function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpFormSchemaValidation),
  });
  const { mutateAsync: signUp, isPending } = useSignUpMutation();
  const navigate = useNavigate();

  const onSubmitHandler = handleSubmit(async (values) => {
    try {
      const response = await signUp(omit(values, ["confirmPassword"]));
      userStorage.set(response.id);
      toast.success("Sign up successfully");
      
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
      toast.error("Failed to sign up");
    }
  });

  // Google sign up handler (dummy)
  const handleGoogleSignup = () => {
    toast.info("Google signup not implemented");
  };

  return (
    <>
      <nav className="breadcrumb">
        <Link to={appRoutes.home}>Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Sign Up</span>
      </nav>
      <div className="signup-main-container">
        <div className="signup-image-side">
          <img src={sideImage} alt="Signup Visual" className="signup-image" />
        </div>
      <div className="signup-form-side">
        <form className="signup-form" onSubmit={onSubmitHandler}>
          <h2 className="signup-title">Create an account</h2>
          <p className="signup-subtitle">Enter your details below</p>
          <FormInput
            placeholder="Name"
            errorMessage={errors.name?.message}
            {...register("name")}
          />
          <FormInput
            placeholder="Email or Phone Number"
            errorMessage={errors.email?.message}
            {...register("email")}
          />
          <FormInput
            placeholder="Password"
            type="password"
            errorMessage={errors.password?.message}
            {...register("password")}
          />
          <FormInput
            placeholder="Confirm Password"
            type="password"
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button className="signup-btn" disabled={isPending}>
            {isPending ? "Loading..." : "Create Account"}
          </button>
          <button
            type="button"
            className="signup-google-btn"
            onClick={handleGoogleSignup}
          >
            <img src={googleIcon} alt="Google" className="google-icon" />
            Sign up with Google
          </button>
        </form>
        <div className="signup-login-link">
          Already have account?
          <Link className="login-link-btn" to={appRoutes.auth.login}>
            Log in
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
