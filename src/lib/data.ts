export type Facility = {
  id: string;
  name: string;
  type: "Classroom" | "Laboratory" | "Library" | "Canteen" | "Administration";
  building: string;
  floor: string;
  room: string;
  directions: string;
};

export const facilities: Facility[] = [
  { id: "f1", name: "Lecture Hall A1", type: "Classroom", building: "Academic Block A", floor: "Ground", room: "A-101", directions: "Enter through the main gate, Block A is straight ahead. Hall is first on your left." },
  { id: "f2", name: "Seminar Room A2", type: "Classroom", building: "Academic Block A", floor: "2nd", room: "A-204", directions: "Take the central staircase in Block A to the 2nd floor, turn right." },
  { id: "f3", name: "Classroom B3", type: "Classroom", building: "Academic Block B", floor: "1st", room: "B-112", directions: "From Block A, walk across the courtyard to Block B. First floor, end of corridor." },
  { id: "f4", name: "Computer Lab 1", type: "Laboratory", building: "Tech Centre", floor: "1st", room: "TC-105", directions: "Tech Centre is behind Block B. Use the lift to the 1st floor, lab is opposite the lift." },
  { id: "f5", name: "Physics Lab", type: "Laboratory", building: "Science Block", floor: "Ground", room: "S-002", directions: "Science Block is next to the parking area. Lab is down the left corridor." },
  { id: "f6", name: "Chemistry Lab", type: "Laboratory", building: "Science Block", floor: "1st", room: "S-110", directions: "Up the stairs in the Science Block, second door on the right." },
  { id: "f7", name: "Central Library", type: "Library", building: "Library Building", floor: "Ground–3rd", room: "LIB", directions: "Located beside the main lawn. Entry and issue counter are on the ground floor." },
  { id: "f8", name: "Main Canteen", type: "Canteen", building: "Student Centre", floor: "Ground", room: "SC-01", directions: "Walk past the library towards the sports ground. Canteen is at the Student Centre entrance." },
  { id: "f9", name: "Café Corner", type: "Canteen", building: "Tech Centre", floor: "Ground", room: "TC-010", directions: "Ground floor of the Tech Centre, near the rear exit." },
  { id: "f10", name: "Admissions Office", type: "Administration", building: "Admin Block", floor: "Ground", room: "AD-003", directions: "Admin Block is immediately right of the main gate. Office is at reception." },
  { id: "f11", name: "Accounts & Fees", type: "Administration", building: "Admin Block", floor: "1st", room: "AD-108", directions: "Take the stairs in the Admin Block to the 1st floor, counter on the left." },
  { id: "f12", name: "Examination Cell", type: "Administration", building: "Admin Block", floor: "2nd", room: "AD-201", directions: "Admin Block 2nd floor, first room after the stairs." },
];

export type ClassItem = { id: string; day: string; subject: string; start: string; end: string; room: string; faculty: string };

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const base: Omit<ClassItem, "id" | "day">[][] = [
  [
    { subject: "Data Structures", start: "09:00", end: "10:00", room: "A-101", faculty: "Dr. R. Mehta" },
    { subject: "Discrete Mathematics", start: "10:15", end: "11:15", room: "A-204", faculty: "Prof. S. Iyer" },
    { subject: "Programming Lab", start: "13:00", end: "15:00", room: "TC-105", faculty: "Ms. K. Rao" },
  ],
  [
    { subject: "Digital Electronics", start: "09:00", end: "10:00", room: "B-112", faculty: "Dr. A. Verma" },
    { subject: "Engineering Physics", start: "11:30", end: "12:30", room: "A-101", faculty: "Dr. P. Nair" },
    { subject: "Physics Lab", start: "14:00", end: "16:00", room: "S-002", faculty: "Dr. P. Nair" },
  ],
  [
    { subject: "Data Structures", start: "09:00", end: "10:00", room: "A-101", faculty: "Dr. R. Mehta" },
    { subject: "Communication Skills", start: "10:15", end: "11:15", room: "A-204", faculty: "Ms. N. Das" },
  ],
  [
    { subject: "Discrete Mathematics", start: "09:00", end: "10:00", room: "A-204", faculty: "Prof. S. Iyer" },
    { subject: "Digital Electronics", start: "10:15", end: "11:15", room: "B-112", faculty: "Dr. A. Verma" },
    { subject: "Chemistry Lab", start: "13:00", end: "15:00", room: "S-110", faculty: "Dr. M. Khan" },
  ],
  [
    { subject: "Engineering Physics", start: "09:00", end: "10:00", room: "A-101", faculty: "Dr. P. Nair" },
    { subject: "Data Structures Tutorial", start: "11:30", end: "12:30", room: "B-112", faculty: "Dr. R. Mehta" },
  ],
  [],
];

export const timetable: ClassItem[] = base.flatMap((list, i) =>
  list.map((c, j) => ({ ...c, id: `${i}-${j}`, day: days[i] ?? "" })),
);

export type Notice = { id: string; title: string; body: string; category: "Academic" | "Events" | "General"; date: string };

export const notices: Notice[] = [
  { id: "n1", title: "Mid-semester exam schedule released", body: "The mid-semester examination timetable is available at the Examination Cell (AD-201).", category: "Academic", date: "2026-10-14" },
  { id: "n2", title: "Annual tech fest registrations open", body: "Register your teams for coding, robotics and quiz events at the Student Centre desk.", category: "Events", date: "2026-10-13" },
  { id: "n3", title: "Library hours extended", body: "The Central Library will remain open until 9 PM on weekdays during exam weeks.", category: "General", date: "2026-10-12" },
  { id: "n4", title: "Assignment submission deadline", body: "Data Structures Assignment 3 is due by Friday, 5 PM.", category: "Academic", date: "2026-10-11" },
  { id: "n5", title: "Inter-department football match", body: "Cheer for your department at the sports ground this Saturday at 4 PM.", category: "Events", date: "2026-10-10" },
  { id: "n6", title: "Fee payment reminder", body: "Semester fee payments are accepted at Accounts (AD-108) until the end of the month.", category: "General", date: "2026-10-09" },
  { id: "n7", title: "Guest lecture on AI ethics", body: "A guest lecture will be held in Lecture Hall A1 next Wednesday at 11 AM.", category: "Academic", date: "2026-10-08" },
];

export function todayName() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}
