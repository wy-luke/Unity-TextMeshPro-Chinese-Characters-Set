const fs = require("fs");

function readFileContent(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function mergeCharacters() {
  const newChars = readFileContent("new.txt").trim().replace(/\r?\n/g, "");
  const allContent = readFileContent("source/all.txt");

  const lines = allContent.split(/\r?\n/);
  let firstLine = lines[0] || "";
  let secondLine = lines[1] || "";
  const allChars = firstLine + secondLine;

  let toAppend = "";
  for (const char of newChars) {
    if (char !== "\n" && !allChars.includes(char)) {
      toAppend += char;
    }
  }

  const result = firstLine + "\n" + secondLine + toAppend;
  fs.writeFileSync("source/all.txt", result, "utf8");

  console.log("Done!");
}

mergeCharacters();
