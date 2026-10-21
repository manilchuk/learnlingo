import { useState } from "react";
import { useAuth } from "./context/useAuth";
import Modal from "./components/Modal/Modal";

function App() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>LearnLingo</h1>
      {user ? (
        <p>Вітаємо, {user.displayName || user.email}!</p>
      ) : (
        <p>Ви не авторизовані.</p>
      )}
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Тестова модалка</h2>
          <p>Спробуйте закрити її трьома способами: хрестик, backdrop, Esc.</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
