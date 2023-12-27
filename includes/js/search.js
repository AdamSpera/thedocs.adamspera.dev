let directoryStructure = {};

$(document).ready(function () {

  // When the search button is clicked...
  $("#search").click(async function (event) {
    event.preventDefault();

    // Fetch the directory structure from cache and so on
    directoryStructure = await fetchDirectoryContents(base_url);

    // Show the search modal
    $("#searchModal").modal('show');

    // Clear the search input field and manually trigger the input event
    $("#searchInput").val('');

    // Clear the search results of any extra results
    $("#searchResults").empty();
  });

  // When search query changes...
  $("#searchInput").on('input', async function () {
    var query = $(this).val();

    // Clear the search results
    $("#searchResults").empty();

    // If the query is not empty, search for the query
    if (query !== '') {
      fileNameSearch(query);
      await fileKeySearch(query);
    }
  });

});

function handleResultClick(filePath) {
  // Parameter file path below:
  // DCCOR/Network/Switching Protocols/Some File Name.md

  return async function () {
    // Hide the file explorer section
    $('#section-fileexplorer').hide();
    // Get and display the markdown file
    await fetchAndDisplayMarkdown(filePath);
    // Hide the search modal
    $('#searchModal').modal('hide');
  }
}

function returnResultBlob(filePath, type='file') {
  // Parameter file path below:
  // /DCCOR/Network/Switching Protocols/Rapid Per Vlan Spanning Tree Plus (Rapid PVST+).md

  // Remove the first splash from the file path
  var filePath = filePath.substring(1);

  // Split the file path into the directory and the file name
  var lastSlashIndex = filePath.lastIndexOf('/');
  var directory = filePath.substring(0, lastSlashIndex);
  var fileName = filePath.substring(lastSlashIndex + 1).replace('.md', '');

  // Add spaces around the slashes in the directory
  var formattedDirectory = directory.replace(/\//g, ' / ');

  // Create a new paragraph element with the class 'result-blob'
  let resultElement = $(`
    <p class="result-blob">
      <span style="font-size: 13px">${formattedDirectory}</span><br>
      <img src="icons/${type === 'topic' ? 'lightbulb-solid' : 'file-solid'}.svg" alt="File" class="icon-result">${fileName}
    </p>
  `);

  // Add a click event listener to the result element
  resultElement.click(handleResultClick(filePath));

  // Return the result element
  return resultElement;
};

function fileNameSearch(query) {
  // Search the directory structure for files that contain the query
  var matchingFiles = searchFiles(directoryStructure, query);

  // For each matching file name...
  matchingFiles.forEach((filePath) => {

    // Create a new result element
    const resultElement = returnResultBlob(filePath);

    // Append the result element to the search results
    $("#searchResults").append(resultElement);

  });

};

async function fileKeySearch(query) {

  // Search the directory structure for all files
  let mdFiles = searchFiles(directoryStructure, '.md');

  // For every md file, check for matching topics...
  let matchingFiles = new Map();
  for (let filePath of mdFiles) {

    // Get the markdown data from the file
    let markdownData = await $.get(`content${filePath}`);

    // Convert the markdown data to HTML
    const converter = new showdown.Converter();
    const html = converter.makeHtml(markdownData);

    // For every image in the HTML...
    $(html).find('img').each(function () {

      // Get the image source
      let src = $(this).attr('src');

      // Replace spaces with '%20' and make the query lowercase
      query = query.replace(/ /g, '%20');
      query = query.toLowerCase();

      // If the image is a topic badge...
      if (src.includes("https://img.shields.io/badge/") && src.includes("-darkgreen")) {

        // Get the badge text and make it lowercase
        var badgeText = src.split("https://img.shields.io/badge/")[1].split("-darkgreen")[0];
        var lowerBadgeText = badgeText.toLowerCase();

        // If the badge text contains the query...
        if (lowerBadgeText.includes(query)) {
          if (!matchingFiles.has(filePath)) {
            matchingFiles.set(filePath, []);
          }
          matchingFiles.get(filePath).push(badgeText);
        }
      }

    });

  }; // End of looking for markdown files that have matching topics.

  // For every matching file...
  for (let [filePath, badges] of matchingFiles.entries()) {

    // Create a new result element
    var resultElement = returnResultBlob(filePath, 'topic');

    // Create a new span element for the badges
    let badgesElement = $('<span><br></span>');
    // Append every badge img to the badge span
    for (let badgeText of badges) {
      badgesElement.append('<img src="https://img.shields.io/badge/' + badgeText + '-darkgreen" alt="Badge" class="icon-tag">');
    }

    // Append the badges element to the result element
    resultElement.append(badgesElement);

    // Append the result element to the search results
    $("#searchResults").append(resultElement);
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