$(document).ready(function () {
  displayExplorePage().then(setupSearchTopicsEvent);
  setupSidebarExploreClickEvent();
});

function setupSidebarExploreClickEvent() {
  $('#explore').on('click', function () {
    $('.sidebar-widget, li').removeClass('active');
    $("img[src='icons/file-open.svg']").attr("src", "icons/file-solid.svg");
    $(this).addClass('active');
    displayExplorePage();
  });
}

async function displayExplorePage() {

  // Clear the content
  $('#content').empty();

  // Create a div with a class of explore-page
  const explorePage = $('<div></div>').addClass('explore-page');
  explorePage.append('<h1>Explore Topics</h1>');
  explorePage.append('<p>Click on a topic to search for associated content.</p>');
  explorePage.append('<hr>');
  explorePage.append('<input type="text" class="form-control form-control-lg" id="searchTopicsInput" placeholder="Search topics..."></input>');
  explorePage.append('<br>');
  var topicResults = $('<div id="topicResults"></div>');

  // Fetch the keywords from the markdown files
  directoryStructure = await fetchDirectoryContents(base_url);
  let mdFiles = searchFiles(directoryStructure, '.md');
  let keywords = new Set();

  for (let url of mdFiles) {
    url = url.replace('/', ''); // Remove the first '/'
    let data = await $.get(`content/${url}`);
    const converter = new showdown.Converter();
    const html = converter.makeHtml(data);

    $(html).find('img').each(function () {
      let src = $(this).attr('src');
      if (src.includes("https://img.shields.io/badge/") && src.includes("-darkgreen")) {
        var badgeText = src.split("https://img.shields.io/badge/")[1].split("-darkgreen")[0];
        keywords.add(badgeText);
      }
    });
  }

  // Display the keywords
  for (let keyword of keywords) {
    var keywordBlob = $('<img src="https://img.shields.io/badge/' + keyword + '-3aa0d5?style=for-the-badge" alt="Badge" class="icon-explore">');
    keywordBlob.on('click', function () {
      console.log(keyword);
      $('#searchModal').modal('show');
      $('#searchInput').val(keyword.replace(/%20/g, ' ')).trigger('input');;
    });
    topicResults.append(keywordBlob);
  }

  // Append the div to the #content element
  explorePage.append(topicResults);
  $('#content').append(explorePage);

}

function setupSearchTopicsEvent() {

  $("#searchTopicsInput").on('input', function () {
      let searchQuery = $(this).val().toLowerCase();
      searchQuery = searchQuery.replace(/ /g, '%20');
      console.log(searchQuery);

      // Loop through each keyword blob
      $('.icon-explore').each(function () {
        const src = $(this).attr('src');
        const keyword = src.split("https://img.shields.io/badge/")[1].split("-")[0];

        if (!keyword.toLowerCase().includes(searchQuery)) {
          console.log(keyword + " does not include " + searchQuery);
          // If the search query does not match the keyword, change the color to light grey and move it to the bottom
          $(this).attr('src', 'https://img.shields.io/badge/' + keyword + '-lightgrey?style=for-the-badge').appendTo(topicResults);
        } else {
          // If the search query matches the keyword, reset the color and move it to the top
          $(this).attr('src', 'https://img.shields.io/badge/' + keyword + '-3aa0d5?style=for-the-badge').prependTo(topicResults);
        }
      });
  });

}