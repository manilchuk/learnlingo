import { useEffect, useState } from "react";
import { fetchAllTeachers } from "../../services/api";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await fetchAllTeachers();
        console.log("Teachers loaded:", data);
        setTeachers(data);
      } catch (err) {
        console.error("Error loading teachers:", err);
        setError("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (error) return <div style={{ padding: 40 }}>{error}</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Teachers ({teachers.length})</h1>
      <pre>{JSON.stringify(teachers[0], null, 2)}</pre>
    </div>
  );
};

export default Teachers;
