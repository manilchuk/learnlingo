import { useState } from "react";
import { useAuth } from "./context/useAuth";
import AuthModal from "./components/AuthForms/AuthModal";

function App() {
  const { user, loading, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>LearnLingo</h1>
      {user ? (
        <div>
          <p>Вітаємо, {user.displayName || user.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => setIsModalOpen(true)}>Log in</button>
      )}
      {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
