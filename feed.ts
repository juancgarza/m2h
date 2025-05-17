import fs from 'fs/promises';

async function generateFeed() {
  const baseUrl = 'http://localhost:8000';
  const files = await fs.readdir('./posts');
  const mdFiles = files.filter(f => f.endsWith('.md'));
  const items = [] as {slug: string, title: string, date: Date, description: string}[];

  for (const file of mdFiles) {
    const slug = file.replace(/\.md$/, '');
    const fullPath = `./posts/${file}`;
    const content = await fs.readFile(fullPath, 'utf-8');
    const lines = content.split('\n');
    const titleLine = lines.find(l => l.startsWith('# '));
    const title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : slug;
    const descLine = lines.find(l => l && !l.startsWith('#')) || '';
    const description = descLine.trim();
    const stat = await fs.stat(fullPath);
    items.push({slug, title, date: stat.mtime, description});
  }

  const feedItems = items.map(it => `  <item>\n    <title>${escapeXml(it.title)}</title>\n    <link>${baseUrl}/${it.slug}</link>\n    <pubDate>${it.date.toUTCString()}</pubDate>\n    <description>${escapeXml(it.description)}</description>\n  </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>Bun Blog</title>\n  <link>${baseUrl}</link>\n  <description>A simple Bun powered blog</description>\n${feedItems}\n</channel>\n</rss>\n`;
  await fs.writeFile('./posts/feed.xml', xml);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

generateFeed().catch(err => {
  console.error('Failed to generate RSS feed:', err);
});
