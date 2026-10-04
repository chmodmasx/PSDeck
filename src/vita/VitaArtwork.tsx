import { useEffect, useState } from "react";
import { GAME_FALLBACK_ICON } from "./model";

type Props = {
  urls: string[];
  alt: string;
  className?: string;
  fallback?: string;
};

export function VitaArtwork({
  urls,
  alt,
  className,
  fallback = GAME_FALLBACK_ICON
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [urls.join("|")]);

  const src = urls[index] ?? fallback;

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      draggable={false}
      onError={() => {
        if (index < urls.length) {
          setIndex((current) => current + 1);
        }
      }}
    />
  );
}
