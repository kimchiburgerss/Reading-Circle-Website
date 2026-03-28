import { useCallback, useEffect, useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import PageWrapper from '@/components/PageWrapper';

type GalleryImage = {
  src: string;
  album: string;
};

type AlbumOption = {
  album: string;
  eventLabel: string;
};

/** Years shown in the gallery filter (newest first). */
const GALLERY_YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019'] as const;

/** Resolve paths from manifest (e.g. `/gallery/...`) when app uses a non-root `base`. */
function withBase(href: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (href.startsWith('/')) return `${base}${href}`;
  return `${base}/${href.replace(/^\//, '')}`;
}

function formatAlbumLabel(text: string) {
  return text
    .split(/(\s+)/)
    .map((part) => (/\s+/.test(part) ? part : part.charAt(0) + part.slice(1).toLowerCase()))
    .join('');
}

/** Same ordering as scripts/sync-gallery.mjs (year desc, then event name). */
function folderSortMeta(name: string) {
  const yFirst = /^(\d{4})\s+(.+)$/.exec(name);
  if (yFirst) return { year: yFirst[1], sortKey: yFirst[2].toLowerCase() };
  const yLast = /^(.+)\s+(\d{4})$/.exec(name);
  if (yLast) return { year: yLast[2], sortKey: yLast[1].toLowerCase() };
  if (/^\d{4}$/.test(name)) return { year: name, sortKey: 'programs' };
  return { year: '0000', sortKey: name.toLowerCase() };
}

function sortAlbumFolderNames(names: string[]) {
  return [...names].sort((a, b) => {
    const A = folderSortMeta(a);
    const B = folderSortMeta(b);
    const na = parseInt(A.year, 10);
    const nb = parseInt(B.year, 10);
    if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return nb - na;
    if (A.year !== B.year) return B.year.localeCompare(A.year);
    return A.sortKey.localeCompare(B.sortKey);
  });
}

/** Derives calendar year and display label from a folder name under public/gallery. */
function parseAlbumFolder(folder: string): { album: string; year: string; eventLabel: string } {
  const yearFirst = /^(\d{4})\s+(.+)$/.exec(folder);
  if (yearFirst) {
    return {
      album: folder,
      year: yearFirst[1],
      eventLabel: formatAlbumLabel(yearFirst[2]),
    };
  }
  const yearLast = /^(.+)\s+(\d{4})$/.exec(folder);
  if (yearLast) {
    return {
      album: folder,
      year: yearLast[2],
      eventLabel: formatAlbumLabel(yearLast[1]),
    };
  }
  if (/^\d{4}$/.test(folder)) {
    return { album: folder, year: folder, eventLabel: 'Programs' };
  }
  return { album: folder, year: 'Other', eventLabel: formatAlbumLabel(folder) };
}

function buildAlbumCatalog(folders: string[]) {
  const map = new Map<string, AlbumOption[]>();
  const unique = [...new Set(folders)];

  for (const folder of unique) {
    const { album, year, eventLabel } = parseAlbumFolder(folder);
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push({ album, eventLabel });
  }

  for (const [, list] of map) {
    list.sort((a, b) =>
      a.eventLabel.localeCompare(b.eventLabel, undefined, { sensitivity: 'base' }),
    );
  }

  return map;
}

const selectClass = cn(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground',
  'ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-50',
);

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [albumFolders, setAlbumFolders] = useState<string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>(GALLERY_YEARS[0]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [manRes, albRes] = await Promise.all([
          fetch(withBase('/gallery/manifest.json')),
          fetch(withBase('/gallery/albums.json')),
        ]);
        if (!manRes.ok) throw new Error('Could not load gallery');
        const data = (await manRes.json()) as GalleryImage[];
        const imagesList = Array.isArray(data) ? data : [];

        let fromFile: string[] = [];
        if (albRes.ok) {
          const raw = (await albRes.json()) as unknown;
          if (Array.isArray(raw) && raw.every((x) => typeof x === 'string')) fromFile = raw;
        }

        const fromImages = [...new Set(imagesList.map((i) => i.album))];
        const merged = sortAlbumFolderNames([...new Set([...fromFile, ...fromImages])]);

        if (!cancelled) {
          setImages(imagesList);
          setAlbumFolders(merged);
        }
      } catch {
        if (!cancelled) setLoadError('Unable to load photos right now.');
      } finally {
        if (!cancelled) setGalleryLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const catalog = useMemo(() => buildAlbumCatalog(albumFolders), [albumFolders]);
  const albumFoldersKey = useMemo(() => albumFolders.join('\0'), [albumFolders]);

  useEffect(() => {
    if (!galleryLoaded || loadError) return;
    setSelectedYear((y) => (y && (GALLERY_YEARS as readonly string[]).includes(y) ? y : GALLERY_YEARS[0]));
  }, [galleryLoaded, loadError]);

  useEffect(() => {
    if (!selectedYear || !catalog.has(selectedYear)) {
      setSelectedAlbum('');
      return;
    }
    const opts = catalog.get(selectedYear)!;
    setSelectedAlbum((a) => (a && opts.some((o) => o.album === a) ? a : opts[0].album));
  }, [albumFoldersKey, selectedYear, catalog]);

  const eventOptions = selectedYear ? catalog.get(selectedYear) ?? [] : [];
  const filteredImages = useMemo(
    () => images.filter((i) => i.album === selectedAlbum),
    [images, selectedAlbum],
  );
  const selectedEventLabel =
    eventOptions.find((o) => o.album === selectedAlbum)?.eventLabel ?? '';

  const photoCountByAlbum = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of images) m.set(i.album, (m.get(i.album) ?? 0) + 1);
    return m;
  }, [images]);

  const photoCountByYear = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of images) {
      const y = parseAlbumFolder(i.album).year;
      m.set(y, (m.get(y) ?? 0) + 1);
    }
    return m;
  }, [images]);

  const photosInSelectedYear = selectedYear ? photoCountByYear.get(selectedYear) ?? 0 : 0;
  const showComingSoon = galleryLoaded && !loadError && photosInSelectedYear === 0;

  const onYearChange = useCallback(
    (year: string) => {
      setSelectedYear(year);
      const next = catalog.get(year);
      if (next?.length) setSelectedAlbum(next[0].album);
      else setSelectedAlbum('');
    },
    [catalog],
  );

  const onOpenChange = useCallback((open: boolean) => {
    if (!open) setLightboxSrc(null);
  }, []);

  const dataReady = galleryLoaded && !loadError;
  const showYearSection = dataReady && !!selectedYear;
  const eventSelectDisabled =
    !dataReady || eventOptions.length === 0 || showComingSoon || photosInSelectedYear === 0;

  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />

        <div className="pt-32 pb-16">
          <div className="container relative z-10 mx-auto px-4">
            <div>
              <h1 className="mb-4 text-center text-4xl font-bold text-foreground md:text-5xl">
                Photo Gallery
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
                Browse photos from <strong>2019</strong> through <strong>2026</strong>. Years without photos yet show{' '}
                <strong>Coming Soon</strong>. Events follow your program folders (e.g. Christmas, Halloween).
              </p>
            </div>

            <div className="mx-auto mb-10 flex max-w-xl flex-col gap-4 sm:max-w-2xl sm:flex-row sm:items-end sm:justify-center sm:gap-6">
              <div className="flex-1 space-y-2">
                <Label htmlFor="gallery-year">Year</Label>
                <select
                  id="gallery-year"
                  className={selectClass}
                  value={dataReady && selectedYear ? selectedYear : ''}
                  onChange={(e) => onYearChange(e.target.value)}
                  disabled={!dataReady}
                  aria-label="Filter by year"
                >
                  {!dataReady && <option value="">{galleryLoaded ? '—' : 'Loading…'}</option>}
                  {dataReady &&
                    GALLERY_YEARS.map((y) => {
                      const n = photoCountByYear.get(y) ?? 0;
                      return (
                        <option key={y} value={y}>
                          {y} ({n} {n === 1 ? 'photo' : 'photos'})
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="gallery-event">Event</Label>
                <select
                  id="gallery-event"
                  className={selectClass}
                  value={
                    dataReady && selectedAlbum && !eventSelectDisabled
                      ? selectedAlbum
                      : ''
                  }
                  onChange={(e) => setSelectedAlbum(e.target.value)}
                  disabled={eventSelectDisabled}
                  aria-label="Filter by event"
                >
                  {!dataReady && <option value="">{galleryLoaded ? '—' : 'Loading…'}</option>}
                  {dataReady && eventSelectDisabled && (
                    <option value="">—</option>
                  )}
                  {dataReady &&
                    !eventSelectDisabled &&
                    eventOptions.map((o) => {
                      const n = photoCountByAlbum.get(o.album) ?? 0;
                      return (
                        <option key={o.album} value={o.album}>
                          {o.eventLabel} ({n} {n === 1 ? 'photo' : 'photos'})
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            {loadError && (
              <p className="text-center text-destructive" role="alert">
                {loadError}
              </p>
            )}

            {showYearSection && (
              <section className="mb-14">
                {showComingSoon ? (
                  <div className="rounded-xl border border-border bg-card px-6 py-20 text-center shadow-sm">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Coming Soon</h2>
                    <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                      Photos for <strong>{selectedYear}</strong> will be published here when they are available.
                      Check back later or choose another year above.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 border-b border-border pb-2 text-2xl font-semibold text-primary">
                      {selectedEventLabel}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({filteredImages.length} photos)
                      </span>
                    </h2>
                    {filteredImages.length === 0 ? (
                      <p className="text-center text-muted-foreground">
                        No photos in this album yet. Add images under{' '}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">public/gallery</code> and run{' '}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run sync-gallery</code>.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
                        {filteredImages.map((item) => (
                          <button
                            key={item.src}
                            type="button"
                            onClick={() => setLightboxSrc(withBase(item.src))}
                            className="group relative aspect-square overflow-hidden rounded-lg bg-muted ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <img
                              src={withBase(item.src)}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="sr-only">Open larger view</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </section>
            )}

            <Dialog open={!!lightboxSrc} onOpenChange={onOpenChange}>
              <DialogContent className="max-h-[90vh] max-w-[min(100vw-2rem,56rem)] z-[110] w-full overflow-hidden border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:opacity-100">
                <DialogTitle className="sr-only">Enlarged photo</DialogTitle>
                <DialogDescription className="sr-only">Full size program photo</DialogDescription>
                {lightboxSrc && (
                  <img
                    src={lightboxSrc}
                    alt=""
                    className="max-h-[85vh] w-full object-contain rounded-lg"
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Gallery;
