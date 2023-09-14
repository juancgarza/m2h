const parser = (markdown: string): string => {
  let html = "<!DOCTYPE html><html><head><meta charset='UTF-8'><link rel='stylesheet' href='/dist/output.css'></head><body class='prose'>";
  const lines = markdown.split("\n");
  let inOrderedList = false;
  let inUnorderedList = false;

  const parseInlineElements = (text: string): string => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Italics
    text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // Inline code
    text = text.replace(/`(.+?)`/g, "<code>$1</code>");
    // Inline links
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, "<a href='$2'>$1</a>");

    return text;
  };

  lines.forEach((line) => {
    line = parseInlineElements(line.trim());

    if (line.startsWith("# ")) {
      html += `<h1 class='text-3xl font-bold underline'>${line.substring(2)}</h1>`;
    } else if (line.startsWith("## ")) {
      html += `<h2 class='text-2xl font-bold'>${line.substring(3)}</h2>`;
    } else if (line.startsWith("### ")) {
      html += `<h3 class='text-xl font-bold'>${line.substring(4)}</h3>`;
    } else if (line.match(/^\d+\./)) {
      if (!inOrderedList) {
        html += "<ol class='list-decimal list-inside'>";
        inOrderedList = true;
      }
      html += `<li>${line.substring(line.indexOf(".") + 1).trim()}</li>`;
    } else if (line.startsWith("-")) {
      if (!inUnorderedList) {
        html += "<ul class='list-disc list-inside'>";
        inUnorderedList = true;
      }
      html += `<li>${line.substring(1).trim()}</li>`;
    } else if (line.trim() !== "") {
      if (inOrderedList) {
        html += `</ol>`;
        inOrderedList = false;
      }
      if (inUnorderedList) {
        html += `</ul>`;
        inUnorderedList = false;
      }
      html += `<p>${line}</p>`;
    }
  });

  if (inOrderedList) {
    html += `</ol>`;
  }
  if (inUnorderedList) {
    html += `</ul>`;
  }

  html += "</body></html>";
  return html;
};

export default parser;
