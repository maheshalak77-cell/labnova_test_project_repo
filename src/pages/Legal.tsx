import { Breadcrumb } from "../components/ui";
import { legalDocs, getLegalDoc } from "../lib/legalContent";

export function LegalPage({
  slug,
  navigate,
}: {
  slug?: string;
  navigate: (path: string) => void;
}) {
  const doc = getLegalDoc(slug || "terms") || legalDocs[0];

  return (
    <main className="inner-page legal-page">
      <section className="legal-hero section-wrap">
        <Breadcrumb
          navigate={navigate}
          items={[
            { label: "Legal", path: "/legal/terms" },
            { label: doc.title },
          ]}
        />
        <div className="legal-headline">
          <span className="eyebrow">LabNova Scientific</span>
          <h1>{doc.title}</h1>
          <span className="legal-effective">{doc.effectiveDateLabel}</span>
        </div>

        <nav className="legal-subnav" aria-label="Legal documents">
          {legalDocs.map((d) => (
            <button
              key={d.slug}
              className={d.slug === doc.slug ? "is-active" : ""}
              onClick={() => navigate(`/legal/${d.slug}`)}
            >
              {d.navLabel}
            </button>
          ))}
        </nav>
      </section>

      <section className="legal-body section-wrap">
        <article className="legal-doc">
          {doc.intro && (
            <div className="legal-section legal-intro">
              {doc.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {doc.sections.map((s, i) => (
            <div className="legal-section" key={s.heading || i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          ))}

          {doc.contact && (
            <div className="legal-section legal-contact">
              {doc.contact.heading && <h2>{doc.contact.heading}</h2>}
              {doc.contact.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
