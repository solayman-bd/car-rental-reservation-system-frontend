import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IFormData {
  email: string;
  password: string;
}

interface IErrors {
  email: string;
  password: string;
}

const validateEmail = (email: string): string =>
  /^\S+@\S+\.\S+$/.test(email) ? "" : "Invalid email address";

const validatePassword = (password: string): string =>
  password.length < 6 ? "Password must be at least 6 characters" : "";

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
      className={`w-full border-gray-300 rounded-md shadow-sm text-lg p-2 ${
        error ? "border-red-500" : ""
      }`}
      required={required}
    />
    {error && <p className="text-red-500 text-base mt-1">{error}</p>}
  </div>
);

const SignInPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<IErrors>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Real-time validation
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    } else if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: IErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Simulate successful login
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <div>
        <h2 className="text-4xl font-bold text-center mb-8">Sign In</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
        >
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md text-lg"
          >
            Sign In
          </button>
          <p className="mt-6 text-center text-base">
            <Link to="/forgot-password" className="text-blue-500 underline">
              Forgot Password?
            </Link>
          </p>
          <p className="mt-2 text-center text-base">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 underline">
              Sign Up Instead
            </Link>
          </p>
        </form>
        <footer className="mt-8 text-center text-base">
          <p>
            <Link to="/privacy-policy" className="text-blue-500 underline">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/terms-of-service" className="text-blue-500 underline">
              Terms of Service
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignInPage;
