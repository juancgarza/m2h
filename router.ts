const router = new Bun.FileSystemRouter({
  dir: "./posts",
  style: "nextjs",
  fileExtensions: [".md"],
});

export default router;
