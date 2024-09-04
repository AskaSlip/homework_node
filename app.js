const path = require('node:path');
const fs = require('node:fs');
const fsPromises = require('node:fs/promises');

const main = async () => {

    const pathToFile = __dirname;

    await fsPromises.mkdir(path.join(pathToFile, 'baseFolder'), {recursive: true});
    // await fsPromises.rmdir(path.join(pathToFile, 'baseFolder'), {recursive: true}); - delete folder


    const firstFolderPath = path.join(pathToFile, 'baseFolder', 'firstFolder');
    const firstFilePath = path.join(pathToFile, 'baseFolder', 'firstFolder', 'firstFile.txt');
    await fsPromises.mkdir(path.join(firstFolderPath), {recursive: true});
    await fsPromises.writeFile(path.join(firstFilePath), 'first text' )
    const firstFolderStat = await fsPromises.stat(firstFolderPath);
    const firstFileStat = await fsPromises.stat(firstFilePath);
    console.log(firstFolderPath + `   is folder?`);
    console.log(firstFolderStat.isDirectory());
    console.log(firstFilePath + `   is file?`);
    console.log(firstFileStat.isFile());
    console.log('-------');

    const secondFolderPath = path.join(pathToFile, 'baseFolder', 'secondFolder');
    const secondFilePath = path.join(pathToFile, 'baseFolder', 'secondFolder', 'secondFile.txt');
    await fsPromises.mkdir(path.join(secondFolderPath), {recursive: true});
    await fsPromises.writeFile(path.join(secondFilePath), 'second text' )
    const secondFolderStat = await fsPromises.stat(secondFolderPath);
    const secondFileStat = await fsPromises.stat(secondFilePath);
    console.log(secondFolderPath + `    is file?`);
    console.log(secondFolderStat.isFile());
    console.log(secondFilePath + `   is file?`);
    console.log(secondFileStat.isFile());
    console.log(`--------`);


    const thirdFolderPath = path.join(pathToFile, 'baseFolder', 'thirdFolder');
    const thirdFilePath = path.join(pathToFile, 'baseFolder', 'thirdFolder', 'thirdFile.txt');
    await fsPromises.mkdir(path.join(thirdFolderPath), {recursive: true});
    await fsPromises.writeFile(path.join(thirdFilePath), 'third text' )
    const thirdFolderStat = await fsPromises.stat(thirdFolderPath);
    const thirdFileStat = await fsPromises.stat(thirdFilePath);
    console.log(thirdFolderPath + `    is folder?`);
    console.log(thirdFolderStat.isDirectory());
    console.log(thirdFilePath + `   is folder?`);
    console.log(thirdFileStat.isDirectory());
    console.log(`--------`);


    const forthFolderPath = path.join(pathToFile, 'baseFolder', 'forthFolder');
    const forthFilePath = path.join(pathToFile, 'baseFolder', 'forthFolder', 'forthFile.txt');
    await fsPromises.mkdir(path.join(forthFolderPath), {recursive: true});
    await fsPromises.writeFile(path.join(forthFilePath), 'forth text' )
    const forthFolderStat = await fsPromises.stat(forthFolderPath);
    const forthFileStat = await fsPromises.stat(forthFilePath);
    console.log(forthFolderPath + `    is folder?`);
    console.log(forthFolderStat.isDirectory());
    console.log(forthFilePath + `   is file?`);
    console.log(forthFileStat.isFile());
    console.log(`--------`);

    const fifthFolderPath = path.join(pathToFile, 'baseFolder', 'fifthFolder');
    const fifthFilePath = path.join(pathToFile, 'baseFolder', 'fifthFolder', 'fifthFile.txt');
    await fsPromises.mkdir(path.join(fifthFolderPath), {recursive: true});
    await fsPromises.writeFile(path.join(fifthFilePath), 'fifth text' )
    const fifthFolderStat = await fsPromises.stat(fifthFolderPath);
    const fifthFileStat = await fsPromises.stat(fifthFilePath);
    console.log(fifthFolderPath + `    is folder?`);
    console.log(fifthFolderStat.isDirectory());
    console.log(fifthFilePath + `   is file?`);
    console.log(fifthFileStat.isFile());




}

void main()