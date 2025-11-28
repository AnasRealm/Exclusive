import { useState } from 'react';

export function ImageWithFallback({ src, alt, className, fallbackSrc, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc || `https://via.placeholder.com/300x300/E5E7EB/6B7280?text=${encodeURIComponent(alt || 'Image')}`);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}