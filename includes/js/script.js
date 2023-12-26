const user = "adamspera";
const repo = "thedocs.adamspera.dev";
const start_folder = "content";
const base_url = `https://api.github.com/repos/${user}/${repo}/contents/${start_folder}`;

$(document).ready(initializeApp);

function initializeApp() {
    setupEventHandlers();
    fetchAndDisplayDirectoryContents();
}

function setupEventHandlers() {
    $('#github-link').click(() => window.location.href = "https://github.com/AdamSpera/thedocs.adamspera.dev");
    $('#explore').click(() => {
        $('#section-documentviewer').empty();
        $('#section-fileexplorer').show();
    });
    $('#clear-cache').click(async () => {
        const cache = await caches.open('docs-cache');
        await cache.delete('structure');
        alert('Cache cleared!');
    });
}

async function fetchAndDisplayDirectoryContents() {
    try {
        const cache = await caches.open('docs-cache');
        let structure = await getCachedStructure(cache, 'structure');

        if (!structure) {
            structure = await fetchDirectoryContents(base_url);
            await cacheStructure(cache, 'structure', structure);
        }

        displayTree(structure, $('#tree'));
        $('li').eq(2).click();
    } catch (error) {
        console.error(error);
        alert('Failed to fetch repository structure');
    }
}

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

async function getCachedStructure(cache, key) {
    const cachedResponse = await cache.match(key);
    return cachedResponse ? await cachedResponse.json() : null;
}

async function cacheStructure(cache, key, structure) {
    await cache.put(key, new Response(JSON.stringify(structure)));
}

async function fetchAndDisplayMarkdown(url) {
    $.get(`content/${url}`, (data) => {
        const converter = new showdown.Converter();
        const html = converter.makeHtml(data);
        $('#section-documentviewer').html(`<div class="container" id="content">${html}</div>`);
    });
}