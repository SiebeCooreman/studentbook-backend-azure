// import { RowDataPacket } from 'mysql2';
// import { User } from '../types';

// const mapToUsers = (rows: RowDataPacket[]): Lecturer[] => {
//     const result = [];

//     rows.forEach(
//         ({
//             lecturer_id,
//             lecturer_name,
//             course_id,
//             course_name,
//             course_description,
//             course_phase,
//         }) => {
//             const course = {
//                 id: course_id,
//                 name: course_name,
//                 description: course_description,
//                 phase: course_phase,
//             };

//             const existing = result.find((el) => el.id === lecturer_id);
//             if (!existing) {
//                 result.push({
//                     id: lecturer_id,
//                     name: lecturer_name,
//                     courses: [course],
//                 });
//             } else {
//                 existing.courses.push(course);
//             }
//         }
//     );

//     return result;
// };

// export default mapToUsers;
