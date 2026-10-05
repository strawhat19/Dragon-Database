import type { LegalPageKind } from './types';

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  source?: { href: string; label: string };
};

type LegalContent = {
  title: string;
  introduction: string;
  description: string;
  sections: LegalSection[];
};

export const legalPages: Record<LegalPageKind, LegalContent> = {
  terms: {
    title: `Terms`,
    description: `Using the current Dragon Database collection and its public features.`,
    introduction: `Dragon Database is a public collection for exploring dragon forms, traits, and lore. These terms describe the current release; browsing does not require an account.`,
    sections: [
      {
        id: `collection`,
        title: `Using the collection`,
        paragraphs: [
          `The collection contains illustrative sample dragon forms. Descriptions and classifications are a starting point for exploration, rather than a complete or authoritative account of every tradition or fictional setting.`,
          `Use the site lawfully, respect other people’s rights, and do not interfere with the app or attempt to misuse its features.`,
        ],
      },
      {
        id: `features`,
        title: `Current features`,
        paragraphs: [
          `Search and the sample catalogue operate on your browser or device. There is no connected shared database or cloud account service in this release. Sign In is currently a placeholder; the authentication code supports local mock sessions only.`,
          `The Contact form is a preview. It validates fields but does not send, persist, or deliver a message. Other features marked as unavailable do not become active when selected.`,
        ],
      },
      {
        id: `content`,
        title: `Content and licenses`,
        paragraphs: [
          `Respect the applicable rights and licenses when reusing text, illustrations, or other material. Access to this app does not itself grant permission to reuse every asset.`,
          `DragonSlapper and Alegreya Sans have their own licenses and attribution requirements. Their original files are bundled with the app; credits and license text are available through Font Notices in the footer. Links to external websites are provided for reference.`,
        ],
      },
      {
        id: `availability`,
        title: `Availability and local data`,
        paragraphs: [
          `Content and features may change as the app develops. Availability, completeness, and uninterrupted operation are not guaranteed.`,
          `Local data depends on your browser or device storage. Clearing that storage can remove the saved catalogue, search query, and any local demo session. This release does not provide cloud synchronization or recovery of cleared local data.`,
        ],
      },
    ],
  },
  privacy: {
    title: `Privacy Policy`,
    description: `How the current Dragon Database release handles local data and web requests.`,
    introduction: `This notice describes the current app. Dragon Database keeps its catalogue and search state locally; it does not connect those features to a shared backend.`,
    sections: [
      {
        id: `local-data`,
        title: `Catalogue and search`,
        paragraphs: [
          `The sample dragon catalogue and your latest search query are saved in browser local storage on web, or device storage in the native app. The saved query restores your search when you return. Searching and filtering happen in the app; these records and queries are not submitted to an application backend.`,
          `Local data stays in that browser or app installation and is not synchronized across devices. It remains there until it is replaced or the relevant storage is cleared.`,
        ],
      },
      {
        id: `demo-authentication`,
        title: `Local mock authentication`,
        paragraphs: [
          `Sign In is currently a placeholder. The app’s local mock authentication code can save a demo name, email address, optional picture URL, and session details in the same browser or device storage if that demo functionality is used.`,
          `This code does not connect to Google OAuth or another live identity provider. Local demo records are not a cloud account or an external service subscription.`,
        ],
      },
      {
        id: `contact-form`,
        title: `Contact form`,
        paragraphs: [
          `Name, email, subject, and message fields are held only in the current page’s memory. The form is not connected to email or a backend, and submitting it does not transmit or persist those fields. Drafts are not saved across page reloads or app restarts.`,
        ],
      },
      {
        id: `hosting`,
        title: `App delivery and hosting`,
        paragraphs: [
          `The app does not configure advertising cookies or analytics trackers. Loading the web app still sends ordinary requests to its hosting service so that pages and assets can be delivered.`,
          `When this site is hosted on Vercel, Vercel may process request and device information, including IP addresses, to operate its hosting services. This hosting activity is separate from the locally saved catalogue and search query.`,
        ],
        source: { href: `https://vercel.com/legal/privacy-notice`, label: `Vercel Privacy Notice` },
      },
      {
        id: `assets-and-links`,
        title: `Fonts and external links`,
        paragraphs: [
          `Fonts and dragon artwork are bundled with the app and delivered as app assets. This release does not request its fonts from a third-party font service.`,
          `Links to Piratechs, FontStruct, license notices, and other external sites open destinations with their own privacy practices. Those sites receive the ordinary requests needed to open them. Opening a link does not create a subscription or account in Dragon Database.`,
        ],
      },
      {
        id: `choices`,
        title: `Your choices`,
        paragraphs: [
          `Use the search clear control to remove the current saved query. Clear this site’s browser data or the native app’s storage through your browser or device settings to remove local records and demo sessions. The app cannot recover cleared local data from a server.`,
          `This notice should be updated if connected accounts, message delivery, analytics, or other data services are introduced. The Contact page currently shows the unsent form preview described above.`,
        ],
      },
    ],
  },
};
