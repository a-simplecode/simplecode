import fs from "fs";
import path from "path";
import matter from "gray-matter";

const node_modules = path.join(process.cwd(), "node_modules");
const markdownDir = path.join(process.cwd(), "markdown");


export function getPackageREADME(packageName) {
  // const packageDir = path.join(node_modules, packageName);
  const READMEPath = path.join(markdownDir, "README.md");//packageDir
  const fileContent = fs.readFileSync(READMEPath, "utf-8");
  const { data, content } = matter(fileContent);

  const tableSlug = packageName.replace(/\.md$/, ""); //removes the file extension

  const postData = {
    slug: tableSlug,
    ...data,
    content,
  };

  return postData;
}
