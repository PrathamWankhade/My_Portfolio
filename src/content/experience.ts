/**
 * Professional experience, education, skills, and achievements.
 * Source of truth: resumes, official TGPCET marksheet + provisional degree
 * certificate, and the public GitHub repositories.
 */

export type ExperienceEntry = {
  type: "work" | "education";
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  skills?: string[];
  /** Optional short verifiable line under the organization (e.g. CGPA). */
  detail?: string;
};

export const experience: ExperienceEntry[] = [
  {
    type: "work",
    title: "Machine Learning Intern",
    organization: "Align Infotech",
    location: "Nagpur, Maharashtra, India",
    period: "Jul 2025 – Oct 2025",
    description:
      "Built NLP-based resume parsing and semantic matching pipelines (Python, spaCy) for ATS optimization.",
    highlights: [
      "Structured resume–job matching data pipelines end to end",
    ],
    skills: ["Python", "spaCy", "NLP"],
  },
  {
    type: "work",
    title: "Machine Learning Intern",
    organization: "AD Infocom Systems",
    location: "Nagpur, Maharashtra, India",
    period: "Dec 2024 – Jan 2025",
    description:
      "Built an AI product-recommendation chatbot for an e-commerce website, recommending products from user purchase behavior.",
    highlights: [],
    skills: ["Python", "Machine Learning"],
  },
  {
    type: "work",
    title: "Class Representative & Project Team Lead",
    organization: "Tulsiramji Gaikwad-Patil College of Engineering & Technology",
    location: "Nagpur, Maharashtra, India",
    period: "Aug 2023 – May 2026",
    description:
      "Elected class representative and project team lead — the liaison between faculty and 75+ students; led AI-based project teams and organized campus workshops.",
    highlights: [],
  },
  {
    type: "education",
    title: "Bachelor of Technology in Information Technology",
    organization:
      "Tulsiramji Gaikwad-Patil College of Engineering & Technology (TGPCET)",
    location: "Nagpur, Maharashtra, India",
    period: "2022 – 2026",
    detail: "CGPA 9.10/10 · First Class with Distinction",
    description:
      "Autonomous institute affiliated to Rashtrasant Tukadoji Maharaj Nagpur University.",
    highlights: [
      "Coursework: DSA, DBMS, OS, computer networks, AI/ML, cloud computing, IoT, security",
    ],
    skills: ["Python", "Java", "C++", "SQL"],
  },
  {
    type: "education",
    title: "Higher Secondary Certificate (HSC)",
    organization: "Harikisan Maloo International School",
    location: "Amravati, Maharashtra, India",
    period: "2022",
    description:
      "Completed higher secondary education (science stream).",
    highlights: [],
  },
  {
    type: "education",
    title: "Secondary School Certificate (SSC)",
    organization: "Golden Kids English High School",
    location: "Amravati, Maharashtra, India",
    period: "2020",
    description: "Completed matriculation.",
    highlights: [],
  },
];

export type SkillGroup = {
  name: string;
  skills: string[];
  level: "working" | "proficient" | "expert";
  /** Project slugs where this group's skills were actually applied. */
  usedIn?: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Dart", "SQL", "C++", "Bash"],
    level: "proficient",
    usedIn: ["onebit", "faceSnap", "aipfl-ids", "phishing-detection"],
  },
  {
    name: "AI & computer vision",
    skills: [
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
      "OpenCV",
      "spaCy",
      "InsightFace",
      "NLP",
      "Computer Vision",
    ],
    level: "proficient",
    usedIn: ["faceSnap", "aipfl-ids", "phishing-detection"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    level: "proficient",
    usedIn: ["faceSnap", "phishing-detection", "aipfl-ids"],
  },
  {
    name: "Mobile",
    skills: ["Flutter", "Dart", "Riverpod", "Material 3"],
    level: "proficient",
    usedIn: ["onebit"],
  },
  {
    name: "Backend & APIs",
    skills: ["FastAPI", "Flask", "Node.js"],
    level: "proficient",
    usedIn: ["faceSnap", "phishing-detection", "aipfl-ids"],
  },
  {
    name: "Databases",
    skills: ["SQLite", "Qdrant", "Firebase", "Drift (SQLite)"],
    level: "working",
    usedIn: ["onebit", "faceSnap", "phishing-detection"],
  },
  {
    name: "Infrastructure & tools",
    skills: ["Docker", "Linux", "Git", "AWS"],
    level: "working",
    usedIn: ["aipfl-ids", "phishing-detection"],
  },
];

export type Achievement = {
  title: string;
  organization: string;
  kind: "award" | "certification";
  /** Year only when it can be verified; certifications may omit it. */
  date?: string;
  description: string;
  url?: string;
};

export const achievements: Achievement[] = [
  {
    title: "CyberHack 2025 — Top 20 National Finalist",
    organization: "Selected under the Cyber Police Division",
    kind: "award",
    date: "2025",
    description:
      "Among the top 20 national teams for a dark-web surveillance prototype: Python automation over Tor to collect and triage posts, with NLP/NER prioritization and real-time dashboards for analysis. Resume-reported; no public repository.",
  },
  {
    title: "Geodata Processing Using Python & ML",
    organization: "Indian Space Research Organisation (ISRO)",
    kind: "certification",
    description:
      "Certified in geospatial data processing with Python and machine learning for remote-sensing and Earth-observation workflows.",
  },
  {
    title: "AWS Academy Graduate — Machine Learning Foundations",
    organization: "AWS Academy",
    kind: "certification",
    description:
      "Completed the AWS Academy machine learning foundations curriculum covering core ML concepts and AWS ML services.",
  },
];

export type Talk = {
  title: string;
  event: string;
  date: string;
  description: string;
};

export const talks: Talk[] = [
  {
    title: "Federated Learning for Privacy-Preserving Intrusion Detection",
    event: "Campus Tech Symposium",
    date: "2025",
    description:
      "Presented research on AIPFL-IDS — federated learning applied to network intrusion detection. Presented, never published.",
  },
];

export const profile = {
  name: "Pratham Wankhade",
  role: "AI/ML & Full-Stack Engineer",
  location: "Amravati, Maharashtra, India",
  email: "prathamwankhade2004@gmail.com",
  phone: "+91 77578 48083",
  github: "github.com/PrathamWankhade",
  linkedin: "linkedin.com/in/pratham-wankhade",
  site: "portfolio.prathamwankhade.dev",
  bio: `B.Tech IT graduate (TGPCET Nagpur, First Class with Distinction). I build AI, security, and offline-first systems — each project documented with its architecture, trade-offs, and honest limits.`,
};
