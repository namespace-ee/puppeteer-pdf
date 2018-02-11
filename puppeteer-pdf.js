#!/usr/bin/env node

const _ = require('lodash');
const cli = require('commander');
const minimist = require('minimist');
const puppeteer = require('puppeteer');


cli
  .version('0.1.0')
  .option('-u, --url', 'URL to render into PDF.')
  .option('-p, --path', 'The file path to save the PDF to.')
  .option('-s, --scale', 'Scale of the webpage rendering. Defaults to 1.')
  .option('-dhf, --displayHeaderFooter', 'Display header and footer. Defaults to false.')
  .option('-ht, --headerTemplate', 'HTML template for the print header.')
  .option('-ft, --footerTemplate', 'HTML template for the print footer.')
  .option('-ht, --printBackground', 'Print background graphics. Defaults to false.')
  .option('-ft, --landscape', 'Paper orientation. Defaults to false.')
  .option('-pr, --pageRanges', 'Paper ranges to print, e.g., \'1-5, 8, 11-13\'. Defaults to the empty string, which means print all pages.')
  .option('-f, --format', 'Paper orientation. Defaults to false.')
  .option('-w, --width', 'Paper orientation. Defaults to false.')
  .option('-h, --height', 'Paper orientation. Defaults to false.')
  .option('-mt, --margintTop', 'Paper margin top, defaults to none.')
  .option('-mr, --margintRight', 'Paper margin right, defaults to none.')
  .option('-mb, --margintBottom', 'Paper margin bottom, defaults to none.')
  .option('-ml, --margintLeft', 'Paper margin left, defaults to none.')
  .parse(process.argv);

(async () => {
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

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(cli.url, {
    waitUntil: 'networkidle2'
  })
  await page.pdf(options)

  await browser.close()
})();
