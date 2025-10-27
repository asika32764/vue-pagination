import minimist from 'minimist';
import { execSync as exec } from 'child_process';

const cliInput = minimist(process.argv.slice(2));

const args = cliInput._;

if (!args.length) {
  console.log('Please provide release type (major | minor | patch | premajor | preminor | prepatch | prerelease)');
  process.exit(255);
}

const help = `
Usage: release.js -- <arguments for "npm version">
  -b    Branch name to push. 
`;

if (cliInput['help'] || cliInput['h']) {
  console.log(help);
  process.exit(0);
}

console.log(`>>> yarn build:prod`);
exec(`yarn build:prod`, { stdio: 'inherit' });

console.log(`>>> npm version ${args.join(' ')} --no-git-tag-version`);
exec(`npm version ${args.join(' ')} --no-git-tag-version`, { stdio: 'inherit' });

const ver = exec(`npm pkg get version | tr -d '"'`).toString().trim();

console.log('>>> Git commit all');

try {
  exec(`git commit -am "Prepare release ${ver}."`, { stdio: 'inherit' });
} catch (e) {
  console.log(e.message);
}

console.log(`>>> Git tag ${ver}`);
exec(`git tag ${ver}`, { stdio: 'inherit' });

// const branch = cliInput['b'] || 'main';

console.log('>>> Push to git');

exec(`git push`, { stdio: 'inherit' });

console.log('>> Publish to npm');

exec(`npm publish`, { stdio: 'inherit' });
