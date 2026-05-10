import { useEffect, useMemo, useState } from 'react';
import { resolveValidImageSource } from '@/lib/imageValidation';

type SmartImageStatus = 'checking' | 'ready' | 'failed';

interface SmartImageProps {
  sources: string[];
  alt: string;
  imgClassName?: string;
  skeletonClassName?: string;
  onAllFailed?: () => void;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
}

export default function SmartImage({
  sources,
  alt,
  imgClassName,
  skeletonClassName,
  onAllFailed,
  loading = 'lazy',
  fallbackSrc,
}: SmartImageProps) {
  const [status, setStatus] = useState<SmartImageStatus>('checking');
  const [source, setSource] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const normalizedSources = useMemo(
    () => sources.map((item) => item.trim()).filter(Boolean),
    [sources]
  );

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (normalizedSources.length === 0) {
        if (fallbackSrc) {
          setSource(fallbackSrc);
          setUsingFallback(true);
          setStatus('ready');
        } else {
          setStatus('failed');
          onAllFailed?.();
        }
        return;
      }

      setStatus('checking');
      setSource(null);
      setIsLoaded(false);
      setUsingFallback(false);

      const validSource = await resolveValidImageSource(normalizedSources);

      if (cancelled) return;

      if (validSource) {
        setSource(validSource);
        setStatus('ready');
        return;
      }

      if (fallbackSrc) {
        setSource(fallbackSrc);
        setUsingFallback(true);
        setStatus('ready');
        return;
      }

      setStatus('failed');
      onAllFailed?.();
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [fallbackSrc, normalizedSources, onAllFailed]);

  if (status === 'failed' || !source) {
    return null;
  }

  return (
    <>
      {!isLoaded && (
        <div className={skeletonClassName || 'absolute inset-0 animate-pulse bg-secondary/40'} />
      )}
      <img
        src={source}
        alt={alt}
        loading={loading}
        className={`${imgClassName || ''} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`.trim()}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!usingFallback && fallbackSrc) {
            setSource(fallbackSrc);
            setUsingFallback(true);
            setIsLoaded(false);
            return;
          }

          setStatus('failed');
          onAllFailed?.();
        }}
      />
    </>
  );
}
