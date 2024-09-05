const path = require("node:path");
const fsPromises = require("node:fs/promises");
const pathToFile = __dirname;

const main = async () => {

    await fsPromises.mkdir(path.join(pathToFile, 'baseFolder'), {recursive: true} )

    for (let i = 1; i <= 5; i++) {
        await fsPromises.mkdir(path.join(pathToFile, 'baseFolder', `${i}Folder`), {recursive: true});
        for (let j = 1; j <= 5; j++) {
        await fsPromises.writeFile(path.join(pathToFile, 'baseFolder', `${i}Folder`, `${j}File.txt`), 'some data here')
        }
    }

    for (let i = 1; i <= 5; i++) {
        const folderPath = path.join(pathToFile, 'baseFolder', `${i}Folder`)
        const folderStat = await fsPromises.stat(folderPath)
        console.log(folderPath + `    is folder?`);
        console.log(folderStat.isDirectory());
        console.log(folderPath + `   is file?`);
        console.log(folderStat.isFile());
        console.log(`-----`);

        for (let j = 1; j <= 5; j++) {
            const filePath = path.join(pathToFile, 'baseFolder', `${i}Folder`, `${j}File.txt`);
            const fileStat = await fsPromises.stat(filePath);
            console.log(filePath + `    is folder?`);
            console.log(fileStat.isDirectory());
            console.log(filePath + `   is file?`);
            console.log(fileStat.isFile());
            console.log(`-----`);

        }

    }



}

void main()