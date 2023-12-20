const user = "adamspera";
const repo = "docs.adamspera.dev";
const start_folder = "content";
const base_url = `https://api.github.com/repos/${user}/${repo}/contents/${start_folder}`;

$(document).ready(initializeApp);

function initializeApp() {
    setupSidebarClickEvent();
    fetchAndDisplayDirectoryContents();
}

function setupSidebarClickEvent() {
    $('.sidebar-widget').on('click', function () {
        $('.sidebar-widget').removeClass('active');
        $(this).addClass('active');
    });
}

async function fetchAndDisplayDirectoryContents() {
    try {
        const structure = await fetchDirectoryContents(base_url);
        displayTree(structure, $('#tree'));
    } catch (error) {
        console.error(error);
        alert('Failed to fetch repository structure');
    }
}

async function fetchDirectoryContents(url) {
    const cache = await caches.open('docs-cache');
    const cachedResponse = await getCachedResponse(cache, url);

    let response;
    if (cachedResponse) {
        response = await cachedResponse.json();
    } else {
        response = await fetchAndCacheResponse(cache, url);
    }

    return await buildDirectoryStructure(response);
}

async function getCachedResponse(cache, url) {
    const lastFetch = await cache.match(url + '-time');
    if (lastFetch && Date.now() - lastFetch > 7 * 24 * 60 * 60 * 1000) {
        await cache.delete(url);
        await cache.delete(url + '-time');
    }
    return await cache.match(url);
}

async function fetchAndCacheResponse(cache, url) {
    const response = await $.ajax({ url: url, method: 'GET' });
    await cache.put(url, new Response(JSON.stringify(response)));
    await cache.put(url + '-time', new Response(Date.now().toString()));
    return response;
}

async function buildDirectoryStructure(response) {
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

function displayTree(structure, parentElement) {
    parentElement.empty();
    createTree(structure, parentElement);
}

function createTree(structure, parentElement, parentPath = '') {
    const ul = $('<ul></ul>');
    $.each(structure, (key, value) => {
        const currentPath = parentPath ? `${parentPath}/${key}` : key;
        const li = createListItem(key, value, currentPath);
        ul.append(li);
    });
    parentElement.append(ul);
}

function createListItem(key, value, currentPath) {
    const li = $('<li></li>').text(key);
    if ($.isPlainObject(value)) {
        handleDirectory(li, value, currentPath);
    } else {
        handleFile(li, currentPath);
    }
    return li;
}

function handleDirectory(li, value, currentPath) {
    const subUl = $('<ul></ul>').css('display', 'none');
    createTree(value, subUl, currentPath);
    li.append(subUl);
    li.css('cursor', 'pointer');
    li.click((event) => {
        event.stopPropagation();
        subUl.slideToggle();
    });
}

function handleFile(li, currentPath) {
    li.click((event) => {
        event.stopPropagation();
        $('.sidebar-widget, .tree li').removeClass('active');
        li.addClass('active');
        fetchAndDisplayMarkdown(currentPath);
    });
}

async function fetchAndDisplayMarkdown(url) {
    $.get(`content/${url}`, (data) => {
        const converter = new showdown.Converter();
        const html = converter.makeHtml(data);
        $('#content').html(html);
    });
}