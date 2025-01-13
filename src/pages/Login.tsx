/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import {
  useState,
  useCallback,
  type FormEvent,
  type SyntheticEvent,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface FormInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  placeholder: string;
  label: string;
  forgotPassword?: boolean;
}

/**
 * Reusable form input component with label and optional forgot password link
 * @param props FormInputProps - Component properties
 * @returns Form input element with label
 */
const FormInput = ({
  id,
  type,
  value,
  onChange,
  disabled,
  placeholder,
  label,
  forgotPassword,
}: FormInputProps) => {
  const handleChange = useCallback(
    (e: SyntheticEvent) => {
      const input = e.target as unknown as { value: string };
      onChange(input.value);
    },
    [onChange],
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="text-sm text-white">
          {label}
        </label>
        {forgotPassword && (
          <a
            href="/forgot-password"
            className="text-sm text-[#4A4A4A] hover:text-gray-300"
          >
            Forgot Password?
          </a>
        )}
      </div>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        required
        disabled={disabled}
        placeholder={placeholder}
        className="w-full p-3 bg-white rounded-md text-black 
                 placeholder-gray-500 focus:outline-none"
      />
    </div>
  );
};

interface LoginFormProps {
  error: string;
  email: string;
  password: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

/**
 * Login form component containing email and password inputs
 * @param props LoginFormProps - Component properties
 * @returns Login form with inputs and submit button
 */
const LoginForm = ({
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <FormInput
      id="email"
      type="email"
      value={email}
      onChange={onEmailChange}
      disabled={isLoading}
      placeholder="member@email.com"
      label="Email"
    />
    <FormInput
      id="password"
      type="password"
      value={password}
      onChange={onPasswordChange}
      disabled={isLoading}
      placeholder="Enter your password"
      label="Password"
      forgotPassword
    />
    <button
      type="submit"
      disabled={isLoading}
      className="w-full py-3 bg-[#2A2A2A] text-white rounded-md
               hover:bg-[#3A3A3A] focus:outline-none transition-colors"
    >
      {isLoading ? "Signing in..." : "Sign In"}
    </button>
  </form>
);

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className: string;
  onLoad?: () => void;
}

/**
 * A component that handles image loading states and fallbacks
 * @param props - Component properties
 * @param props.src - Source URL of the image
 * @param props.alt - Alternative text for the image
 * @param props.className - CSS classes to apply to the image
 * @param props.onLoad - Callback function when image loads successfully
 * @returns React component with loading states and error handling
 */
const ImageWithFallback = ({
  src,
  alt,
  className,
  onLoad,
}: ImageWithFallbackProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const imgElement = new window.Image();
    imgElement.src = src;
    imgElement.onload = () => {
      setIsLoading(false);
      onLoad?.();
    };
    imgElement.onerror = () => {
      setIsLoading(false);
      setError(true);
    };
  }, [src, onLoad]);

  if (error) {
    return null;
  }

  return (
    <div className={`relative ${isLoading ? "animate-pulse" : ""}`}>
      <img
        src={src}
        alt={alt}
        className={`
          transition-opacity duration-300 ease-in-out
          ${isLoading ? "opacity-0" : "opacity-100"}
          ${className}
        `}
      />
      {isLoading && <div className="absolute inset-0 bg-gray-700 rounded" />}
    </div>
  );
};

/**
 * Header component for the login page
 * @returns Login page header with logo and title
 */
const LoginHeader = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logotypeLoaded, setLogotypeLoaded] = useState(false);

  const handleLogoLoad = useCallback(() => {
    setLogoLoaded(true);
  }, []);

  const handleLogotypeLoad = useCallback(() => {
    setLogotypeLoaded(true);
  }, []);

  return (
    <header className="text-center mb-8 space-y-4">
      <div className="transform transition-all duration-500 ease-out">
        <ImageWithFallback
          src="/l2a-logo.svg"
          alt="Lodge 2A Logo"
          className="w-24 h-auto mx-auto md:w-32 lg:w-40
                   transform transition-all duration-500
                   hover:scale-105"
          onLoad={handleLogoLoad}
        />
      </div>

      <div
        className={`
        transform transition-all duration-500 ease-out
        ${logoLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
      `}
      >
        <ImageWithFallback
          src="/l2a-logotype.svg"
          alt="Lodge 2A"
          className="h-6 w-auto mx-auto md:h-8 lg:h-10
                   transform transition-all duration-500
                   hover:scale-105"
          onLoad={handleLogotypeLoad}
        />
      </div>

      <p
        className={`
        text-[#4A4A4A] mt-2 text-sm md:text-base
        transform transition-all duration-500 ease-out
        ${logotypeLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
      `}
      >
        Sign in to continue
      </p>
    </header>
  );
};

/**
 * Footer component for the login page
 * @returns Login page footer with sign up link and demo credentials
 */
const LoginFooter = () => (
  <footer className="mt-6 text-center">
    {import.meta.env.DEV && (
      <div className="mt-8 text-xs text-[#4A4A4A]">
        <p>Demo credentials:</p>
        <p>Email: member@email.com</p>
        <p>Password: password</p>
      </div>
    )}
  </footer>
);

/**
 * Login page component for user authentication
 * @returns Complete login page with form and authentication handling
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      try {
        await login(email, password);
        navigate("/dashboard");
      } catch (err) {
        setError("Invalid email or password");
        if (import.meta.env.DEV) {
          window.console.error("Login error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, login, navigate],
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-black p-4">
      <section className="w-full max-w-md p-8 bg-[#1A1A1A] rounded-lg">
        <LoginHeader />
        {error && <div className="mb-6 text-red-400 text-center">{error}</div>}
        <LoginForm
          error={error}
          email={email}
          password={password}
          isLoading={isLoading}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />
        <LoginFooter />
      </section>
    </main>
  );
};

export default Login;
