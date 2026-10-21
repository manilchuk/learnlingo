import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/validationSchemas";
import { useAuth } from "../../context/useAuth";
import css from "./AuthForms.module.css";

const RegisterForm = ({ onSuccess }) => {
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      setError(null);
      await registerUser(data.name, data.email, data.password);
      onSuccess();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2 className={css.title}>Registration</h2>
      <p className={css.subtitle}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.field}>
          <input
            type="text"
            placeholder="Name"
            className={`${css.input} ${errors.name ? css.inputError : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={css.field}>
          <input
            type="email"
            placeholder="Email"
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={css.field}>
          <div className={css.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`${css.input} ${errors.password ? css.inputError : ""}`}
              {...register("password")}
            />
            <button
              type="button"
              className={css.togglePassword}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="#121417"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="#121417"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
                    stroke="#121417"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </div>

        {error && <p className={css.serverError}>{error}</p>}

        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
