/**
 * Safe JSON-LD Structured Data Injector
 *
 * Uses dangerouslySetInnerHTML safely by stringifying structured data objects.
 * Guarantees RFC 8259 JSON compliance and schema.org standard compatibility.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

