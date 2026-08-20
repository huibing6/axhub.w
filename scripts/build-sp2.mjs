/**
 * 构建 sp2-workspace 为独立 SPA，用于 GitHub Pages 部署
 * 用法: node scripts/build-sp2.mjs
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(workspaceRoot, 'dist-sp2');

// 清理 dist-sp2
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 构建 sp2-workspace
console.log('Building sp2-workspace...');
const result = spawnSync('npx', ['vite', 'build', '--config', 'vite.config.sp2.ts'], {
  cwd: workspaceRoot,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NODE_ENV: 'production' }
});

if (result.status !== 0) {
  console.error('Build failed');
  process.exit(1);
}

// 生成 index.html
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>云梦泽服务商工作台2.0 - 中国石油能源与化工产业智慧电商服务平台</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⛽</text></svg>" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./sp2-workspace/index.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml, 'utf8');
console.log('Generated index.html');

// 复制 assets
const assetsDir = path.resolve(workspaceRoot, 'dist', 'assets');
const destAssetsDir = path.join(distDir, 'sp2-workspace');
if (!fs.existsSync(destAssetsDir)) {
  fs.mkdirSync(destAssetsDir, { recursive: true });
}

// 将 JS 移动到 sp2-workspace 子目录
const srcJs = path.resolve(workspaceRoot, 'dist', 'prototypes', 'sp2-workspace', 'index.js');
const destJs = path.join(destAssetsDir, 'index.js');
if (fs.existsSync(srcJs)) {
  fs.copyFileSync(srcJs, destJs);
  console.log('Copied index.js');
}

// 复制 assets 目录
if (fs.existsSync(assetsDir)) {
  const destAssetsRoot = path.join(distDir, 'assets');
  if (!fs.existsSync(destAssetsRoot)) {
    fs.mkdirSync(destAssetsRoot, { recursive: true });
  }
  const items = fs.readdirSync(assetsDir);
  for (const item of items) {
    const src = path.join(assetsDir, item);
    const dest = path.join(destAssetsRoot, item);
    if (fs.statSync(src).isDirectory()) {
      fs.cpSync(src, dest, { recursive: true });
    } else {
      fs.copyFileSync(src, dest);
    }
  }
  console.log('Copied assets/');
}

console.log('\nBuild complete! Output: dist-sp2/');
