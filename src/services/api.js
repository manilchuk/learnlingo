import { ref, get } from "firebase/database";
import { database } from "../firebase/config";

export const fetchAllTeachers = async () => {
  const teachersRef = ref(database, "teachers");
  const snapshot = await get(teachersRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  return Object.entries(data).map(([id, teacher]) => ({ id, ...teacher }));
};
