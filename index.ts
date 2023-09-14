// Path: index.ts
import router from "./router.ts";
import parse from "./parser.ts";

Bun.serve({
  async fetch(req: Request) {
    if (req.url.endsWith('.css')) {
      const css = await Bun.file('./dist/output.css').text();
      return new Response(css, { headers: { 'Content-Type': 'text/css' } });
    }

    let match = router.match(req.url === "/" ? "index.md" : req);
    
    if (match && match.filePath.endsWith('.md')) {
      const markdown = await Bun.file(match.filePath).text();
      const html = parse(markdown)
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }
    return new Response("Not found", { status: 404 });
  }
});