$('#explore').click(function () {
  $('#section-documentviewer').empty();
  $('#section-fileexplorer').show();
});

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
  $(li).addClass('file');

  li.click((event) => {
    event.stopPropagation();
    $('#section-fileexplorer').hide();
    fetchAndDisplayMarkdown(currentPath);
  });
}