import { AxiosError } from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authContext from "../../contexts/authcontext";
import axiosInstance from "../../utils/axiosInstance";
const formDataInitial = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const { user } = useContext(authContext);
  if (user.active) {
    return <Navigate to="/" replace />;
  }
  interface ErrorsInterface {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
  interface postedResultInterface {
    success?: boolean;
    error?: string;
  }
  const [errors, setErrors] = useState<ErrorsInterface>({});

  const [formData, setFormData] =
    useState<typeof formDataInitial>(formDataInitial);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [postedResult, setPostedResult] = useState<postedResultInterface>({});
  //
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const usenavigate = useNavigate();
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setErrors({});
    setErrors(() => validateData(formData));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      async function postData() {
        try {
          const data = await axiosInstance.post("/register", formData);
          setPostedResult({ success: true });
          usenavigate("/login");
        } catch (error: any) {
          setPostedResult({
            success: false,
            error: error.response.data.message,
          });
          console.log(error.response.data.message);
        }
      }
      postData();
    }
  }, [errors]);

  const validateData = useCallback(
    (values: typeof formDataInitial) => {
      console.log("validate was called");
      let errorsObject: ErrorsInterface = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!values.firstName) {
        errorsObject.firstName = "Please Enter your firstName";
      } else if (values.firstName.length > 20) {
        errorsObject.firstName =
          "FirstName should be less than 20 characters long";
      }
      if (!values.lastName) {
        errorsObject.lastName = "Please Enter your LastName";
      } else if (values.firstName.length > 20) {
        errorsObject.lastName =
          "LastName should be less than 20 characters long";
      }
      if (!values.email) {
        errorsObject.email = "Please enter your email address";
      } else if (!regex.test(values.email)) {
        errorsObject.email = "Please enter a valid email";
      }
      if (!values.password) {
        errorsObject.password = "Password is required";
      } else if (values.password.length < 4) {
        errorsObject.password = "Password must be more than 4 characters";
      } else if (values.password.length > 20) {
        errorsObject.password =
          "Password cannot exceed more than 20 characters";
      }
      if (!values.confirmPassword) {
        errorsObject.confirmPassword = "Please confirm your password ";
      } else if (values.password !== values.confirmPassword) {
        errorsObject.confirmPassword = "Passwords do not match";
      }

      return errorsObject;
    },
    [setErrors]
  );

  return (
    <div className="signup-page">
      <div className="signup-box-left">
        <h2>Looks like you're new here!</h2>
        <h3>Sign up with your email address to get started</h3>
      </div>
      <div className="signup-form">
        <div>
          {Object.keys(postedResult).length > 0 && postedResult.success ? (
            <p style={{ color: "green", fontWeight: 900 }}>
              <i className="fas fa-check-double"></i> Registered Successfully!!
            </p>
          ) : (
            <p style={{ color: "red", fontWeight: 900 }}>
              {postedResult.error && (
                <i className="fas fa-exclamation-circle"></i>
              )}
              {postedResult.error}
            </p>
          )}
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="input-wrapper">
            <label htmlFor="firstName">FirstName</label>
            <input
              id="firstName"
              type="text"
              required
              placeholder="op"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <p>{errors.firstName}</p>
          <div className="input-wrapper">
            <label htmlFor="lastName">LastName</label>
            <input
              id="lastName"
              type="text"
              required
              placeholder="saran"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <p>{errors.lastName}</p>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <p>{errors.email}</p>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <p>{errors.password}</p>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <p>{errors.confirmPassword}</p>
          <button>CONTINUE</button>
        </form>
        <button
          onClick={() => {
            usenavigate("/login");
          }}
        >
          Existing User? Log in
        </button>
      </div>
    </div>
  );
}

export default Signup;
