const _ = require('lodash');
const minimist = require('minimist');
const puppeteer = require('puppeteer');

const args = minimist(process.argv.slice(2), {
  string: [
    'path',
    'scale',
    'headerTemplate',
    'footerTemplate',
    'pageRanges',
    'format',
    'width',
    'height',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft'
  ],
  boolean: [
    'displayHeaderFooter',
    'printBackground',
    'landscape',
  ]
});

(async () => {
  const url = _.first(_.get(args, '_'))
  let options = _.omit(args, ['_', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft'])

  const margin = _.pickBy({
    top: _.get(args, 'marginTop', null),
    right: _.get(args, 'marginRight', null),
    bottom: _.get(args, 'marginBottom', null),
    left: _.get(args, 'marginLeft', null)
  }, _.identity)
  if (!_.isEmpty(margin)) {
    options['margin'] = margin
  }

  console.log(options)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
  await page.pdf(options)

  await browser.close()
})();
