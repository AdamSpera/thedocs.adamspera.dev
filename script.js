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
    if (lastFetch && Date.now() - lastFetch > 60 * 60 * 1000) {
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
    const li = $('<li></li>');
    key = key.replace('.md', '');
    if ($.isPlainObject(value)) {
        handleDirectory(li, value, currentPath, key);
    } else {
        handleFile(li, currentPath, key);
    }
    return li;
}

function handleDirectory(li, value, currentPath, key) {
    $(li).html('<img src="icons/folder-solid.svg" alt="Folder" class="icon">' + key);

    const subUl = $('<ul></ul>').css('display', 'none');
    createTree(value, subUl, currentPath);
    li.append(subUl);
    li.css('cursor', 'pointer');

    li.click((event) => {
        event.stopPropagation();
        subUl.slideToggle();
        // Find the image and toggle its source
        var img = $(li).find('img').first();
        var currentIcon = img.attr('src');
        var newIcon = currentIcon === 'icons/folder-solid.svg' ? 'icons/folder-open.svg' : 'icons/folder-solid.svg';
        img.attr('src', newIcon);
    });
}

function handleFile(li, currentPath, key) {
    $(li).html('<img src="icons/file-solid.svg" alt="File" class="icon">' + key);

    li.click((event) => {
        event.stopPropagation();

        $('img[src="icons/file-open.svg"]').each(function () {
            $(this).attr('src', 'icons/file-solid.svg');
        });

        // Find the image and toggle its source
        var img = $(li).find('img').first();
        var currentIcon = img.attr('src');
        var newIcon = currentIcon === 'icons/file-solid.svg' ? 'icons/file-open.svg' : 'icons/file-solid.svg';
        img.attr('src', newIcon);

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