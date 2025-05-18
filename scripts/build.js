const fs = require("fs");
const path = require("path");

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r?\n/g, "");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function toFullWidth(str) {
  return str.replace(/[!-~]/g, function (char) {
    return String.fromCharCode(char.charCodeAt(0) + 0xfee0);
  });
}

function removeDuplicates(str) {
  return [...new Set(str)].join("");
}

function build() {
  const sourceDir = path.join(__dirname, "../source");
  const outputDir = path.join(__dirname, "../");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const chars3500 = readFile(path.join(sourceDir, "3500.txt"));
  const chars7000 = readFile(path.join(sourceDir, "7000.txt"));
  const allChars = readFile(path.join(sourceDir, "all.txt"));

  const symbols = readFile(path.join(sourceDir, "symbols.txt"));
  const symbolsFullWidth = toFullWidth(symbols);
  const allSymbols = removeDuplicates(symbols + symbolsFullWidth);

  // 1. symbols
  writeFile(path.join(outputDir, "symbols.txt"), symbols);

  // 2. symbols-fullwidth
  writeFile(path.join(outputDir, "symbols-fullwidth.txt"), symbolsFullWidth);

  // 3. 3500+symbols
  const output1 = removeDuplicates(chars3500 + allSymbols);
  writeFile(path.join(outputDir, "3500+symbols.txt"), output1);

  // 4. 7000+symbols
  const output2 = removeDuplicates(chars7000 + allSymbols);
  writeFile(path.join(outputDir, "7000+symbols.txt"), output2);

  // 5. all+symbols
  const output3 = removeDuplicates(allChars + allSymbols);
  writeFile(path.join(outputDir, "all+symbols.txt"), output3);

  console.log("Done!");
}

build();
