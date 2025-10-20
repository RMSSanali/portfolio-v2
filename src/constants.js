// src/constants.js
export const MENULINKS = [
  { name: "Home", ref: "home" },
  { name: "About", ref: "about" },
  { name: "Projects", ref: "projects" },
  { name: "Timeline", ref: "timeline" },
];

export const TIMELINE = [
  {
    type: "CHECKPOINT",
    year: 2025,
    title: "Studying Cloud Development – Azure",
    subtitle: "JENSEN Yrkeshögskola, Stockholm (2025)",
    badge: "Education",
    icon: "🎓",
    images: [],
  },
  {
    type: "CHECKPOINT",
    year: 2024,
    title: "Completed SVA 2",
    subtitle: "2024",
    badge: "Education",
    icon: "📘",
    images: [],
  },
  {
    type: "CHECKPOINT",
    year: 2023,
    title: "Azure Fundamentals (AZ-900)",
    subtitle: "Aug 2023",
    badge: "Certification",
    icon: "☁️",
    images: ["/timeline/az900.png"],
  },
  {
    type: "CHECKPOINT",
    year: 2023,
    title: "Microsoft 365 Fundamentals (MS-900)",
    subtitle: "Aug 2023",
    badge: "Certification",
    icon: "✅",
    images: ["/timeline/ms900.png"],
  },
  {
    type: "CHECKPOINT",
    year: 2023,
    title: "IT Basics Course",
    subtitle: "GlobalLogic (Apr–May 2023)",
    badge: "Course",
    icon: "🧩",
    images: ["/timeline/GlobalLogic2023.png"], // ensure extension matches
  },
  {
    type: "CHECKPOINT",
    year: 2011, // <-- comma was missing here
    title: "Application Support Coordinator & IT Controller",
    subtitle: "Global Star Auto Trader's Ltd (2011–2022)",
    badge: "Experience",
    icon: "💼",
    images: [],
  },
  {
    type: "CHECKPOINT",
    year: 2008,
    title: "Computer Instructor",
    subtitle: "Golden Key Academy (2008–2009)",
    badge: "Experience",
    icon: "🏫",
    images: [],
  },
];
