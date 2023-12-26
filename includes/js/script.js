// Constants for the user, repo, and start folder
const user = "adamspera";
const repo = "thedocs.adamspera.dev";
const start_folder = "content";
const base_url = `https://api.github.com/repos/${user}/${repo}/contents/${start_folder}`;

// Initialize the app when the document is ready
$(document).ready(initializeApp);

// This function sets up the event handlers and fetches the directory contents
function initializeApp() {
    setupEventHandlers();
    fetchAndDisplayDirectoryContents();
}

// This function sets up the event handlers for the GitHub link, explore button, and clear cache button
function setupEventHandlers() {
    $('#github-link').click(() => window.location.href = "https://github.com/AdamSpera/thedocs.adamspera.dev");
    $('#explore').click(() => {
        $('#section-documentviewer').empty();
        $('#section-fileexplorer').show();
    });
}

// This function fetches and displays the directory contents
async function fetchAndDisplayDirectoryContents() {
    try {
        const cache = await caches.open('docs-cache');
        let cachedData = await getCachedStructure(cache, 'structure');

        if (!cachedData || isOverADayOld(cachedData.timestamp)) {
            const structure = await fetchDirectoryContents(base_url);
            cachedData = {
                timestamp: Date.now(),
                structure: structure
            };
            await cacheStructure(cache, 'structure', cachedData);
        }

        displayTree(cachedData.structure, $('#tree'));
        $('li').eq(2).click();
    } catch (error) {
        console.error(error);
        alert('Failed to fetch repository structure');
    }
}

// This function fetches the directory contents from the GitHub API
async function fetchDirectoryContents(url) {
    const response = await $.ajax({ url: url, method: 'GET' });
    let directoryStructure = {};

    for (let item of response) {
        if (item.type === 'file') {
            directoryStructure[item.name] = 'file';
        } else if (item.type === 'dir') {
            directoryStructure[item.name] = await fetchDirectoryContents(item.url);
        }
    }

    return directoryStructure;
}

// This function retrieves the cached structure
async function getCachedStructure(cache, key) {
    const cachedResponse = await cache.match(key);
    return cachedResponse ? await cachedResponse.json() : null;
}

// This function checks if a timestamp is over a day old
function isOverADayOld(timestamp) {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const now = Date.now();
    return now - timestamp > oneDay;
}

// This function caches the structure
async function cacheStructure(cache, key, data) {
    await cache.put(key, new Response(JSON.stringify(data)));
}

// This function fetches and displays the markdown
async function fetchAndDisplayMarkdown(url) {
    $.get(`content/${url}`, (data) => {
        const converter = new showdown.Converter();
        const html = converter.makeHtml(data);
        $('#section-documentviewer').html(`<div class="container" id="content">${html}</div>`);
    });
}