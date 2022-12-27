export const filterItems = (users: User[]) => [
  {
    title: "Submitted by",
    className: "submittedBy",
    values: users ? [...new Set(users.map((i) => i.userName))] : [],
    key: "submittedBy",
  },
  {
    title: "Complete",
    className: "complete",
    values: [true, false],
    key: "complete",
  },
];

export const itemTags = [
  "Culture",
  "Food",
  "Trip",
  "Active",
  "Outdoor",
  "Creative",
  "Exhibition",
  "Restaurant",
  "Bar",
  "Hike",
  "Road-trip",
  "Montaña",
  "Playa",
];
