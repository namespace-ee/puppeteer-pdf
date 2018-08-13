# Puppeteer PDF CLI

HTML to PDF from the command line with Puppeteer.

[![GitHub stars](https://img.shields.io/github/stars/namespace-ee/puppeteer-pdf.svg?style=social&label=Stars)](https://github.com/namespace-ee/puppeteer-pdf)
[![npm downloads](https://img.shields.io/npm/dt/puppeteer-pdf.svg)](https://npmjs.org/package/puppeteer-pdf)
[![npm license](https://img.shields.io/npm/l/puppeteer-pdf.svg)](https://npmjs.org/package/puppeteer-pdf)
[![npm version](https://img.shields.io/npm/v/puppeteer-pdf.svg)](https://npmjs.org/package/puppeteer-pdf)

## Help
```
puppeteer-pdf --help
  Usage: puppeteer-pdf [options]


  Options:

    -V, --version                     output the version number
    -p, --path <path>                 The file path to save the PDF to.
    -s, --scale [scale]               Scale of the webpage rendering. (default: 1)
    -dhf, --displayHeaderFooter       Display header and footer.
    -ht, --headerTemplate [template]  HTML template for the print header.
    -ft, --footerTemplate [template]  HTML template for the print footer.
    -pb, --printBackground            Print background graphics.
    -l, --landscape                   Paper orientation.
    -pr, --pageRanges <range>         Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
    -f, --format [format]             Paper format. If set, takes priority over width or height options. Defaults to 'Letter'. (default: Letter)
    -w, --width [width]               Paper width, accepts values labeled with units.
    -h, --heigh [height]              Paper height, accepts values labeled with units.
    -mt, --marginTop [margin]         Top margin, accepts values labeled with units.
    -mr, --marginRight [margin]       Right margin, accepts values labeled with units.
    -mb, --marginBottom [margin]      Bottom margin, accepts values labeled with units.
    -ml, --marginLeft [margin]        Left margin, accepts values labeled with units.
    -d, --debug                       Output Puppeteer PDF options
    -wu, --waitUntil [choice]         waitUntil accepts choices load, domcontentloaded, networkidle0, networkidle2. Defaults to 'networkidle2'. (default: networkidle2)
    -h, --help                        output usage information
```

## Examples
```shell
puppeteer-pdf tests/test.html \
  --path demo.pdf \
  --landscape \
  --debug \
  --waitUntil networkidle0
```

```shell
puppeteer-pdf tests/test.html \
  --path demo-file-header.pdf \
  --landscape \
  --headerTemplate=file://tests/header.html \
  --debug \
  --marginTop 200px \
  --scale 2 \
  --displayHeaderFooter
```

```shell
puppeteer-pdf tests/test.html \
  --path demo-inline-header.pdf \
  --landscape \
  --headerTemplate='<table style="width: 100%; margin-left: 5px; margin-right: 5px; margin-bottom: 0px;"> <tr> <td class="section" style="text-align:left"> <div style="font-size: 10px;"> <p>Report Name</p> <p>Some Text</p></div> </td> <td style="text-align:right"> <div style="font-size: 10px;"> <p>Start - End</p> </div> </td> </tr> </table>' \
  --debug \
  --marginTop 200px \
  --displayHeaderFooter
```

## License
MIT
