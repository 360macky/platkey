/**
 * @name isStudentInClassroom
 * @description Checks if the student is in a classroom.
 */
export const isStudentInClassroom = () => {
  if (window.location.pathname.includes("/examen/tomar_examen/")) {
    return false;
  }
  if (window.location.pathname.includes("/clases/")) {
    return true;
  }
}
