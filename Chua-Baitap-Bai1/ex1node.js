const fs = require("node:fs");

// const readAppend = fs.readFileSync("./txt/append.txt" , "utf-8")

// console.log("i'm read file append", readAppend);

// fs.writeFileSync("./txt/testwrite.txt", "i'm learn code but *****")

const readThis = fs.readFileSync("./txt/read-this.txt" , "utf-8")
const readInput = fs.readFileSync("./txt/input.txt" , "utf-8")
const readAppend = fs.readFileSync("./txt/append.txt" , "utf-8")
console.log({readThis});
console.log({readInput});
console.log({readAppend});

const finalData = readInput + readAppend;

fs.writeFileSync("./txt/final.txt", finalData , "utf-8")