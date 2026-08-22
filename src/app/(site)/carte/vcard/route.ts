import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/seo";

/**
 * The one thing a digital business card should do: land in the phone's
 * address book. Served as a real .vcf so iOS and Android open it with their
 * contact importer rather than rendering it as text.
 */
export const dynamic = "force-static";

export function GET() {
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  // vCard 3.0: the widest support across iOS, Android and desktop clients.
  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${last};${first};;;`,
    `FN:${profile.name}`,
    `NICKNAME:${profile.shortName}`,
    `TITLE:${profile.role}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.email}`,
    `TEL;TYPE=CELL,VOICE:${profile.phone}`,
    `URL:${siteUrl}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedin}`,
    `X-SOCIALPROFILE;TYPE=instagram:${profile.instagramUrl}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(card, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="arnold-mubuanga-yate.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
