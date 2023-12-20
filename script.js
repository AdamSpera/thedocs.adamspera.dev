$(document).ready(function () {

    // Static sidebar items click event
    $('.sidebar-widget').on('click', function () {
        $('.sidebar-widget').removeClass('active');
        $(this).addClass('active');
    });

    const user = "adamspera"
    const repo = "docs.adamspera.dev"
    const start_folder = "content"
    const base_url = `https://api.github.com/repos/${user}/${repo}/${start_folder}`;

    fetchDirectoryContents(base_url).then(structure => {
        displayTree(structure, $('#tree'));
    }).catch(error => {
        console.error(error);
        alert('Failed to fetch repository structure');
    });
});

async function fetchDirectoryContents(url) {
    const response = await $.ajax({
        url: url,
        method: 'GET'
    });

    let directoryStructure = {};

    for (let item of response) {
        if (item.type === 'file') {
            directoryStructure[item.name] = 'file'; // Mark as file
        } else if (item.type === 'dir') {
            directoryStructure[item.name] = await fetchDirectoryContents(item.url);
        }
    }

    return directoryStructure;
}

function displayTree(structure, parentElement) {
    parentElement.empty(); // Clear previous content
    createTree(structure, parentElement);
}

function createTree(structure, parentElement) {
    const ul = $('<ul></ul>');
    $.each(structure, function (key, value) {
        const li = $('<li></li>').text(key);
        if ($.isPlainObject(value)) {
            // It's a folder
            var subUl = $('<ul></ul>').css('display', 'none');
            createTree(value, subUl);
            li.append(subUl);
            li.css('cursor', 'pointer');
            li.click(function (event) {
                event.stopPropagation();
                subUl.slideToggle();
            });
        } else {
            // It's a file
            li.click(function (event) {
                event.stopPropagation();
                console.log(`Clicked on file: ${key}`);
                $('.sidebar-widget, .tree li').removeClass('active');
                $(this).addClass('active');
            });
        }

        ul.append(li);
    });

    parentElement.append(ul);
}
