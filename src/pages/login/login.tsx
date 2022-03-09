import { AxiosResponse } from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useContext,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import authContext from "../../contexts/authcontext";

interface loginDataInterface {
  email?: string;
  password?: string;
}

interface errorsInterface {
  email?: string;
  password?: string;
}
function Login() {
  const { user, setUser } = useContext(authContext);
  if (user.active) {
    return <Navigate to="/" replace />;
  }
  const [formData, setFormData] = useState<loginDataInterface>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<errorsInterface>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const usenavigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => {
      return { ...formData, [name]: value };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(validateFormData(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(formData);
      async function postData() {
        try {
          const responseData: AxiosResponse = await axiosInstance.post(
            "/sessions",
            formData
          );
          console.log("Successfully logged in", responseData.data.name);
          setUser({ active: true, name: responseData.data.name });

          usenavigate("/", { replace: true });
        } catch (error: any) {
          console.log("could not login: ", error.response.data.message);
        }
      }
      postData();
    }
  }, [errors]);

  const validateFormData = (values: loginDataInterface) => {
    const errorsObject: errorsInterface = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email) {
      errorsObject.email = "Please enter your email address";
    } else if (!regex.test(values.email)) {
      errorsObject.email = "Please enter a valid email";
    }
    if (!values.password) {
      errorsObject.password = "Please enter your password";
    }

    return errorsObject;
  };

  return (
    <div className="signIn">
      {}
      <a href="#" className="brand-logo">
        RajFoods
      </a>
      <form className="signIn-form" onSubmit={handleSubmit}>
        <h2>Sign-In</h2>
        <div className="input-wrapper">
          <label htmlFor="emailLogin">Email</label>
          <input
            id="emailLogin"
            type="email"
            required
            placeholder="example@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <div className="input-wrapper">
          <label htmlFor="passwordLogin">Password</label>
          <input
            id="passwordLogin"
            type="password"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <button>Continue</button>
        <div>
          <p>By continuing, you agree to our terms and conditions.</p>
        </div>
      </form>
      <div>
        <p>Don't have an account?</p>
        <button
          onClick={() => {
            usenavigate("/register");
          }}
        >
          <p>Create your account</p>
        </button>
      </div>
    </div>
  );
}

export default Login;
