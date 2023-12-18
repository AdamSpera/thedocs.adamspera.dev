// Data to populate on page
import { sidebar_data } from '/data/datastore.js';

// Execute when the document is ready
$(document).ready(function () {

  /**
   * Populates the sidebar with data.
   * @param {Array} data - Data to be used for populating the sidebar.
   */
  function populateSidebar(data) {
    let $sidebar = $('#sidebar_populate');

    // Iterate over each item in the provided data
    $.each(data, function (i, item) {
      var $sidebarItemDiv = $("<div>").addClass("sidebar-item");
      var headerID = "header_" + item.title.toLowerCase().replace(/\s/g, '');

      // Creating header for each sidebar item
      var $headerDiv = $("<div>").attr("id", headerID)
        .addClass("flex-container header sidebar-widget")
        .html(`<div class="flex-item item-1 sidebar-widget-text">${item.title.toUpperCase()}</div>
                  <div class="flex-item item-2"><span class="arrow"></span></div>`);
      $sidebarItemDiv.append($headerDiv);

      // Creating sections under each header
      $.each(item.sections, function (j, section) {
        var sectionID = headerID + "_section_" + section.title.toLowerCase().replace(/\s/g, '');
        var $sectionDiv = $("<div>").attr("id", sectionID)
          .addClass("flex-container section sidebar-widget")
          .html(`<div class="flex-item item-1 sidebar-widget-text">${section.title}</div>
                      <div class="flex-item item-2"><span class="arrow"></span></div>`);
        $sidebarItemDiv.append($sectionDiv);

        // Creating content under each section
        $.each(section.contents, function (k, content) {
          var contentID = sectionID + "_content_" + content.toLowerCase().replace(/\s/g, '');
          var $contentDiv = $("<div>").attr("id", contentID)
            .addClass("flex-container content sidebar-widget")
            .html(`<div class="flex-item item-1 sidebar-widget-text">${content}</div>`);
          $sidebarItemDiv.append($contentDiv);
        });
      });

      // Append the constructed sidebar item to the sidebar
      $sidebar.append($sidebarItemDiv);
    });
  };

  // Call function to populate sidebar with data
  populateSidebar(sidebar_data);

  // Deselects all widgets by removing 'active' class
  function deselectAllWidgets() {
    $('.sidebar-widget').removeClass('active');
  }

  // Shows all section elements under a specific item
  function showItemSections($item) {
    $item.find('.section').css('display', 'flex');
  }

  // Hides all section elements under a specific item
  function hideItemSections($item) {
    $item.find('.section').css('display', 'none').find('.arrow').removeClass('active');
  }

  // Hides content elements under a specific item and section
  function hideItemContent($item, id) {
    $item.find('.content').filter(function () {
      return this.id.includes(id) && this.id.includes('content_');
    }).css('display', 'none');
  }

  // Retrieves content sections based on header and section parameters
  function getSectionContent(header, section) {
    var sectionContent = [];
    $('.sidebar-widget').each(function () {
      var widgetIdSplit = this.id.split('_');
      if (widgetIdSplit.length > 4 && widgetIdSplit[1] == header && widgetIdSplit[3] == section) {
        sectionContent.push($(this));
      }
    });
    return sectionContent;
  }

  // Event listener for click events on sidebar widgets
  $('.sidebar-widget').on('click', function () {
    deselectAllWidgets();
    $(this).addClass('active');

    // Handles click events on content items
    if ($(this).hasClass('content')) {
      // Creating a formatted string for content identification
      var widgetIdParts = this.id.split('_');
      var formattedName = 'content/' + widgetIdParts[1] + '/' + widgetIdParts[3] + '/' + widgetIdParts[5] + '.md';

      // Special cases handling
      if (formattedName == 'content/about/undefined/undefined.md') {
        formattedName = 'content/about.md';
      } else if (formattedName == 'content/resources/undefined/undefined.md') {
        formattedName = 'content/resources.md';
      }

      // Updating the content tab with the selected content
      var $contentTab = $('#content');

      // Fetch the markdown file
      $.get(formattedName, function (data) {
        // Convert the markdown to HTML using a markdown parser
        // Here, we're using the showdown library as an example
        var converter = new showdown.Converter();
        var html = converter.makeHtml(data);

        // Display the HTML in the content tab
        $contentTab.html(html);
      });

      // Updating the content tab with the selected content
      var $contentTab = $('#content');
      $contentTab.html(formattedName);
      return;
    }

    // Handles click events on default items
    if ($(this).hasClass('default')) {
      return;
    }

    // Toggle arrow activation on click
    var $arrow = $(this).find('.arrow');
    $arrow.toggleClass('active');

    // Handling click events on header items
    if ($(this).hasClass('header')) {
      if ($arrow.hasClass('active')) {
        showItemSections($(this).parent());
      } else {
        hideItemSections($(this).parent());
        hideItemContent($(this).parent(), this.id);
      }
    }

    // Handling click events on section items
    if ($(this).hasClass('section')) {
      var header = this.id.split('_')[1];
      var section = this.id.split('_')[3];
      var sectionContent = getSectionContent(header, section);

      // Showing or hiding content based on arrow state
      if ($arrow.hasClass('active')) {
        $.each(sectionContent, function () {
          $(this).css('display', 'flex');
        });
      } else {
        $.each(sectionContent, function () {
          $(this).css('display', 'none');
        });
      }
    }
  });

});
