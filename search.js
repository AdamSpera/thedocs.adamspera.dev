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

  $("#searchInput").on('input', function () {

    var query = $(this).val();
    if (query === '') {
      $("#searchResults").empty();
      return;
    }
    // Clear the previous search results
    $("#searchResults").empty();

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

      let result = $('<p class="result-blob"> <img src="icons/file-open.svg" alt="File" class="icon-result">' + formattedFilePath + '</p>');
      result.click(async function () {
        console.log(filePath);
        await fetchAndDisplayMarkdown(filePath);
        $('#searchModal').modal('hide');
      });
      $("#searchResults").append(result);
    }

  });

});

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