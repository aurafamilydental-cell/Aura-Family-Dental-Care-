import type { Metadata, MetadataRoute } from "next";

export const SITE_NAME = "Aura Family Dental Care";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.aurafamilydentalcare.org";

export const DEFAULT_OG_IMAGE = "/brand/aura_logo_open_graph_1_91.png";

export const BUSINESS = {
  name: SITE_NAME,
  description:
    "A true dental home with a caring, experienced team. Improve your oral well-being with advanced, safe, and personalized procedures tailored just for you.",
  email: "aurafamilydentalclinic@gmail.com",
  telephone: "+233544079966",
  alternateTelephone: "+233205245565",
  address: {
    streetAddress: "Koforidua-Awouye, Near Total 6",
    addressLocality: "Koforidua",
    addressRegion: "Eastern Region",
    addressCountry: "GH",
  },
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "19:00" },
    { days: ["Sunday"], opens: "13:00", closes: "17:00" },
  ],
} as const;

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  priority?: number;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  image?: string;
  noIndex?: boolean;
};

export const routes: RouteSeo[] = [
  {
    path: "/",
    title: "Dental Clinic in Koforidua, Ghana",
    description:
      "A true dental home with a caring, experienced team. Improve your oral well-being with advanced, safe, and personalized procedures tailored just for you.",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/about",
    title: "About Our Koforidua Dental Team",
    description:
      "Meet the Aura Family Dental Care team and learn about our conservative, judgment-free approach to dental care in Koforidua.",
    priority: 0.8,
  },
  {
    path: "/services",
    title: "Dental Services in Koforidua",
    description:
      "Explore family dentistry, cosmetic smile care, restorative dentistry, pediatric dentistry, and emergency dental care at Aura.",
    priority: 0.9,
  },
  {
    path: "/services/family",
    title: "Family Dentistry in Koforidua",
    description:
      "Book comfortable routine checkups, cleanings, digital scans, and preventive dental care for the whole family in Koforidua.",
    priority: 0.85,
  },
  {
    path: "/services/cosmetic",
    title: "Cosmetic Dentistry and Teeth Whitening",
    description:
      "Improve your smile with conservative cosmetic dentistry, professional teeth whitening, bonding, and smile design at Aura.",
    priority: 0.85,
  },
  {
    path: "/services/restorative",
    title: "Restorative Dentistry and Dental Implants",
    description:
      "Repair damaged or missing teeth with conservative fillings, crowns, implants, and restorative dental care in Koforidua.",
    priority: 0.85,
  },
  {
    path: "/services/pediatric",
    title: "Pediatric Dentist in Koforidua",
    description:
      "Gentle children's dentistry in Koforidua with kid-friendly language, calm visits, and preventive care for young smiles.",
    priority: 0.85,
  },
  {
    path: "/services/emergency",
    title: "Emergency Dentist in Koforidua",
    description:
      "Get urgent help for tooth pain, broken fillings, dental injuries, and emergency dental needs at Aura Family Dental Care.",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/new-patients",
    title: "New Patient Dental Visits",
    description:
      "Plan your first Aura visit with a clear, relaxed new-patient process designed for nervous patients and busy families.",
    priority: 0.75,
  },
  {
    path: "/before-after",
    title: "Before and After Smile Transformations",
    description:
      "See natural before-and-after smile results from Aura patients, including conservative bonding and cosmetic improvements.",
    priority: 0.75,
  },

  {
    path: "/contact",
    title: "Contact Aura Family Dental Care",
    description:
      "Contact Aura Family Dental Care in Koforidua-Awouye near Total 6 by phone, WhatsApp, email, or online booking.",
    priority: 0.8,
  },
  {
    path: "/ai",
    title: "AI Overview for Aura Family Dental Care",
    description:
      "Structured facts about Aura Family Dental Care for search engines, AI assistants, and patient research.",
    priority: 0.6,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description: "Read the Aura Family Dental Care privacy policy for website, booking, and patient communication data.",
    priority: 0.2,
    noIndex: true,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description: "Read the Aura Family Dental Care website and online booking terms of service.",
    priority: 0.2,
    noIndex: true,
  },
  {
    path: "/accessibility",
    title: "Accessibility Statement",
    description: "Read the Aura Family Dental Care website accessibility statement and contact information.",
    priority: 0.2,
    noIndex: true,
  },
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getRouteSeo(path: string) {
  const route = routes.find((item) => item.path === path);

  if (!route) {
    throw new Error(`Missing SEO configuration for route: ${path}`);
  }

  return route;
}

export function createMetadata(path: string): Metadata {
  const route = getRouteSeo(path);
  const image = route.image || DEFAULT_OG_IMAGE;
  const url = absoluteUrl(route.path);

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: url,
    },
    robots: route.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: route.title,
      description: route.description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} dental clinic in Koforidua, Ghana`,
        },
      ],
      locale: "en_GH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [absoluteUrl(image)],
    },
  };
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": absoluteUrl("/#dentist"),
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl("/brand/New-Aura-Logo.png"),
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS.address,
    },
    openingHoursSpecification: BUSINESS.openingHours.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.days,
      opens: item.opens,
      closes: item.closes,
    })),
    areaServed: [
      { "@type": "City", name: "Koforidua" },
      { "@type": "AdministrativeArea", name: "Eastern Region" },
      { "@type": "Country", name: "Ghana" },
    ],
    medicalSpecialty: "Dentistry",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@id": absoluteUrl("/#dentist"),
    },
  };
}

export function serviceJsonLd(path: string, serviceName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: serviceName,
    description,
    provider: {
      "@id": absoluteUrl("/#dentist"),
      name: SITE_NAME,
    },
    areaServed: "Koforidua, Eastern Region, Ghana",
    url: absoluteUrl(path),
    serviceType: serviceName,
  };
}
