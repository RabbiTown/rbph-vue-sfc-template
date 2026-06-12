import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const project = String(pkg.name ?? 'rbph-vue-app')
  .replace(/^@/, '')
  .replaceAll('/', '-');
const version = String(pkg.version ?? '0.0.0');
const fileName = `${project}-${version}.zip`;
const tempDir = mkdtempSync(join(tmpdir(), 'rbph-vue-sfc-'));
const tempZip = join(tempDir, fileName);
const outputZip = join(dist, fileName);

try {
  rmSync(outputZip, { force: true });
  execFileSync('zip', ['-r', tempZip, '.'], { cwd: dist, stdio: 'inherit' });
  copyFileSync(tempZip, outputZip);
  console.log(`Created ${outputZip}`);
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
