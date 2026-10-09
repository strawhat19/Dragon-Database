import type { PropsWithChildren } from 'react';
import { ScrollViewStyleReset } from 'expo-router/html';

const RootHtml = ({ children }: PropsWithChildren) => (
  <html lang={`en`} id={`dragon-document`} className={`dragon-document`}>
    <head id={`dragon-head`} className={`dragon-head`}>
      <meta charSet={`utf-8`} id={`dragon-charset-meta`} />
      <title id={`dragon-document-title`}>Dragon Database — The Scaling Collection</title>
      <ScrollViewStyleReset />
      <meta id={`dragon-theme-meta`} name={`theme-color`} content={`#e8ebef`} />
      <meta id={`dragon-description-meta`} name={`description`} content={`The Scaling Collection. Explore dragon forms, their traits, and the lore that connects them.`} />
      <meta id={`dragon-viewport-meta`} name={`viewport`} content={`width=device-width, initial-scale=1`} />
      <link id={`dragon-favicon-fallback`} rel={`icon`} sizes={`16x16 32x32 48x48`} href={`/favicon.ico`} />
      <link id={`dragon-favicon-png`} rel={`icon`} type={`image/png`} sizes={`192x192`} href={`/brand/favicon.png`} />
      <link id={`dragon-favicon`} rel={`icon`} type={`image/svg+xml`} sizes={`any`} href={`/brand/app-icon.svg`} />
      <link id={`dragon-touch-icon`} rel={`apple-touch-icon`} sizes={`180x180`} href={`/apple-touch-icon.png`} />
    </head>
    <body id={`dragon-body`} className={`dragon-body`}>{children}</body>
  </html>
);

export default RootHtml;
