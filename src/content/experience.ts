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
};

export const experience: ExperienceEntry[] = [
  {
    type: "work",
    title: "Independent Open-Source Developer",
    organization: "Self-directed",
    location: "Amravati, Maharashtra, India",
    period: "2024 — Present",
    description:
      "Building and publishing original systems — mesh messaging, face-verified attendance, federated intrusion detection, and phishing detection — each documented with architecture, trade-offs, and honest limits.",
    highlights: [
      "OneBit — BLE mesh messenger with end-to-end encryption (Flutter/Dart)",
      "FaceSnap — face-verified attendance (Next.js + FastAPI + InsightFace)",
      "AIPFL-IDS — simulated federated intrusion detection research prototype",
      "Phishing detection — traceable verdicts with a published evaluation protocol",
    ],
    skills: ["Flutter", "Dart", "Python", "TypeScript", "TensorFlow"],
  },
  {
    type: "work",
    title: "AIML Intern",
    organization: "Align Infotech",
    location: "Nagpur, Maharashtra, India",
    period: "July 2025 — October 2025",
    description:
      "Built NLP-based resume parsing and semantic matching systems for ATS optimization.",
    highlights: [
      "Built resume parsing and semantic matching pipelines with Python and spaCy",
      "Improved preprocessing and inference workflows for faster real-time responses",
      "Worked with structured data pipelines for resume–job matching",
    ],
    skills: ["Python", "spaCy", "NLP"],
  },
  {
    type: "work",
    title: "AIML Intern",
    organization: "AD Infocom Systems",
    location: "Nagpur, Maharashtra, India",
    period: "December 2024 — January 2025",
    description:
      "Built an AI-powered chatbot that recommended products based on user purchase behavior.",
    highlights: [
      "Built an AI product-recommendation chatbot for an e-commerce website",
      "Optimized ML workflows to improve recommendation relevance and response performance",
    ],
    skills: ["Python", "Machine Learning"],
  },
  {
    type: "work",
    title: "Class Representative & Project Team Lead",
    organization: "Tulsiramji Gaikwad-Patil College of Engineering & Technology",
    location: "Nagpur, Maharashtra, India",
    period: "August 2023 — 2026",
    description:
      "Elected class representative and project team lead — the liaison between faculty and 75+ students.",
    highlights: [
      "Served as the liaison between faculty and 75+ students",
      "Led technical teams on AI-based project development",
      "Organized workshops and peer initiatives on campus",
    ],
  },
  {
    type: "education",
    title: "Bachelor of Technology in Information Technology",
    organization:
      "Tulsiramji Gaikwad-Patil College of Engineering & Technology (TGPCET), Nagpur",
    location: "Nagpur, Maharashtra, India",
    period: "2022 — 2026",
    description:
      "Graduated Summer 2026 with First Class with Distinction (final CGPA 9.10). Autonomous institute affiliated to Rashtrasant Tukadoji Maharaj Nagpur University.",
    highlights: [
      "Coursework: data structures, algorithms, DBMS, operating systems, computer networks, TCP/IP",
      "Coursework: software engineering & project management, cloud computing, internet of things",
      "Coursework: artificial intelligence & machine learning, cryptography & information security",
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
  date: string;
  description: string;
  url?: string;
};

export const achievements: Achievement[] = [
  {
    title: "CyberHack 2025 — Top 20 National Finalist",
    organization: "Selected under the Cyber Police Division",
    date: "2025",
    description:
      "Among the top 20 national teams for a dark-web surveillance prototype: Python automation over Tor to collect and triage posts, with NLP/NER prioritization and real-time dashboards for analysis. Resume-reported; no public repository.",
  },
  {
    title: "Geodata Processing Using Python & ML",
    organization: "Indian Space Research Organisation (ISRO)",
    date: "Certification",
    description:
      "Certified in geospatial data processing with Python and machine learning for remote-sensing and Earth-observation workflows.",
  },
  {
    title: "AWS Academy Graduate — Machine Learning Foundations",
    organization: "AWS Academy",
    date: "Certification",
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
  bio: `B.Tech IT graduate (TGPCET Nagpur, First Class with Distinction). I build AI, security, and offline-first systems — mesh messaging, face-verified attendance, federated intrusion detection, and phishing detection — each documented with architecture, trade-offs, and honest limits.`,
};
