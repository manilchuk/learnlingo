import { useEffect, useState } from "react";
import { fetchAllTeachers } from "../../services/api";
import { useFavorites } from "../../hooks/useFavorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import BookTrialModal from "../../components/BookTrialModal/BookTrialModal";
import AuthModal from "../../components/AuthForms/AuthModal";

const Favorites = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const data = await fetchAllTeachers();
        setAllTeachers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTeachers();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  const favoriteTeachers = allTeachers.filter((teacher) =>
    favorites.includes(teacher.id),
  );

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 32 }}>Favorites</h1>

      {favoriteTeachers.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: 40,
            fontSize: 18,
            color: "#8a8a89",
          }}
        >
          You haven't added any teachers to favorites yet.
        </p>
      ) : (
        favoriteTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            teacherId={teacher.id}
            isFavorite={isFavorite(teacher.id)}
            onToggleFavorite={toggleFavorite}
            onBookTrial={(t) => setSelectedTeacher(t)}
            onRequireAuth={() => setIsAuthModalOpen(true)}
          />
        ))
      )}

      {selectedTeacher && (
        <BookTrialModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          initialMode="login"
        />
      )}
    </div>
  );
};

export default Favorites;
