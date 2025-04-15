import React from 'react';
import { Helmet } from 'react-helmet';

interface HelmetProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
}

const SiteHelmet: React.FC<HelmetProps> = ({
  title,
  description,
  keywords,
  ogImage = '/logo.png',
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
}) => {
  const siteUrl = 'https://cvgen.com.tr';
  const fullUrl = ogUrl ? `${siteUrl}${ogUrl}` : siteUrl;
  const fullTitle = `${title} | CvGen`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="CvGen" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SiteHelmet; 