/**
 * Peer-reviewed publications.
 * Verified against the publisher record (Springer Nature Link chapter page,
 * retrieved 2026-11-15) and the Crossref/OpenAlex DOI metadata.
 */

export type Publication = {
  title: string;
  /** Author order exactly as the publisher lists it. */
  authors: string[];
  /** 1-based position of Pratham in that list. */
  authorPosition: number;
  venue: string;
  series: string;
  publisher: string;
  /** Publisher's citation year (print volume). */
  year: string;
  onlineDate: string;
  pages: string;
  doi: string;
  url: string;
  scholar: string;
  /** Where and when the work was presented, from the participation certificate. */
  conferenceDates?: string;
  hostedAt?: string;
  keywords: string[];
  /** What the chapter reports, with its condition — never a deployment claim. */
  reportedResult: {
    value: string;
    label: string;
    condition: string;
  };
};

export const publications: Publication[] = [
  {
    title:
      "FaceSnap: Revolutionizing Student Attendance with Advanced Facial Recognition",
    authors: [
      "Anup Gade",
      "Pranav Ladole",
      "Pratham Wankhade",
      "Suraj Borkute",
      "Harsh Banode",
      "Yadnesh Umredkar",
      "Nilesh Nagrale",
    ],
    authorPosition: 3,
    venue: "Artificial Intelligence and Applications (ICAIA 2025)",
    series: "Algorithms for Intelligent Systems",
    publisher: "Springer, Singapore",
    year: "2026",
    onlineDate: "13 November 2025",
    pages: "287–302",
    doi: "10.1007/978-981-95-0493-0_22",
    url: "https://link.springer.com/chapter/10.1007/978-981-95-0493-0_22",
    scholar: "https://scholar.google.com/citations?user=MfcqFFMAAAAJ&hl=en",
    conferenceDates: "26–27 March 2025",
    hostedAt: "Maharaja Surajmal Institute of Technology, Delhi",
    keywords: [
      "Attendance management",
      "YOLO",
      "CNN",
      "Multi-face detection",
      "Transfer learning",
      "Real-time processing",
    ],
    reportedResult: {
      value: ">95%",
      label: "Recognition accuracy",
      condition:
        "the chapter reports over 95% accuracy in optimal conditions — a paper-level claim, not a benchmark of the deployed system",
    },
  },
];

export function getPublicationForProject(projectName: string) {
  return publications.find((p) => p.title.startsWith(projectName));
}

/** 3 of 7 -> "3rd of 7" */
export function authorPositionLabel(n: number, total: number) {
  const teens = n % 100;
  const suffix =
    teens >= 11 && teens <= 13
      ? "th"
      : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  return `${n}${suffix} of ${total}`;
}
