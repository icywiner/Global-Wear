import { useEffect, useMemo, useState } from 'react';
import { buildImageCandidates, resolveValidImageSource } from '@/lib/imageValidation';

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
  const [candidateIndex, setCandidateIndex] = useState(0);

  const normalizedSources = useMemo(
    () => sources.map((item) => item.trim()).filter(Boolean),
    [sources]
  );

  const candidates = useMemo(() => {
    const allSources = fallbackSrc ? [...normalizedSources, fallbackSrc] : normalizedSources;
    return buildImageCandidates(allSources);
  }, [fallbackSrc, normalizedSources]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (candidates.length === 0) {
        setStatus('failed');
        onAllFailed?.();
        return;
      }

      setStatus('checking');
      setSource(null);
      setIsLoaded(false);
      setCandidateIndex(0);

      const validSource = await resolveValidImageSource(candidates);

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
  }, [candidates, onAllFailed]);

  if (status === 'failed' || !source) {
    return null;
  }

  const tryNextCandidate = () => {
    const nextIndex = candidateIndex + 1;
    if (nextIndex >= candidates.length) {
      setStatus('failed');
      onAllFailed?.();
      return;
    }

    setCandidateIndex(nextIndex);
    setIsLoaded(false);
    setSource(candidates[nextIndex]);
    setStatus('checking');
  };

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
          tryNextCandidate();
        }}
      />
    </>
  );
}
