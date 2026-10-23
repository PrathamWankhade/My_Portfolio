/**
 * About page content — personal story, philosophy, interests.
 * Facts verified against resumes, TGPCET records, and GitHub.
 */

export type Interest = {
  name: string;
  description: string;
};

export const about = {
  name: "Pratham Wankhade",
  role: "AI/ML & Full-Stack Engineer",
  location: "Amravati, Maharashtra, India",
  email: "prathamwankhade2004@gmail.com",
  phone: "+91 77578 48083",
  github: "https://github.com/PrathamWankhade",
  linkedin: "https://linkedin.com/in/pratham-wankhade",
  bio:
    "I build software systems where imagination meets intelligence. My work spans AI, computer vision, cybersecurity, and offline-first applications — each documented with architecture, trade-offs, and honest limits.",
  story:
    "I started building software because I wanted to make things that work when the network doesn't. That curiosity led to OneBit, a Bluetooth mesh messenger with no servers at all, and then to FaceSnap, where I learned that detection, recognition, and attendance must be separate stages — never confused. Along the way I interned at Align Infotech and AD Infocom Systems, working on NLP pipelines and recommendation chatbots. In 2026 I graduated from Tulsiramji Gaikwad-Patil College of Engineering & Technology, Nagpur, with a B.Tech in Information Technology — First Class with Distinction. Today I split my time between building systems and writing about them honestly.",
  philosophy:
    "Ship working software. Document the limits. Never equate a heuristic with a calibrated probability. Never publish a simulation as a result. If I can't verify it, I don't claim it.",
  interests: [
    {
      name: "Offline-first & mesh systems",
      description:
        "Device-to-device applications that work with no infrastructure at all.",
    },
    {
      name: "Computer vision",
      description:
        "Face detection, recognition, and liveness — with consent and review queues.",
    },
    {
      name: "Security & privacy",
      description:
        "End-to-end encryption, federated learning, and phishing detection with traceable evidence.",
    },
    {
      name: "Languages & writing",
      description:
        "Native Marathi, fluent English, proficient Hindi; learning Japanese and Pāli. I document systems as carefully as I build them.",
    },
  ],
  techPhilosophy: [
    {
      title: "Honest metrics",
      description:
        "Every metric carries its conditions. Historical benchmarks are labeled as such; simulations are labeled as simulations.",
    },
    {
      title: "Separate concerns",
      description:
        "Detection, recognition, and attendance are distinct stages. A policy score is never a calibrated probability.",
    },
    {
      title: "Build in public",
      description:
        "Code, architecture, and trade-offs are documented openly — including what didn't work.",
    },
  ],
};
