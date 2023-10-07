const { JSDOM } = require("jsdom")

function normalizeURL(url) {
    const urlObj = new URL(url)
    const host = `${urlObj.hostname}${urlObj.pathname}`
    if (host.length > 0 && host.slice(-1) === "/") {
        return host.slice(0, -1)
    } 
    return host
}

function getURLsFromHTML(html, url) {
    const links = []
    const dom = new JSDOM(html)
    const elements = dom.window.document.querySelectorAll("a")
    for (const link of elements) {
        if (link.href.slice(0, 1) === "/") {
            try {
                const urlObj = new URL(`${url}${link.href}`)
                links.push(urlObj.href)
            } catch (err) {
                console.log(err)
            }
        } else {
            links.push(link.href)
        }
    }
    return links
}

async function crawlPage(baseURL, currentURL, pages) {

        baseObj = new URL(baseURL)
        currObj = new URL(currentURL)

    if (baseObj.hostname !== currObj.hostname) {
        return pages
    }

    const normalizedCurr = normalizeURL(currentURL)

    if (!pages[normalizedCurr]) {
        pages[normalizedCurr] = 1
    } else {
        pages[normalizedCurr]++
        return pages
    }
    
    console.log(`Starting crawling on ${baseURL}`)


    try {
        const response = await fetch(baseURL)
        if (!response.ok) {
            console.log(`Error: ${response.status}`)
            return pages
        }
        const type = response.headers.get("Content-Type")
        if (!type || !type.includes("text/html")) {
            console.log("Error: The file isn't text/html")
            return pages
        }

        const html = await response.text()
        const neighbourURLS = getURLsFromHTML(html, baseURL)
    
        for (const neighbour of neighbourURLS) {
            console.log(`Crawling on ${neighbour}`)
            pages = await crawlPage(baseURL, neighbour, pages)
        }
    } catch (err) {
        console.log(err.text)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }