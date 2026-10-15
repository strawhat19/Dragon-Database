# Disconnected frontend readiness

Review branch only. No backend, telemetry, billing, store/ad submission or manual deployment.

## Added pages
Sign In, Sign Up, Reset Password, Profile, Connections, Saved, Collections, Settings, Dashboard, Users, Content, Analytics, Health, Features, Feedback, Submissions and Guidelines. Public About, Contact, Privacy and Terms remain in the existing themed shell. Privacy reflects device-library storage. Account and preview routes are noindex on web; guidelines has its own title and description. Do not treat noindex as authorization. No unconnected custom domain canonical was invented.

## Local behavior
Existing catalog retained. New versioned device library uses AsyncStorage (browser localStorage on web), validates saved shape and catalog IDs, surfaces errors without overwriting unreadable data, and supports favorites, collection membership/removal, display label, rail collapse and confirmed reset. No passwords, fake users, real cloud roles or private sharing. Legacy mock sign-in cannot create or restore an identity through the auth facade. Device data is not synchronized across installations or guaranteed across simultaneous tabs; future adapters must handle conflicts and migration explicitly.

## Design/source references
Canonical AGENTS.md and ai/ pack copied intact. Reference source: Domains-Database AccountSidebar/index.web.tsx, blob 5f9833ed3aafb4230c659747f10cd6eb3caabc5d; shared admin layout contract. Web implements measured header/brand width, flush-left desktop rail, collapse, single-column dashboard submenu and bottom profile control, with destination colors/fonts. Native uses existing themed PageLayout and functional local controls, not exact desktop sidebar/reporting parity. reverse-engineer-anything source was unavailable; ordinary source inspection was used, not that skill.

## Future connection work
Provision dedicated Firebase project and database, approved billing, enable Google/email providers, trusted account/role bootstrap, restrictive security rules and indexes, bounded real-time subscriptions, safe account-scoped migration and server-only Vercel reports. Account deletion/export, avatars, moderation, feedback sending and sharing remain unavailable. Owner previews are public design previews without sensitive data, never authorization.

App Store requires native builds, identity/privacy/deletion flows, assets and review. AdSense requires live content and rights review, policy compliance and application; neither is claimed ready for approval. SEO release should add verified-origin sitemap/canonicals after target domain is known and review existing client-loading visibility.

## Validation
Source review only. No tests, build, app execution or browser/UI validation run, per AGENTS.md. Runtime behavior and native store readiness remain unverified.
