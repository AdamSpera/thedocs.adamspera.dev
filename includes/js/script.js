const user = "adamspera";
const repo = "thedocs.adamspera.dev";
const start_folder = "content";
const base_url = `https://api.github.com/repos/${user}/${repo}/contents/${start_folder}`;

$(document).ready(initializeApp);

function initializeApp() {
    fetchAndDisplayDirectoryContents();

    $('#github-link').click(function() {
        window.location.href = "https://github.com/AdamSpera/thedocs.adamspera.dev";
    });
}

async function fetchAndDisplayDirectoryContents() {
    try {
        const structure = await fetchDirectoryContents(base_url);
        console.log(structure);
        displayTree(structure, $('#tree'));
        $('li').eq(2).click();
    } catch (error) {
        console.error(error);
        alert('Failed to fetch repository structure');
    }
}

async function fetchDirectoryContents(github_url) {
    const cache = await caches.open('docs-cache');
    const cachedResponse = await getCachedResponse(cache, github_url);

    let response;
    if (cachedResponse) {
        response = await cachedResponse.json();
    } else {
        response = await fetchAndCacheResponse(cache, github_url);
    }

    return await buildDirectoryStructure(response);
}

async function getCachedResponse(cache, url) {
    const lastFetchResponse = await cache.match(url + '-time');
    if (lastFetchResponse) {
        const lastFetch = await lastFetchResponse.text();
        if (Date.now() - lastFetch > 1800000) {
            console.log(`Cached response for URL: ${url} is older than 30 minutes. Deleting from cache.`);
            await cache.delete(url);
            await cache.delete(url + '-time');
        }
    }
    return await cache.match(url);
}

async function fetchAndCacheResponse(cache, url) {
    const response = await $.ajax({ url: url, method: 'GET' });
    await cache.put(url, new Response(JSON.stringify(response)));
    await cache.put(url + '-time', new Response(Date.now().toString()));
    return response;
}

async function fetchAndDisplayMarkdown(url) {
    $.get(`content/${url}`, (data) => {
        const converter = new showdown.Converter();
        const html = converter.makeHtml(data);
        $('#section-documentviewer').html(`<div class="container" id="content">${html}</div>`);
    });
}