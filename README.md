# m2h

m2h is a Markdown to HTML converter built with Bun and Tailwind CSS. It's designed to generate a static blog from Markdown files.

## Installation
To install dependencies:

```bash
bun install
```

## Usage

To run the application, use:

```bash
bun run index.ts
```
This will start the server and serve your blog at `localhost:8000`.

### Index generator

To generate an index and append it to your index.md post, use:

```bash
bun run generator.ts
```

## Project Structure

- `index.ts`: The main entry point of the application. It sets up the server and handles requests.
- `router.ts`: Configures the file system router for serving Markdown files from the `posts` directory.
- `parser.ts`: Contains the logic for converting Markdown to HTML.
- `generator.ts`: Generates an index page for the blog by scanning the `posts` directory for Markdown files.
- `styles.css`: Contains the Tailwind CSS imports.
- `posts/`: This directory should contain your blog posts written in Markdown.

## Writing Posts

Write your blog posts in Markdown and save them in the `posts/` directory. The filename (without the `.md` extension) will be used as the URL path for the post.

For example, a file named `hello-world.md` will be accessible at `http://localhost:8000/hello-world`.

## Customization

You can customize the appearance of your blog by modifying the Tailwind CSS configuration in `tailwind.config.js` and the styles in `styles.css`.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request on GitHub.
