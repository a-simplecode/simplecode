import fs from "fs";
import path from "path";
import matter from "gray-matter";

const markdownDir = path.join(process.cwd(), "markdown");
const components = path.join(process.cwd(), "components");

export function component(fileName){

  const filePath = path.join(components, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return fileContent
}

export function getSpecificMarkdown(fileName) {
  const filePath = path.join(markdownDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const tableSlug = fileName.replace(/\.md$/, ""); //removes the file extension

  const postData = {
    slug: tableSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllMarkdown() {
  const markdownFiles = fs.readdirSync(markdownDir);

  const allMarkdowns = markdownFiles.map((markdownFile) => {
    return getSpecificMarkdown(markdownFile);
  });

  const sortedMarkdowns = allMarkdowns.sort((markdownA, markdownB) =>
    markdownA.date > markdownB.date ? -1 : 1
  );

  return sortedMarkdowns;
}

export function getSelectedMarkdowns() {
  const allMarkdowns = getAllMarkdown();

  const selectedMarkdowns = allMarkdowns.filter(
    (markdown) => markdown.selected
  );

  return selectedMarkdowns;
}
