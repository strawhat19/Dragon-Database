const path = require('node:path');
const sharp = require('/Users/rakibahmed/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

const round = path.resolve(__dirname, '..');
const concepts = [
  '01-steel-masthead-inset',
  '02-steel-masthead-fullbleed',
];

const exportPreviews = async () => {
  for (const concept of concepts) {
    await sharp(path.join(round, `${concept}-desktop.svg`))
      .resize(1440, 900)
      .png()
      .toFile(path.join(round, `${concept}-desktop.png`));
    await sharp(path.join(round, `${concept}-mobile.svg`), { density: 144 })
      .resize(780, 1688)
      .png()
      .toFile(path.join(round, `${concept}-mobile.png`));
    console.log(`Saved ${concept} previews`);
  }
  for (const name of ['00-overview', '03-heading-detail']) {
    await sharp(path.join(round, `${name}.svg`))
      .png()
      .toFile(path.join(round, `${name}.png`));
  }
  console.log('Saved Round 07 overview and heading detail');
};

exportPreviews().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
