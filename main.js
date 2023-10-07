const { crawlPage } = require("./crawl.js")
const { printReport } = require("./report.js")

async function main() {

    if (process.argv.length < 3) {
        throw new Error()
    } else if (process.argv.length > 4) {
        throw new Error()
    }
    console.log(`Starting webcrawler with ${process.argv[2]}`)
    const url = process.argv[2]
    const html = await crawlPage(url, url, {})
    printReport(html)
}

main()