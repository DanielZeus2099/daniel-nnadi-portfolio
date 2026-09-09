import Head from "next/head";
import { Home } from "@/components/home/Home";

export default function home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nnadi Daniel",
    "alternateName": "Daniel Nnadi",
    "jobTitle": "Game Programmer & Developer",
    "description": "Game Programmer and Developer based in Lagos, Nigeria specializing in Unity, C#, and mobile games.",
    "worksFor": {
      "@type": "Organization",
      "name": "Deluxe Creation Studios"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "Nigeria"
    },
    "url": "https://danielnnadi.vercel.app",
    "image": "https://danielnnadi.vercel.app/og-image.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/daniel-nnadi-760462215",
      "https://x.com/DanielZeus2099",
      "https://github.com/DanielZeus2099"
    ],
    "knowsAbout": [
      "Game Development",
      "Game Programming",
      "Unity 3D",
      "Unity Engine",
      "C#",
      "Mobile Games",
      "3D Modeling",
      "Unity Sentis"
    ]
  };

  return (
    <>
      <Head>
        <title>Nnadi Daniel | Game Developer & Programmer</title>
        <meta
          name="description"
          content="Nnadi Daniel is a Game Developer and Programmer at Deluxe Creation Studios based in Lagos, Nigeria. Specializing in mobile game systems, Unity, and C#."
        />
        <meta
          name="keywords"
          content="Nnadi Daniel, Daniel Nnadi, Game Developer Nigeria, Game Programmer Nigeria, Unity Developer Nigeria, C# Game Programmer, Game Developer Lagos, Deluxe Creation Studios"
        />
        <meta name="author" content="Nnadi Daniel" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://danielnnadi.vercel.app/" />

        {/* Favicon */}
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />

        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://danielnnadi.vercel.app/" />
        <meta property="og:title" content="Nnadi Daniel | Game Developer & Programmer" />
        <meta
          property="og:description"
          content="Nnadi Daniel is a Game Developer and Programmer at Deluxe Creation Studios based in Lagos, Nigeria. Specializing in mobile game systems, Unity, and C#."
        />
        <meta property="og:image" content="https://danielnnadi.vercel.app/og-image.jpg?v=2" />
        <meta property="og:site_name" content="Nnadi Daniel | Game Developer" />
        <meta property="og:logo" content="/logo.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nnadi Daniel | Game Developer & Programmer" />
        <meta
          name="twitter:description"
          content="Nnadi Daniel is a Game Developer and Programmer at Deluxe Creation Studios based in Lagos, Nigeria. Specializing in mobile game systems, Unity, and C#."
        />
        <meta name="twitter:image" content="https://danielnnadi.vercel.app/og-image.jpg?v=2" />

        {/* Structured Data (Schema.org JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Home />
    </>
  );
}
