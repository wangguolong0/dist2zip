# dist Directory Compression Tool

## Overview

A lightweight CLI tool to compress `dist` directory into timestamped ZIP files. Perfect for creating deployment archives or backups after build processes.

## Features

- ✅ **Smart Path Detection** - Automatically finds project root directory
- 🆕 **Custom Directory** - Support `--name` or `-N` param to specify target directory
- 🆕 **Version Integration** - Add `--version` or `-V` flag to include package version
- 🛡️ **Pre-check Validation** - Verifies directory existence before compression
- ⚡ **High Compression** - Uses ZIP level 9 for maximum compression
- 📅 **Auto-timestamping** - Generates `目录名-版本-时间戳.zip` filename
- 🚨 **Error Handling** - Clear error messages for common issues

## Installation

```bash
npm install dist2zip --save-dev
```

## Usage

### New Parameters

| Parameter      | Description                     | Example                     |
|----------------|---------------------------------|----------------------------|
| `--name / -N <dir>` | 指定打包目录 (默认: dist)       | `zip --name ui`            |
| `-version` / `-V`    | 在文件名中包含版本号            | `zip -V`                   |

#### Method 1: Direct Execution

```bash
npx zip
```

#### Method 2: npm Script Integration
Add the following script to your `package.json`:

```json
{
  "scripts": {
    "zip": "zip",
    "build": "vite build && zip"
  }
}
```

For example, if you want to compress the `dist` directory in a project with a custom directory name, you can use the following script:
```json
{
  "scripts": {
    "build": "vite build && zip --version --name invalid_dir" // or `zip -V -N invalid_dir`
  }
}
```

Then run the following command in your project root directory:

```bash
npm run zip     # Just compress
npm run build   # Build and auto-compress
```

#### Method 3: Combine with Build Process

For popular frameworks:

<details> <summary>Vite/Vue/React</summary>

```json
{
  "scripts": {
    "build": "vite build && zip",
    "build:prod": "vite build --mode production && zip"
  }
}
```

</details> <details> <summary>Webpack</summary>

```json
{
  "scripts": {
    "build": "webpack --config webpack.config.js && zip"
  }
}
```

</details> <details> <summary>TypeScript</summary>

```json
{
  "scripts": {
    "build": "tsc && zip"
  }
}
```

</details>

## Expected Output
Successful compression:

```bash
1984527 total bytes
压缩完成
```

Error case (no dist directory):

```bash
[ERROR] dist 目录不存在
```

## Troubleshooting

| Error |	Solution |
| --- | --- |
|`dist 目录不存在` |	Run build process before zipping |
|EACCES permission |	Add `sudo` prefix for system dirs |
|ENOSPC disk space |	Check storage capacity |
|[ERROR] <目录名> 目录不存在 |	Check if the value of the `--name` parameter is correct |
|[ERROR] 无法读取 package.json |	Ensure that the file exists in the root directory of the project |
