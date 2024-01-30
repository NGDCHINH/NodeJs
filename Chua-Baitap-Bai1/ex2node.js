const { log, error } = require("node:console");
const fs = require("node:fs");
fs.readFile("./txt/read-this.txt", "utf8" , (error , data)=>{
    if(error) {
        throw new Error(error)
    }
    console.log(data);
})
fs.readFile("./txt/append.txt", "utf8" , (errorAppend , dataAppend)=>{
    if(errorAppend) {
        throw new Error(errorAppend)
    }
    console.log(dataAppend)
    fs.readFile("./txt/input.txt", "utf8" , (errorInput, dataInput)=>{
        if(errorInput) {
            throw new Error(errorInput)
        }
        console.log(dataInput);
        const finalData = dataAppend + dataInput
        fs.writeFile("./txt/final.txt", finalData , "utf8" , ()=>{
            console.log("Tôi đã ghi file thành công");
        })
    })
})
