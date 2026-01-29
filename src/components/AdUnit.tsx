'use client';

import { useEffect, useRef } from 'react';

type AdUnitProps = {
  className?: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'fluid' | 'rectangle';
  layoutKey?: string; // Optional: for In-feed ads
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdUnit({ className, style, format = 'auto', layoutKey }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  useEffect(() => {
    // Only execute if key exists and script is presumably loading
    if (pId && window.adsbygoogle) {
      try {
        // Push error handling to prevent crashes on dev environments
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense push error:', err);
      }
    }
  }, [pId]);

  if (!pId) {
    // Return a placeholder for development visibility (optional)
    if (process.env.NODE_ENV === 'development') {
      return (
        <div style={{ 
          background: '#f0f0f0', 
          border: '1px dashed #ccc', 
          padding: '20px', 
          textAlign: 'center',
          margin: '20px 0',
          fontSize: '0.8rem',
          color: '#666',
          ...style 
        }} className={className}>
          [AdSense Placeholder]<br/>
          (ID not set)
        </div>
      );
    }
    return null;
  }

  return (
    <div style={{ overflow: 'hidden', minHeight: '100px', ...style }} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={pId}
        data-ad-slot="1234567890" // You would normally pass this as a prop too, but for auto ads simple ID is often enough. For specific units, pass slot ID.
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout-key={layoutKey}
      />
    </div>
  );
}
