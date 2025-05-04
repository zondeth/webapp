import React from "react";
import { Helmet } from "react-helmet";

export interface SeoProps {
    title: string;
    description: string;
    canonical?: string;
    // Add other meta tags as needed
}

export const Seo: React.FC<SeoProps> = ({ title, description, canonical }) => {
    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* Viewport (if not already in public/index.html) */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* Open Graph / Social Tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonical || "https://zondeth.com"} />
            {canonical && <link rel="canonical" href={canonical} />}
            {/* Robots */}
            <meta name="robots" content="index, follow" />
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": title,
                    "description": description,
                    "url": canonical || "https://zondeth.com",
                    "author": {
                        "@type": "Organization",
                        "name": "ZondETH"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "ZondETH",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://zondeth.com/logo.png"
                        }
                    },
                    "mainEntityOfPage": canonical || "https://zondeth.com"
                })}
            </script>
        </Helmet>
    );
}; 