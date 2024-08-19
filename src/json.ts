import fs, { read } from "fs"
import { Task } from "./Task";


function saveFile(data: Array<Task>) {
  try {
    fs.writeFileSync('data/data.json', JSON.stringify(data))
  } catch( err ) {
    console.log("Nada en la data")
  }
}

function readFile(){
  try {
    let data = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));
    return data
  } catch (error) {
    console.log(error)
    return [];
  }
}

export default {
  saveFile,
  readFile
}
