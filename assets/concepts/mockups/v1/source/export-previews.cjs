const path = require('path');
const sharp = require('/Users/rakibahmed/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

const folder = path.resolve(__dirname, '..');
const concepts = ['01-obsidian-codex', '02-silver-atlas', '03-the-armory'];
const jobs = concepts.flatMap(name => [
  sharp(path.join(folder, `${name}-desktop.svg`)).resize(1440, 900).png().toFile(path.join(folder, `${name}-desktop.png`)),
  sharp(path.join(folder, `${name}-mobile.svg`), { density: 144 }).resize(780, 1688).png().toFile(path.join(folder, `${name}-mobile.png`)),
]);

jobs.push(sharp(path.join(folder, '00-overview.svg')).png().toFile(path.join(folder, '00-overview.png')));

Promise.all(jobs)
  .then(() => process.stdout.write('Saved seven mockup PNG exports\n'))
  .catch(error => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
