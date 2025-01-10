import { useState, useCallback } from "react";

/**
 * LoginForm component for user authentication
 * @returns React component with login form
 */
export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  /**
   * Handle form submission
   * @param e - Form submission event
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form
      let isValid = true;

      if (!email) {
        setEmailError("Email is required");
        isValid = false;
      }

      if (!password) {
        setPasswordError("Password is required");
        isValid = false;
      }

      if (isValid) {
        // Handle login logic here
        console.error("TODO: Implement login logic");
      }
    },
    [email, password]
  );

  /**
   * Handle email input changes
   * @param e - Change event from email input
   */
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setEmailError("");
    },
    []
  );

  /**
   * Handle password input changes
   * @param e - Change event from password input
   */
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordError("");
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <span data-testid="email-error">{emailError}</span>}
      </div>

      <div>
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && (
          <span data-testid="password-error">{passwordError}</span>
        )}
      </div>

      <button type="submit" data-testid="login-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
