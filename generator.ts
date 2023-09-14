import fs from 'fs/promises';

async function generateIndex() {
  try {
    // Check if index.md exists
    let existingContent = "";
    try {
      existingContent = await fs.readFile('./index.md', 'utf-8');
    } catch (err) {
      if ((err as ErrnoException).code === 'ENOENT') {
        // File doesn't exist, write a default home page content
        existingContent = `# Welcome to Brioche: A Bun-Based Blog Template\n\nThis is a template for creating your own blog using Bun.`;
        await fs.writeFile('./index.md', existingContent);
      } else {
        throw err;  // Re-throw other errors
      }
    }

    // Fetch a list of all Markdown files in the 'posts' folder
    const files = await fs.readdir('./posts');

    // Filter out non-Markdown files
    const mdFiles = files.filter(file => file.endsWith('.md'));

    // Generate Markdown links
    let indexContent = '\n\n## Blog Posts Index\n\n';
    for (const mdFile of mdFiles) {
      const postName = mdFile.replace('.md', '');
      indexContent += `- [${postName}](./${postName})\n`;
    }

    // Concatenate existing content and new index content
    const finalContent = existingContent + indexContent;

    // Write back to index.md
    await fs.writeFile('./posts/index.md', finalContent);
  } catch (err) {
    console.error(`Error generating index: ${err}`);
  }
}

// Run the function to generate the index
generateIndex();
