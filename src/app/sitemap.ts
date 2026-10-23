import { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const base = "https://portfolio.prathamwankhade.dev";

/**
 * No `lastModified` is emitted: there is no tracked content-update timestamp,
 * and stamping every entry with request time would signal a false "just
 * updated" to crawlers. Add a real per-page date when content changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/skills",
    "/experience",
    "/achievements",
    "/contact",
    "/resume",
  ].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
