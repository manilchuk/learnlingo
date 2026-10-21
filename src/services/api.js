import { ref, get } from "firebase/database";
import { database } from "../firebase/config";

export const fetchAllTeachers = async () => {
  const teachersRef = ref(database, "teachers");
  const snapshot = await get(teachersRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  return Object.values(data);
};

export const fetchTeachersWithPagination = async (page = 1, limit = 4) => {
  const allTeachers = await fetchAllTeachers();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    teachers: allTeachers.slice(startIndex, endIndex),
    hasMore: endIndex < allTeachers.length,
    total: allTeachers.length,
  };
};

export const fetchTeachersByIds = async (ids) => {
  const allTeachers = await fetchAllTeachers();
  return allTeachers.filter((_, index) => ids.includes(String(index)));
};
