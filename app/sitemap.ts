import { MetadataRoute } from "next";
import { servicesData } from "@/data/servicesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://workforceinfotech.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/process",
    "/gallery",
    "/technology",
    "/solutions",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
