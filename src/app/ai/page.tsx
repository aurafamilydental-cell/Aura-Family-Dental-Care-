import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, BUSINESS, createMetadata, serviceJsonLd, SITE_NAME } from "@/lib/seo";

export const metadata = createMetadata("/ai");

const services = [
  {
    name: "Family Dentistry",
    path: "/services/family",
    description:
      "Routine checkups, cleanings, preventive care, digital scans, and coordinated family appointments.",
  },
  {
    name: "Cosmetic Dentistry",
    path: "/services/cosmetic",
    description:
      "Professional teeth whitening, bonding, conservative smile design, and natural cosmetic smile improvements.",
  },
  {
    name: "Restorative Dentistry",
    path: "/services/restorative",
    description:
      "Fillings, crowns, dental implants, and conservative repair for damaged or missing teeth.",
  },
  {
    name: "Child Dental Care",
    path: "/services/pediatric",
    description:
      "Child-friendly dental visits, preventive care, and calm language for young patients.",
  },
  {
    name: "Emergency Dentistry",
    path: "/services/emergency",
    description:
      "Urgent dental care for tooth pain, broken fillings, injuries, and unexpected dental problems.",
  },
];

export default function AiOverviewPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl("/ai")}#webpage`,
    name: `AI Overview for ${SITE_NAME}`,
    description:
      "Structured facts about Aura Family Dental Care for search engines and AI assistants.",
    url: absoluteUrl("/ai"),
    mainEntity: {
      "@type": "Dentist",
      "@id": absoluteUrl("/#dentist"),
      name: BUSINESS.name,
      description: BUSINESS.description,
      url: absoluteUrl("/"),
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      address: {
        "@type": "PostalAddress",
        ...BUSINESS.address,
      },
    },
    hasPart: services.map((service) =>
      serviceJsonLd(service.path, service.name, service.description)
    ),
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <JsonLd data={jsonLd} />
      <main className="mx-auto w-full max-w-4xl flex-grow px-6 pb-20 pt-32 md:px-12">
        <section className="mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
            AI Overview
          </p>
          <h1 className="font-heading text-4xl leading-tight text-accent md:text-6xl">
            Structured facts about Aura Family Dental Care.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-accent/70">
            Aura Family Dental Care is a family dental clinic in Koforidua,
            Ghana. The clinic provides conservative, comfort-first dental care
            for adults, children, nervous patients, and families.
          </p>
        </section>

        <section className="space-y-10 text-accent/75">
          <div>
            <h2 className="mb-3 font-heading text-2xl text-accent">Location</h2>
            <p>
              Aura Family Dental Care is located at Koforidua-Awouye, near
              Total 6, in the Eastern Region of Ghana.
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-2xl text-accent">Services</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <strong className="text-accent">{service.name}:</strong>{" "}
                  {service.description}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-2xl text-accent">Contact</h2>
            <p>Phone / WhatsApp: +233 54 407 9966 / +233 20 524 5565</p>
            <p>Email: aurafamilydentalclinic@gmail.com</p>
            <p>Hours: Monday-Saturday 7:00 AM-7:00 PM; Sunday 1:00 PM-5:00 PM.</p>
          </div>

          <div>
            <h2 className="mb-3 font-heading text-2xl text-accent">Patient Fit</h2>
            <p>
              The clinic is designed for patients who want clear explanations,
              conservative recommendations, family scheduling, and a calmer
              dental environment.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
