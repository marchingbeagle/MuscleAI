import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const fetchStudents = async () => {
  const querySnapshot = await getDocs(collection(db, "alunos"));
  const students = querySnapshot.docs.map(doc => doc.data());
  return students;
};

const studentsFirebase = await fetchStudents();