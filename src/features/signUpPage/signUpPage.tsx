/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  termsAccepted?: boolean;
}

interface IErrors {
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

const validateEmail = (email: string): string => {
  return /^\S+@\S+\.\S+$/.test(email) ? "" : "Invalid email address";
};

const validatePasswords = (
  password: string,
  confirmPassword: string
): { password: string; confirmPassword: string } => {
  const errors = { password: "", confirmPassword: "" };
  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};

const validateTerms = (termsAccepted: boolean): string => {
  return termsAccepted ? "" : "You must accept the terms and conditions";
};

const InputField: React.FC<{
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  required?: boolean;
}> = ({ id, name, type, value, onChange, error, required = false }) => (
  <div className="mb-6">
    <label className="block text-base font-medium mb-2" htmlFor={id}>
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border-gray-300 rounded-md shadow-md text-lg p-2 ${
        error ? "border-red-500" : ""
      }`}
      required={required}
    />
    {error && <p className="text-red-500 text-base mt-1">{error}</p>}
  </div>
);

const SignUpPage = () => {
  const navigate = useNavigate();

  const [signUp] = useSignUpMutation();
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<IErrors>({
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Real-time validation
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    } else if (name === "password" || name === "confirmPassword") {
      // Validate both password and confirmPassword with the latest values
      const { password, confirmPassword } = validatePasswords(
        name === "password" ? value : formData.password,
        name === "confirmPassword" ? value : formData.confirmPassword
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: name === "password" ? password : prevErrors.password,
        confirmPassword:
          name === "confirmPassword"
            ? confirmPassword
            : prevErrors.confirmPassword,
      }));
    } else if (name === "termsAccepted") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: validateTerms(checked),
      }));
    }
  };

  const validate = () => {
    const newErrors: IErrors = {
      email: validateEmail(formData.email),
      ...validatePasswords(formData.password, formData.confirmPassword),
      terms: validateTerms(formData.termsAccepted as boolean),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const toastId = toast.loading("Sign In.......");

      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { termsAccepted, confirmPassword, ...userInfo } = formData;
        if (userInfo.phone) {
          await signUp(userInfo).unwrap();
          toast.success("Sign In Successful", { id: toastId, duration: 2000 });
          navigate("/sign-in");
        } else {
          const { phone, ...rest } = userInfo;
          await signUp(rest).unwrap();
          toast.success("Sign In Successful", { id: toastId, duration: 2000 });
          navigate("/sign-in");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(`Something went wrong:${err.data.message}`, {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <div>
        <h2 className="text-4xl font-bold text-center mb-8">Sign Up</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <InputField
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error=""
            required
          />
          <InputField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <InputField
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
          <div className="mb-6">
            <label className="block text-base font-medium mb-2" htmlFor="phone">
              Phone Number (optional)
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-md text-lg p-2"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label htmlFor="termsAccepted" className="text-base">
              I accept the{" "}
              <a
                href="/terms-and-conditions"
                className="text-blue-500 underline"
              >
                Terms & Conditions
              </a>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-base mt-1">{errors.terms}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg"
          >
            Sign Up
          </button>

          <p className="mt-6 text-center text-base">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 underline">
              Sign In Instead
            </a>
          </p>
        </form>

        <footer className="mt-8 text-center text-base">
          <p>
            <a href="/privacy-policy" className="text-blue-500 underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms-of-service" className="text-blue-500 underline">
              Terms of Service
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignUpPage;
