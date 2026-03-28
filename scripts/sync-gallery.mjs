/**
 * Sync photo folders into public/gallery and regenerate albums.json + manifest.json.
 *
 * Usage:
 *   node scripts/sync-gallery.mjs
 *   node scripts/sync-gallery.mjs "C:\Users\you\Desktop\Program Photos"
 *
 * If a source path is passed, copies that directory into public/gallery (merged).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const galleryDir = path.join(root, 'public', 'gallery');

const IMAGE = /\.(jpe?g|png|gif|webp)$/i;
const SKIP_FILES = new Set(['m0100.ctg']);
const SKIP_DIR = new Set(['node_modules']);

function folderMeta(name) {
  const yFirst = /^(\d{4})\s+(.+)$/.exec(name);
  if (yFirst) return { year: yFirst[1], sortKey: yFirst[2].toLowerCase() };
  const yLast = /^(.+)\s+(\d{4})$/.exec(name);
  if (yLast) return { year: yLast[2], sortKey: yLast[1].toLowerCase() };
  if (/^\d{4}$/.test(name)) return { year: name, sortKey: 'programs' };
  return { year: '0000', sortKey: name.toLowerCase() };
}

function sortAlbumFolderNames(names) {
  return [...names].sort((a, b) => {
    const A = folderMeta(a);
    const B = folderMeta(b);
    const na = parseInt(A.year, 10);
    const nb = parseInt(B.year, 10);
    if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return nb - na;
    if (A.year !== B.year) return B.year.localeCompare(A.year);
    return A.sortKey.localeCompare(B.sortKey);
  });
}

function copySourceIntoGallery(sourcePath) {
  if (!fs.existsSync(sourcePath)) {
    console.error('Source does not exist:', sourcePath);
    process.exit(1);
  }
  if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });
  const entries = fs.readdirSync(sourcePath, { withFileTypes: true });
  for (const ent of entries) {
    const base = ent.name;
    const from = path.join(sourcePath, base);
    const to = path.join(galleryDir, base);
    if (ent.isDirectory()) {
      fs.cpSync(from, to, { recursive: true });
      continue;
    }
    if (SKIP_FILES.has(base.toLowerCase())) continue;
    fs.copyFileSync(from, to);
  }
  console.log('Copied from', sourcePath, 'into', galleryDir);
}

function listAlbumDirs() {
  if (!fs.existsSync(galleryDir)) return [];
  return fs
    .readdirSync(galleryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !SKIP_DIR.has(d.name))
    .map((d) => d.name);
}

function walkImages(albumName) {
  const dir = path.join(galleryDir, albumName);
  const out = [];
  function walk(current) {
    for (const ent of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, ent.name);
      if (ent.isDirectory()) {
        walk(full);
        continue;
      }
      if (!IMAGE.test(ent.name)) continue;
      const rel = path.relative(dir, full).split(path.sep).join('/');
      out.push({ src: `/gallery/${albumName}/${rel}`, album: albumName });
    }
  }
  if (fs.existsSync(dir)) walk(dir);
  return out;
}

const sourceArg = process.argv[2] || process.env.GALLERY_SOURCE;
if (sourceArg) copySourceIntoGallery(path.resolve(sourceArg));

const dirs = sortAlbumFolderNames(listAlbumDirs());
if (dirs.length === 0) {
  console.error('No album folders under', galleryDir);
  process.exit(1);
}

const albumsPath = path.join(galleryDir, 'albums.json');
fs.writeFileSync(albumsPath, JSON.stringify(dirs), 'utf8');
console.log('Wrote', albumsPath, `(${dirs.length} albums)`);

const images = [];
for (const album of dirs) {
  images.push(...walkImages(album));
}
images.sort((a, b) => (a.album !== b.album ? a.album.localeCompare(b.album) : a.src.localeCompare(b.src)));

const manifestPath = path.join(galleryDir, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(images), 'utf8');
console.log('Wrote', manifestPath, `(${images.length} images)`);
