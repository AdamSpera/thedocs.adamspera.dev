// Script.js

// Data to populate on page
import { sidebar_data, content_data } from './datastore.js';

// Populate the sidebar
function populateSidebar(data) {

  let sidebar = document.getElementById('sidebar_populate');

  // For each entry in data (CCNA, ENCOR, etc.)
  for (let i = 0; i < data.length; i++) {

    // Create sidebar item
    var sidebarItemDiv = document.createElement("div");
    sidebarItemDiv.classList.add("sidebar-item");

    // Create the header for the sidebar item
    var headerDiv = document.createElement("div");
    headerDiv.id = "header_" + data[i].title.toLowerCase().replace(/\s/g, '');
    headerDiv.classList.add("flex-container", "header", "sidebar-widget");
    headerDiv.innerHTML = `
    <div class="flex-item item-1 sidebar-widget-text">${data[i].title.toUpperCase()}</div>
    <div class="flex-item item-2"><span class="arrow"></span></div>`;
    sidebarItemDiv.appendChild(headerDiv);

    // Create the sections for the sidebar item
    for (let j = 0; j < data[i].sections.length; j++) {
      var sectionDiv = document.createElement("div");
      sectionDiv.id = "header_" + data[i].title.toLowerCase().replace(/\s/g, '') + "_section_" + data[i].sections[j].title.toLowerCase().replace(/\s/g, '');
      sectionDiv.classList.add("flex-container", "section", "sidebar-widget");
      sectionDiv.innerHTML = `
      <div class="flex-item item-1 sidebar-widget-text">${data[i].sections[j].title}</div>
      <div class="flex-item item-2"><span class="arrow"></span></div>`;
      sidebarItemDiv.appendChild(sectionDiv);

      // Create the content for the sidebar item
      for (let k = 0; k < data[i].sections[j].contents.length; k++) {
        var contentDiv = document.createElement("div");
        contentDiv.id = "header_" + data[i].title.toLowerCase().replace(/\s/g, '') + "_section_" + data[i].sections[j].title.toLowerCase().replace(/\s/g, '') + "_content_" + data[i].sections[j].contents[k].toLowerCase().replace(/\s/g, '');
        contentDiv.classList.add("flex-container", "content", "sidebar-widget");
        contentDiv.innerHTML = `<div class="flex-item item-1 sidebar-widget-text">${data[i].sections[j].contents[k]}</div>`;
        sidebarItemDiv.appendChild(contentDiv);
      }
    }

    // Add the sidebar item to the sidebar
    sidebar.appendChild(sidebarItemDiv);
  }

}; populateSidebar(sidebar_data);


function deselectAllWidgets() {
  var widgets = document.querySelectorAll('.sidebar-widget');
  widgets.forEach(function (widget) {
    widget.classList.remove('active');
  });
}

function showItemSections(item) {
  var sections = item.querySelectorAll('.section');
  sections.forEach(function (section) {
    section.style.display = 'flex';
  });
}
function hideItemSections(item) {
  var sections = item.querySelectorAll('.section');
  sections.forEach(function (section) {
    section.style.display = 'none';
    var arrow = section.querySelector('.arrow');
    arrow.classList.remove('active');
  });
}
function hideItemContent(item, id) {
  var content = item.querySelectorAll('.content');
  content.forEach(function (content) {
    if (content.id.includes(`${id}`) && content.id.includes('content_')) {
      content.style.display = 'none';
    }
  });
}

function getSectionContent(header, section) {
  var widgets = document.querySelectorAll('.sidebar-widget');
  var sectionContent = [];
  widgets.forEach(function (widget) {
    var widgetIdSplit = widget.id.split('_');
    if (widgetIdSplit.length > 4 && widgetIdSplit[1] == header && widgetIdSplit[3] == section) {
      sectionContent.push(widget);
    }
  });
  return sectionContent;
}


// For every widget
var widgets = document.querySelectorAll('.sidebar-widget');
widgets.forEach(function (widget) {

  // When widget is clicked, deselect all widgets, then select the clicked widget
  widget.addEventListener('click', function (event) {

    // Deselect all widgets
    deselectAllWidgets();
    // Select the clicked widget
    widget.classList.add('active');

    // If content is clicked, display content
    if (widget.classList.contains('content')) {
      console.log('Click detected on CONTENT widget');
      var widgetId = widget.id;
      var contentTab = document.getElementById('content');
      contentTab.innerHTML = content_data[widgetId] ? content_data[widgetId] : widgetId;
      return;
    }

    if (widget.classList.contains('default')) {
      console.log('Click detected on DEFAULT widget');
      return;
    };

    // Get the arrow in the widget and toggle to activate or deactivate
    var arrow = widget.querySelectorAll('.arrow')[0];
    arrow.classList.toggle('active');

    // If header is clicked, hide all sections and contents
    if (widget.classList.contains('header')) {
      console.log('Click detected on HEADER widget');
      if (widget.querySelectorAll('.arrow')[0].classList.contains('active')) {
        showItemSections(widget.parentElement);
      } else {
        hideItemSections(widget.parentElement);
        hideItemContent(widget.parentElement, widget.id);
      }
    }

    // If section is clicked, hide all contents
    if (widget.classList.contains('section')) {
      console.log('Click detected on SECTION widget');

      // Get the header and section of the clicked section
      var header = widget.id.split('_')[1];
      var section = widget.id.split('_')[3];
      // Get the contents of the clicked section
      var sectionContent = getSectionContent(header, section);

      // If arrow is active, display sections
      if (widget.querySelectorAll('.arrow')[0].classList.contains('active')) {
        sectionContent.forEach(function (content) {
          content.style.display = 'flex';
        });
      }

      // If arrow is not active, hide sections
      if (!widget.querySelectorAll('.arrow')[0].classList.contains('active')) {
        sectionContent.forEach(function (content) {
          content.style.display = 'none';
        });
      }
    }

  });

});
