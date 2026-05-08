import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-lpzzlnrd.vercel.app";
  const staticRoutes = ["", "/projects", "/about", "/setup", "/writing"];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectEntries = getProjectSlugs().map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...projectEntries];
}
