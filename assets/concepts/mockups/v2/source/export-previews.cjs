const path = require('path');
const sharp = require('/Users/rakibahmed/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

const folder = path.resolve(__dirname, '..');
const concepts = ['01-obsidian-bestiary', '02-armory-directory'];
const jobs = concepts.flatMap(name => [
  sharp(path.join(folder, `${name}-desktop.svg`)).resize(1440, 900).png().toFile(path.join(folder, `${name}-desktop.png`)),
  sharp(path.join(folder, `${name}-mobile.svg`), { density: 144 }).resize(780, 1688).png().toFile(path.join(folder, `${name}-mobile.png`)),
]);

for (const name of ['00-overview', '03-dragon-slapper-study']) {
  jobs.push(sharp(path.join(folder, `${name}.svg`)).png().toFile(path.join(folder, `${name}.png`)));
}

Promise.all(jobs)
  .then(() => process.stdout.write('Saved six v2 PNG artwork exports\n'))
  .catch(error => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
