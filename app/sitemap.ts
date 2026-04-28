import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://electionguide-ai.web.app";

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/process", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/timeline", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/first-vote", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/eligibility", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/documents", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/assistant", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/learn", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/polling-day", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/quiz", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
