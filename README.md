# Puppeteer PDF CLI

Created PDF from the command line with Puppeteer.

### Testing
```shell
puppeteer-pdf tests/test.html --path g.pdf --landscape --headerTemplate=file:///Users/konstruktor/Documents/puppeteer-pdf/tests/header.html --debug --marginTop 500px --marginLeft 200px --scale 2 --displayHeaderFooter
```

```shell
puppeteer-pdf tests/test.html --path g.pdf --landscape --headerTemplate='<table style="width: 100%; margin-left: 5px; margin-right: 5px; margin-bottom: 0px;"> <tr> <td class="section" style="text-align:left"> <div style="font-size: 10px;"> <p>Report Name</p> <p>Some Text</p></div> </td> <td style="text-align:right"> <div style="font-size: 10px;"> <p>Start - End</p> </div> </td> </tr> </table>' --debug --marginTop 500px --marginLeft200px --scale 2 --displayHeaderFooter
```