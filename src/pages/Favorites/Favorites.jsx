import { useEffect, useState } from "react";
import { fetchAllTeachers } from "../../services/api";
import { useFavorites } from "../../hooks/useFavorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import BookTrialModal from "../../components/BookTrialModal/BookTrialModal";
import AuthModal from "../../components/AuthForms/AuthModal";
import css from "./Favorites.module.css";

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

  if (loading) return <div className={css.loading}>Loading...</div>;

  const favoriteTeachers = allTeachers.filter((teacher) =>
    favorites.includes(teacher.id),
  );

  return (
    <div className={css.page}>
      <h1 className={css.title}>Favorites</h1>

      {favoriteTeachers.length === 0 ? (
        <p className={css.emptyMessage}>
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
