/**
 * Professional experience, education, skills, and achievements.
 * Source of truth: resumes, official TGPCET marksheet + provisional degree
 * certificate, the public GitHub repositories, and the certificate PDFs in
 * "CERTIFICATIONS AND ACHIEVEMENTS" (AWS/Credly, ISRO-IIRS, ICAIA 2025,
 * AIDCon-2025, CyberHack 2025).
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
      "Built NLP-based resume parsing and semantic job-matching pipelines (Python, spaCy) for ATS optimisation.",
    highlights: [
      "Engineered structured extraction so resume-to-job matching compares meaning, not keywords — the gap keyword-only ATS filters leave",
      "Tuned preprocessing and inference workflows so matches return inside a responsive request budget",
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
      "Built an AI product-recommendation chatbot for an e-commerce website, ranking products from user purchase behaviour rather than static catalogue order.",
    highlights: [
      "Tuned recommendation ranking for relevance and response time",
    ],
    skills: ["Python", "Machine Learning"],
  },
  {
    type: "work",
    title: "Class Representative & Project Team Lead",
    organization: "Tulsiramji Gaikwad-Patil College of Engineering & Technology",
    location: "Nagpur, Maharashtra, India",
    period: "Aug 2023 – May 2026",
    description:
      "Elected class representative and project team lead — the liaison between faculty and 75+ students.",
    highlights: [
      "Led technical teams across 4 projects — FaceSnap (published, Springer), AIPFL-IDS, PhishGuard, and OneBit",
      "Organized workshops and peer initiatives on campus",
    ],
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
    description: "",
    highlights: [],
  },
  {
    type: "education",
    title: "Secondary School Certificate (SSC)",
    organization: "Golden Kids English High School",
    location: "Amravati, Maharashtra, India",
    period: "2020",
    description: "",
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
    name: "Programming",
    skills: ["Python", "TypeScript", "JavaScript", "Dart", "SQL", "C++", "Bash"],
    level: "proficient",
    usedIn: ["onebit", "faceSnap", "aipfl-ids", "phishguard"],
  },
  {
    name: "Machine learning",
    skills: ["TensorFlow", "scikit-learn", "FedAvg"],
    level: "proficient",
    usedIn: ["aipfl-ids", "phishguard"],
  },
  {
    name: "AI & NLP",
    skills: ["NLP", "spaCy", "OpenCV", "InsightFace", "Computer Vision"],
    level: "proficient",
    usedIn: ["faceSnap", "aipfl-ids", "phishguard"],
  },
  {
    name: "Backend & APIs",
    skills: ["FastAPI", "Flask", "Node.js"],
    level: "proficient",
    usedIn: ["faceSnap", "phishguard", "aipfl-ids"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    level: "proficient",
    usedIn: ["faceSnap", "phishguard", "aipfl-ids"],
  },
  {
    name: "Mobile",
    skills: ["Flutter", "Dart", "Riverpod", "Material 3"],
    level: "proficient",
    usedIn: ["onebit"],
  },
  {
    name: "Databases & vector search",
    skills: ["SQLite", "Qdrant", "Firebase", "Drift (SQLite)"],
    level: "working",
    usedIn: ["onebit", "faceSnap", "phishguard"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["Docker", "Linux", "Git", "AWS"],
    level: "working",
    usedIn: ["aipfl-ids", "phishguard"],
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
    organization: "Nagpur City Police · Advantage Vidharbha",
    kind: "award",
    date: "2025",
    description:
      "Among the top 20 national teams for a dark-web surveillance prototype: Python automation over Tor to collect and triage posts, with NLP/NER prioritization and real-time dashboards for analysis. Recognised with a framed Token of Appreciation.",
  },
  {
    title: "AWS Academy Graduate — AWS Academy Machine Learning Foundations",
    organization: "AWS Academy",
    kind: "certification",
    date: "February 2024",
    url: "https://www.credly.com/go/uvgqRlXH",
    description:
      "Completed the 20-hour AWS Academy Machine Learning Foundations curriculum covering core ML concepts and AWS ML services. Badge verifiable on Credly.",
  },
  {
    title: "Geodata Processing Using Python and Machine Learning",
    organization: "ISRO / IIRS, Dehradun",
    kind: "certification",
    date: "February 2025",
    url: "https://isrolms.iirs.gov.in/mod/customcert/verify_certificate.php?contextid=1049408",
    description:
      "Certificate of participation for the 09-hour IIRS online course run 17–28 February 2025 — geospatial data processing with Python and machine learning for remote-sensing and Earth-observation workflows. Verifiable on the IIRS LMS (certificate UID qGRAJlD31d).",
  },
  {
    title: "FaceSnap presented at ICAIA 2025",
    organization: "Maharaja Surajmal Institute of Technology, Delhi",
    kind: "certification",
    date: "March 2025",
    description:
      "Certificate of participation in the 3rd International Conference on Artificial Intelligence and Applications, held 26–27 March 2025, where the FaceSnap work was presented — the chapter later published in the Springer ICAIA 2025 proceedings (pp. 287–302).",
  },
  {
    title: "AIDCon-2025 participation",
    organization: "St. Vincent Pallotti College of Engineering & Technology, Nagpur",
    kind: "certification",
    date: "December 2025",
    description:
      "Certificate for actively participating in the International Conference on AI-Driven Engineering & Technology (AIDCon-2025), held 12–13 December 2025.",
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
      "Presented research on AIPFL-IDS — federated learning applied to network intrusion detection.",
  },
];

export const profile = {
  name: "Pratham Wankhade",
  role: "Information Technology Graduate",
  /** Specialisations, not a job title — no designation is claimed. */
  specialties: "AI/ML · Software Engineering · Distributed Systems",
  location: "Amravati, Maharashtra, India",
  email: "prathamwankhade2004@gmail.com",
  phone: "+91 77578 48083",
  github: "github.com/PrathamWankhade",
  linkedin: "linkedin.com/in/pratham-wankhade",
  site: "prathamwankhades-portfolio.vercel.app",
  bio: `Information Technology graduate with hands-on experience in machine learning pipelines, NLP, computer vision, and federated learning simulations, alongside offline-first systems engineering. Skilled in Python, TensorFlow, FastAPI, and React; every project is documented with its architecture, trade-offs, and limits.`,
};
