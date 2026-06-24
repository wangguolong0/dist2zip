#!/usr/bin/env node

const dayjs = require('dayjs');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const args = process.argv.slice(2);
const nameIndex = args.indexOf('--name') || args.includes('-N');
const distName = nameIndex !== -1 ? args[nameIndex + 1] : 'dist';
const hasVersionFlag = args.includes('--version') || args.includes('-V');

// 新增版本号读取逻辑
let packageVersion = '';
try {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = require(pkgPath);
    packageVersion = pkg.version || '';
} catch (err) {
    console.error('[ERROR] 无法读取 package.json:', err.message);
    process.exit(1);
}

const timestamp = dayjs().format('YYYYMMDDHHMM');
const fileName = hasVersionFlag && packageVersion 
    ? `${distName}-v${packageVersion}-${timestamp}.zip`
    : `${distName}-${timestamp}.zip`;

const rootDir = process.cwd();
const distDir = path.join(rootDir, distName);

// 检查 dist 目录是否存在
if (!fs.existsSync(distDir)) {
    console.error(`[ERROR] ${distName} 目录不存在`);
    process.exit(1);
}

/**
 * 创建 ZIP 文件（路径基于用户项目根目录）
 */
const output = fs.createWriteStream(
    path.join(rootDir, fileName)  // 使用新文件名
);

const archive = archiver('zip', { zlib: { level: 9 } });

// 事件监听和压缩逻辑保持不变
output.on('close', () => {
    console.log(archive.pointer() + ' total bytes');
    console.log('压缩完成');
});

archive.on('error', (err) => {
    console.error('[ERROR] 压缩失败:', err);
    process.exit(1);
});

archive.pipe(output);
archive.directory(distDir, false);
archive.finalize();