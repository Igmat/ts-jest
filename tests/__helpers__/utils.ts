import { } from 'jest';
import { } from 'node';
// from: https://github.com/facebook/jest/blob/master/integration_tests/utils.js

const {spawnSync} = require('cross-spawn').sync;
const fs = require('fs');
const path = require('path');

const run = (cmd, cwd) => {
  const args = cmd.split(/\s/).slice(1);
  const spawnOptions = {cwd};
  const result = spawnSync(cmd.split(/\s/)[0], args, spawnOptions);

  if (result.status !== 0) {
    const message = `
      ORIGINAL CMD: ${cmd}
      STDOUT: ${result.stdout && result.stdout.toString()}
      STDERR: ${result.stderr && result.stderr.toString()}
      STATUS: ${result.status}
      ERROR: ${result.error}
    `;
    throw new Error(message);
  }

  return result;
};

const linkJestPackage = (packageName, cwd) => {
  const packagesDir = path.resolve(__dirname, '../packages');
  const packagePath = path.resolve(packagesDir, packageName);
  const destination = path.resolve(cwd, 'node_modules/');
  run(`mkdir -p ${destination}`, undefined);
  return run(`ln -sf ${packagePath} ${destination}`, undefined);
};

const fileExists = filePath => {
  try {
    fs.accessSync(filePath, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  fileExists,
  linkJestPackage,
  run,
};