import Head from "next/head";
import { Home } from "@/components/home/Home";

export default function home() {
  return (
    <>
      <Head>
        <title>Nnadi Daniel | Game Developer</title>
        <meta
          name="description"
          content="Nnadi Daniel is a Game Developer at Deluxe Creation Studios, building engaging mobile games across action, simulation, and sports genres using Unity and C#."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nnadi Daniel | Game Developer" />
        <meta property="og:description" content="Nnadi Daniel is a Game Developer at Deluxe Creation Studios, building engaging mobile games across action, simulation, and sports genres using Unity and C#." />
        <meta property="og:image" content="https://danielnnadi.vercel.app/og-image.jpg?v=2" />
        <meta property="og:site_name" content="Nnadi Daniel | Game Developer" />
        <meta property="og:logo" content="/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nnadi Daniel | Game Developer" />
        <meta name="twitter:description" content="Nnadi Daniel is a Game Developer at Deluxe Creation Studios, building engaging mobile games across action, simulation, and sports genres using Unity and C#." />
        <meta name="twitter:image" content="https://danielnnadi.vercel.app/og-image.jpg?v=2" />
      </Head>
      <Home />
    </>
  );
}
