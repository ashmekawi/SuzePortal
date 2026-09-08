# Suze Portal — Next.js migration workspace

This branch stages the official Suez Chamber public website as a Next.js application.

## Architecture intent
- `SuzePortal`: public website for traders, investors and visitors.
- `SuzeApp`: internal ERP and CMS administration.
- Public content is published from the ERP/CMS through a read-only public API.

## Source recovery
The uploaded Next.js snapshot was incomplete: it referenced missing constants and omitted several UI state handlers. This workspace therefore reuses the complete Home page and content constants already preserved in the existing SuzePortal repository while adopting the uploaded Next.js project structure.

## Next steps
1. Complete the React Router -> Next.js routing migration.
2. Split the monolithic Home page into sections/components.
3. Replace static constants with CMS API reads.
4. Add Docker/Portainer deployment.
5. Add CI and production metadata/SEO.
