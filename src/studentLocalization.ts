/**
 * @name isStudentInClassroom
 * @description Checks if the student is in a classroom.
 * @returns {boolean} True if the student is in a classroom, false otherwise.
 */
export const isStudentInClassroom = (): boolean => {
  if (window.location.pathname.includes("/examen/tomar_examen/")) {
    return false;
  }
  if (window.location.pathname.includes("/clases/examen/")) {
    return false;
  }
  if (window.location.pathname.includes("/clases/")) {
    return true;
  }
  return false;
};

/**
 * @name isStudentInExam
 * @description Checks if the student is in an exam.
 * @returns {boolean} True if the student is in an exam, false otherwise.
 */
export const isStudentInExam = (): boolean => {
  return window.location.pathname.includes("/clases/examen/");
}
