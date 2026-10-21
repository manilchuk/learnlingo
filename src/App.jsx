import { useAuth } from "./context/useAuth";

function App() {
  const { user, loading } = useAuth();

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
    </div>
  );
}

export default App;
