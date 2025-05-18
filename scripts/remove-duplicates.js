const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "../source");
const files = ["symbols.txt", "3500.txt", "7000.txt"];

files.forEach((fileName) => {
  const filePath = path.join(sourceDir, fileName);
  const content = fs.readFileSync(filePath, "utf8");

  const fileChars = new Set();
  const duplicates = new Map();

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (fileChars.has(char)) {
      if (!duplicates.has(char)) {
        duplicates.set(char, []);
      }
      duplicates.get(char).push(i);
    } else {
      fileChars.add(char);
    }
  }

  if (duplicates.size > 0) {
    console.log(`\n文件 ${fileName} 中发现重复字符：`);
    for (let [char, positions] of duplicates) {
      console.log(`字符 "${char}" 在位置 ${positions.join(", ")} 重复出现`);
    }
  } else {
    console.log(`\n文件 ${fileName} 中未发现重复字符`);
  }

  const uniqueChars = [...new Set(content)].join("");
  fs.writeFileSync(filePath, uniqueChars, "utf8");
  console.log(`已更新文件 ${fileName}，去重后的字符数：${uniqueChars.length}`);
});
