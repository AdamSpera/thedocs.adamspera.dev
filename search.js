let directoryStructure = {};

$(document).ready(function () {

  $("#search").click(async function (event) {
    event.preventDefault();
    directoryStructure = await fetchDirectoryContents(base_url);
    $("#searchModal").modal('show');
    // Clear the search input field and manually trigger the input event
    $("#searchInput").val('');
    $("#searchResults").empty();
  });

  $("#searchInput").on('input', async function () {

    var query = $(this).val();
    if (query === '') {
      $("#searchResults").empty();
      return;
    }
    $("#searchResults").empty();

    fileNameSearch(query);
    await fileKeySearch(query);
  });

});

function fileNameSearch(query) {

  // Search the directory structure for files that contain the query
  var searchResults = searchFiles(directoryStructure, query);

  // Display the search results
  for (let i = 0; i < searchResults.length; i++) {
    var filePath = searchResults[i].substring(1);

    // Split the file path into the directory and the file name
    var lastSlashIndex = filePath.lastIndexOf('/');
    var directory = filePath.substring(0, lastSlashIndex);
    var fileName = filePath.substring(lastSlashIndex + 1);

    // Add spaces around the slashes in the directory
    var formattedDirectory = directory.replace(/\//g, ' / ');

    // Make the query bold in the file name
    var boldedFileName = fileName.replace(new RegExp(query, 'gi'), '<strong>$&</strong>');

    // Combine the directory and the bolded file name
    var formattedFilePath = formattedDirectory + ' / ' + boldedFileName.replace('.md', '');

    let result = $('<p class="result-blob"> <img src="icons/file-solid.svg" alt="File" class="icon-result">' + formattedFilePath + '</p>');
    result.click(async function () {
      console.log(filePath);
      await fetchAndDisplayMarkdown(filePath);
      $('.sidebar-widget, .tree li').removeClass('active');
      $('#searchModal').modal('hide');
    });
    $("#searchResults").append(result);
  }

}

async function fileKeySearch(input) {
  let mdFiles = searchFiles(directoryStructure, '.md');
  let matchingFiles = new Map();

  for (let url of mdFiles) {
    url = url.replace('/', ''); // Remove the first '/'
    let data = await $.get(`content/${url}`);
    const converter = new showdown.Converter();
    const html = converter.makeHtml(data);

    $(html).find('img').each(function () {
      let src = $(this).attr('src');
      input = input.toLowerCase();
      if (src.includes("https://img.shields.io/badge/") && src.includes("-darkgreen")) {
        var badgeText = src.split("https://img.shields.io/badge/")[1].split("-darkgreen")[0];
        var lowerBadgeText = badgeText.toLowerCase();
        if (lowerBadgeText.includes(input)) {
          if (!matchingFiles.has(url)) {
            matchingFiles.set(url, []);
          }
          matchingFiles.get(url).push(badgeText);
        }
      }
    });
  }
  for (let [url, badges] of matchingFiles.entries()) {
    let formattedFilePath = url.replace(/_/g, ' ').replace('.md', '');
    formattedFilePath = formattedFilePath.replace(/\//g, ' / '); // Add spaces around '/'
    let result = $('<p class="result-blob" style="display: flex; flex-wrap: wrap;"></p>');
    let textElement = $('<span style="padding-right: 11px">' + formattedFilePath + '</span>');
    result.append(textElement);
    let badgesElement = $('<span></span>');
    for (let badgeText of badges) {
      badgesElement.append('<img src="https://img.shields.io/badge/' + badgeText + '-darkgreen" alt="Badge" class="icon-tag">');
    }
    result.append(badgesElement);
    result.click(async function () {
      await fetchAndDisplayMarkdown(url);
      $('.sidebar-widget, .tree li').removeClass('active');
      $('#searchModal').modal('hide');
    });
    $("#searchResults").append(result);
  }
}

function searchFiles(directory, query, path = '') {
  let results = [];
  for (let [name, type] of Object.entries(directory)) {
    let fullPath = path + '/' + name;
    if (type === 'file' && name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
      results.push(fullPath);
    } else if (type !== 'file') {
      results = results.concat(searchFiles(type, query, fullPath));
    }
  }
  return results;
}