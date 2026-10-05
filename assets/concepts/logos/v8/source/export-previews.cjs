const path = require('path');
const sharp = require('/Users/rakibahmed/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

const folder = path.resolve(__dirname, '..');
const names = ['01-db-swordslapper-classic', '02-db-swordslapper-sword-t'];
const jobs = names.flatMap(name => [
  sharp(path.join(folder, `${name}.svg`), { density: 144 }).resize(1920, 720).png().toFile(path.join(folder, `${name}.png`)),
  sharp(path.join(folder, `${name}-transparent.svg`), { density: 144 }).resize(1920, 720).png().toFile(path.join(folder, `${name}-transparent.png`)),
]);

for (const name of ['03-classic-wordmark', '04-sword-t-wordmark']) {
  jobs.push(sharp(path.join(folder, `${name}.svg`), { density: 216 }).resize(1644, 960).png().toFile(path.join(folder, `${name}.png`)));
}

jobs.push(sharp(path.join(folder, '00-concept-sheet.svg')).png().toFile(path.join(folder, '00-concept-sheet.png')));

Promise.all(jobs)
  .then(() => process.stdout.write('Saved seven v8 PNG artwork exports\n'))
  .catch(error => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
