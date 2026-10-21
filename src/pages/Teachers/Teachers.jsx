import { useEffect, useState } from "react";
import { fetchAllTeachers } from "../../services/api";
import { useFavorites } from "../../hooks/useFavorites";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

const ITEMS_PER_PAGE = 3;

const Teachers = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  const visibleTeachers = allTeachers.slice(0, visibleCount);
  const hasMore = visibleCount < allTeachers.length;

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      {visibleTeachers.map((teacher, index) => (
        <TeacherCard
          key={index}
          teacher={teacher}
          teacherId={String(index)}
          isFavorite={isFavorite(String(index))}
          onToggleFavorite={toggleFavorite}
          onBookTrial={(t) => console.log("Book trial:", t)}
        />
      ))}

      {hasMore && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
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
    </div>
  );
};

export default Teachers;
