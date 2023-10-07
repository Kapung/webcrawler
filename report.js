function printReport(pages) {
    console.log("==============\nReport is starting...\n==============")
    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        const url = page[0]
        const count = page[1]
        console.log(`Found ${count} internal links to ${url}`)    
    }
    console.log("==============\nReport has stopped...\n==============")

}

function sortPages(pages) {
    console.log("Sorting...")
    const pagesList = Object.entries(pages)
    pagesList.sort((a, b) => {
        aH = a[1],
        bH = b[1]
        return b[1] - a[1]
    })
    return pagesList
}

module.exports = {
    sortPages,
    printReport
}