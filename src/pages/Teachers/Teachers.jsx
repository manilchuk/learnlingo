import { useEffect, useState } from "react";
import { fetchAllTeachers } from "../../services/api";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await fetchAllTeachers();
        setTeachers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTeachers();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      {teachers.slice(0, 2).map((teacher, index) => (
        <TeacherCard
          key={index}
          teacher={teacher}
          teacherId={String(index)}
          isFavorite={false}
          onToggleFavorite={(id) => console.log("Toggle favorite:", id)}
          onBookTrial={(t) => console.log("Book trial:", t)}
        />
      ))}
    </div>
  );
};

export default Teachers;
