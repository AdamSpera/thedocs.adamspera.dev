// Constants for the user, repo, and start folder
const user = "adamspera";
const repo = "thedocs.adamspera.dev";
const base_url = `https://api.github.com/repos/${user}/${repo}/git/trees/main?recursive=1`;

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
        $('.navbar-toggler').click();
    });
    $('#clear-cache').click(async () => {
        const cache = await caches.open('docs-cache');
        await cache.delete('structure');
        location.reload();
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
        $('#section-fileexplorer').html(`
            <div class="container my-6">
                <h1 style="margin-bottom: 1rem;">File structure not found.</h1>
                <p>An issue was encountered getting the file structure.</p>
                <p>To fix this issue, wait an hour, then try again!</p>
            </div>
        `);
    }
}

// This function fetches the directory contents from the GitHub API
async function fetchDirectoryContents() {
    const response = await fetch(base_url);
    const data = await response.json();

    let directoryStructure = {};

    // Filter out items that are not in the 'content' directory or are not files
    const contentItems = data.tree.filter(item => item.type === 'blob' && item.path.startsWith('content/'));

    for (let item of contentItems) {
        let pathParts = item.path.split('/');
        let currentLevel = directoryStructure;

        // Skip the first part of the path ('content')
        for (let i = 1; i < pathParts.length; i++) {
            // If this is the last part of the path, it's a file
            if (i === pathParts.length - 1) {
                currentLevel[pathParts[i]] = 'file';
            } else {
                // If this part of the path does not exist yet, create it
                if (!currentLevel[pathParts[i]]) {
                    currentLevel[pathParts[i]] = {};
                }
                // Move to the next level of the directory structure
                currentLevel = currentLevel[pathParts[i]];
            }
        }
    }

    // Return the directory structure
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
    $.get(`content/${url}`)
        .done((data) => {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(data);
            if (data.includes("DOCTYPE")) {
                $('#section-documentviewer').html(`
                    <div class="container" id="content">
                        <h2>File not found.</h2>
                        <p>The file you are trying to access has been deleted or moved since your last cache.</p>
                        <p>To fix this issue, you can wait 24 hours for the cache to auto reset, or press the button below to clear it now!</p>
                        <button id="clear-cache" class="btn btn-outline-primary my-2 my-lg-0 top-bar-button">Clear Cache</button>
                    </div>
                    <script>setupEventHandlers()</script>`
                );
            } else {
                $('#section-documentviewer').html(`<div class="container" id="content">${html}</div>`);
            }

        })
}