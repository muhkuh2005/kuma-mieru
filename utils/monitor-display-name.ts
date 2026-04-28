import { useTranslations } from 'next-intl';

/**
 * Returns a localized display name for a monitor, falling back to the raw
 * Uptime-Kuma monitor name when no translation is configured.
 *
 * Translations live in `messages/<locale>.json` under the `monitors` key:
 *
 *   { "monitors": { "Realtime Cache": "Echtzeit-Cache" } }
 *
 * Locales that don't override a name simply pass the raw name through.
 */
export function useMonitorDisplayName(): (name: string) => string {
  const t = useTranslations('monitors');
  return (name: string) => {
    try {
      const translated = t(name);
      // next-intl returns the key itself when the namespace lookup hits a
      // missing entry in dev; in prod it throws. Treat both as "no override".
      return translated && translated !== name ? translated : name;
    } catch {
      return name;
    }
  };
}
