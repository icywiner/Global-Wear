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
}

export default function SmartImage({
  sources,
  alt,
  imgClassName,
  skeletonClassName,
  onAllFailed,
  loading = 'lazy',
}: SmartImageProps) {
  const [status, setStatus] = useState<SmartImageStatus>('checking');
  const [source, setSource] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const normalizedSources = useMemo(
    () => sources.map((item) => item.trim()).filter(Boolean),
    [sources]
  );

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (normalizedSources.length === 0) {
        setStatus('failed');
        onAllFailed?.();
        return;
      }

      setStatus('checking');
      setSource(null);
      setIsLoaded(false);

      const validSource = await resolveValidImageSource(normalizedSources);

      if (cancelled) return;

      if (validSource) {
        setSource(validSource);
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
  }, [normalizedSources]);

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
          setStatus('failed');
          onAllFailed?.();
        }}
      />
    </>
  );
}
