import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({ onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);

  return (
    <Modal onClose={onClose}>
      {mode === "login" ? (
        <LoginForm
          onSuccess={onClose}
          onSwitchToRegister={() => setMode("register")}
        />
      ) : (
        <RegisterForm onSuccess={onClose} />
      )}
      <p style={{ marginTop: 20, textAlign: "center", fontSize: 14 }}>
        {mode === "login" ? "No account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          style={{
            color: "#f4c550",
            fontWeight: 500,
            textDecoration: "underline",
          }}
        >
          {mode === "login" ? "Register" : "Log In"}
        </button>
      </p>
    </Modal>
  );
};

export default AuthModal;
