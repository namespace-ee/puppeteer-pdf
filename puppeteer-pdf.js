#!/usr/bin/env node

const _ = require("lodash");
const cli = require("commander");
const fileUrl = require("file-url");
const fs = require("fs");
const isUrl = require("is-url");
const puppeteer = require("puppeteer");

cli
  .version("1.2.0")
  .option("-p, --path <path>", "The file path to save the PDF to.")
  .option(
    "-s, --scale [scale]",
    "Scale of the webpage rendering.",
    parseFloat,
    1
  )
  .option("-dhf, --displayHeaderFooter", "Display header and footer.", false)
  .option(
    "-ht, --headerTemplate [template]",
    "HTML template for the print header."
  )
  .option(
    "-ft, --footerTemplate [template]",
    "HTML template for the print footer."
  )
  .option("-pb, --printBackground", "Print background graphics.", false)
  .option("-l, --landscape", "Paper orientation.", false)
  .option(
    "-pr, --pageRanges <range>",
    "Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages."
  )
  .option(
    "-f, --format [format]",
    "Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.",
    "Letter"
  )
  .option(
    "-w, --width [width]",
    "Paper width, accepts values labeled with units."
  )
  .option(
    "-h, --heigh [height]",
    "Paper height, accepts values labeled with units."
  )
  .option(
    "-mt, --marginTop [margin]",
    "Top margin, accepts values labeled with units."
  )
  .option(
    "-mr, --marginRight [margin]",
    "Right margin, accepts values labeled with units."
  )
  .option(
    "-mb, --marginBottom [margin]",
    "Bottom margin, accepts values labeled with units."
  )
  .option(
    "-ml, --marginLeft [margin]",
    "Left margin, accepts values labeled with units."
  )
  .option("-d, --debug", "Output Puppeteer PDF options")
  .option(
    "-wu, --waitUntil [choice]",
    "waitUntil accepts choices load, domcontentloaded, networkidle0, networkidle2. Defaults to 'networkidle2'.",
    "networkidle2"
  )
  .action(function(required, optional) {
    // TODO: Implement required arguments validation
  })
  .parse(process.argv);

(async () => {
  let options = {};

  // Loop through options
  _.each(cli.options, function(option) {
    const optionName = option.name();
    if (!_.isNil(cli[optionName]) && !["version"].includes(optionName)) {
      const optionValue = cli[optionName];

      if (_.startsWith(optionName, "margin")) {
        // Margins need to be combined into an object
        _.set(
          options,
          ["margin", optionName.replace("margin", "").toLowerCase()],
          optionValue
        );
      } else {
        _.set(options, optionName, optionValue);
      }
    }
  });

  // Check if we need to read header or footer templates from files
  _.each(["headerTemplate", "footerTemplate"], function(template) {
    if (_.get(options, template, "").startsWith("file://")) {
      options[template] = fs.readFileSync(
        options[template].replace("file://", ""),
        "utf-8"
      );
    }
  });

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  // Get URL / file path from first argument
  const location = _.first(cli.args);
  await page.goto(isUrl(location) ? location : fileUrl(location), {
    waitUntil: _.get(options, "waitUntil", "networkidle2")
  });
  // Output options if in debug mode
  if (cli.debug) {
    console.log(options);
  }
  await page.pdf(options);

  await browser.close();
})();
