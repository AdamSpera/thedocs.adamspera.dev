# thedocs.adamspera.dev

## About

Turn your Markdown files into a hosted knowledge base with a user-friendly web interface. Deploy, share, and customize your content with an intuitive development experience.

## Creating a File Structure

Enter the 'content' directory and start creating folders and files.

**All folders and files inside the root contents folder will be added to the front end as the directory view.**

## Creating Content

Note: You can use Markdown syntax or HTML in the .md file; both will be displayed on the front end!

1. Open your code editor, Visual Studio Code.
2. Ensure you have the 'Live Preview' extension by Microsoft installed.
3. Right-click on the 'write.html' file and select 'Show Preview' from the menu.
4. Snap the preview window to the right side of your editor window.
5. Snap the markdown file to the left side of your editor window.
6. Change the 'url' variable in the inline script in the 'write.html' file to your markdown file.

Done and dusted, you're ready to start writing your markdown!

Make sure to push to git to update the front end!

## Deployment to Cloudflare Pages

Complete the following steps to deploy this project to Cloudflare Pages:

1. Fork the repository and clone it to your local machine.
2. Navigate to the Cloudflare dashboard and click the "Pages" tab.
3. Click on the "Create a project" button.
4. Select the repository you want to deploy.
5. No extra build settings are needed! Continue to the next page.
6. Click on the "Save and Deploy" button.

Cloudflare Pages will now build and deploy your site. You can view the status of your deployments on the Cloudflare dashboard.

You can add a custom domain on the Cloudflare Pages project page.

## Limitations

To get the file structure, the GitHub public API is called.

The limit for the API is 60 calls from an IP per hour.

To prevent this, caching on the request is enabled at the browser level.

The timeout for the cache can be changed in script.js in the getCachedResponse function.

The default timeout is a day in minutes.
