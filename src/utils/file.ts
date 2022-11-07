import * as fs from 'fs'
import * as os from "os"
import * as path from 'path'
import * as type from '@avro/types'
import avro from 'avro-js'

export default class FileService {
    homedir: string
    
    constructor(){
        this.homedir = os.homedir() + '\\flowKafkaTester'
        this.createFolder(this.homedir)
    }

    saveFile(folder:string, fileName:string, params:any) {
        this.createFolder(path.join(this.homedir, folder))
        const filePath = path.join(this.homedir, `\\${folder}`, `\\${fileName}.json`)
        console.log("gravando os dados: ", JSON.stringify(params))

        fs.writeFile(filePath, JSON.stringify(params), (error) => {
            if(error){
                console.log("Error while saving file", error)
                return
            }
           console.log('file created successfully ', filePath)
        })    
    }

    readFile(folder:string, fileName:string): any{
        const filePath = `${this.homedir}\\${folder}\\${fileName}.json`
        const dataFile = fs.readFileSync(filePath, {encoding:'utf-8',  flag:'r'})
        return dataFile
    }
    
    readAvro(folder:string, fileName:string): any{
        console.log('buscando avro')
        const filePath = `${this.homedir}\\${folder}\\${fileName}.avsc`
        const dataFile: string = fs.readFileSync(filePath, {encoding:'utf-8',  flag:'r'})
       
        return dataFile
    }

    createFolder(folderName:string){
        const pathFolder = path.join(folderName)
        
        if(!fs.existsSync(pathFolder)){
            fs.mkdir(pathFolder, (error => {
                if(error){
                    console.log("Error while create folder", error)
                    return
                }else {
                    console.log("folder created successfully")
                    return
                }
            }))
        }
        
    }

}