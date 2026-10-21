import { useEffect, useState, useMemo } from "react";
import { fetchAllTeachers } from "../../services/api";
import { useFavorites } from "../../hooks/useFavorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Filter from "../../components/Filter/Filter";
import BookTrialModal from "../../components/BookTrialModal/BookTrialModal";
import AuthModal from "../../components/AuthForms/AuthModal";

const ITEMS_PER_PAGE = 3;

const Teachers = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: null,
  });
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter((teacher) => {
      if (filters.language && !teacher.languages.includes(filters.language)) {
        return false;
      }
      if (filters.level && !teacher.levels.includes(filters.level)) {
        return false;
      }
      if (filters.price && teacher.price_per_hour > filters.price) {
        return false;
      }
      return true;
    });
  }, [allTeachers, filters]);

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTeachers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <Filter filters={filters} onFilterChange={handleFilterChange} />

      {filteredTeachers.length === 0 ? (
        <p style={{ textAlign: "center", padding: 40 }}>
          No teachers match your filters.
        </p>
      ) : (
        <>
          {visibleTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              teacherId={teacher.id}
              isFavorite={isFavorite(teacher.id)}
              onToggleFavorite={toggleFavorite}
              onBookTrial={(t) => setSelectedTeacher(t)}
              onRequireAuth={() => setIsAuthModalOpen(true)}
            />
          ))}

          {hasMore && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              <button
                onClick={handleLoadMore}
                style={{
                  padding: "16px 48px",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#121417",
                  backgroundColor: "#f4c550",
                  borderRadius: 12,
                }}
              >
                Load more
              </button>
            </div>
          )}
        </>
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

export default Teachers;
