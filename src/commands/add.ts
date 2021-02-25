import {Command, flags} from '@oclif/command'
import {existsSync, readFileSync, writeFileSync} from 'fs'
import {service, controller, model, respository} from '../shared/generators'
import {snakeToKabab, formatClassName, snakeToCamel, matchLineNumber} from '../shared/helper'

export default class Add extends Command {
  static description = 'add new note'

  static flags = {
    help: flags.help({char: 'h'}),
    file: flags.string({char: 'f', description: 'file to generate'}),
  }

  static args = [{
    name: 'name',
    description: 'note name to add, .md can be omitted',
    required: true,
  }]

  async generateFile(name: string, type: string) {
    const fileExtension = '.ts'
    const fileName = `${snakeToKabab(name)}.${type}${fileExtension}`
    const noteName = fileName.slice(0, -3)
    if (existsSync(fileName)) {
      this.log(`Note "${noteName}" already exists, Please remove or use the existing ${type}`)
    }

    let readFile: any
    let contentAfterReplacement: any
    let matchedLineNumber: any

    switch (type) {
    case 'service':
      writeFileSync(`src/services/${fileName}`, service(name))
      readFile = readFileSync('src/services/index.ts', 'utf8')
      contentAfterReplacement = readFile
      .replace(' // # import_repository', `,\n\t${snakeToCamel(name, '')}Repository // # import_repository`)
      .replace(' // # import_service', `\nimport { ${formatClassName(snakeToCamel(name, ''))}Service } from './${snakeToKabab(name)}.service'; // # import_service`)
      .replace(' // # export_service', `\n\nexport const ${snakeToCamel(name, '')}Service: ${formatClassName(snakeToCamel(name, ''))}Service = new ${formatClassName(snakeToCamel(name, ''))}Service(${snakeToCamel(name, '')}Repository); // # export_service`)
      writeFileSync('src/services/index.ts', contentAfterReplacement, 'utf8')
      this.log(`Created "${noteName}" ${type}`)
      break
    case 'controller':
      writeFileSync(`src/controllers/${fileName}`, controller(name))
      readFile = readFileSync('src/controllers/index.ts', 'utf8')
      contentAfterReplacement = readFile
      .replace(' // # import_service', `,\n\t${snakeToCamel(name, '')}Service // # import_service`)
      .replace(' // # import_controller', `\nimport { ${formatClassName(snakeToCamel(name, ''))}Controller } from './${snakeToKabab(name)}.controller'; // # import_controller`)
      .replace(' // # export_controller', `\nexport const ${snakeToCamel(name, '')}Controller: ${formatClassName(snakeToCamel(name, ''))}Controller = new ${formatClassName(snakeToCamel(name, ''))}Controller(${snakeToCamel(name, '')}Service); // # export_controller`)
      writeFileSync('src/controllers/index.ts', contentAfterReplacement, 'utf8')
      this.log(`Created "${noteName}" ${type}`)
      break
    case 'model':
      writeFileSync(`src/models/${name}${fileExtension}`, model(name))
      readFile = readFileSync('src/models/index.ts', 'utf8')
      contentAfterReplacement = readFile
      .replace(' // # import_model', `,\n\t${name} // # import_model`)
      .replace(' // # export_all', `\nexport * from './${name}'; // # export_all`)
      .replace(' // # export_single', `,\n\t${name} // # export_single`)
      writeFileSync('src/models/index.ts', contentAfterReplacement, 'utf8')
      this.log(`Created "${noteName}" ${type}`)
      break
    case 'repository':
      writeFileSync(`src/repositories/${name}.repository${fileExtension}`, respository(name))
      readFile = readFileSync('src/repositories/index.ts', 'utf8')
      console.log(matchLineNumber(/models/.exec(readFile)))
      matchedLineNumber = matchLineNumber(/models/.exec(readFile))
      // console.log('readFile.toString()', readFile.toString())
      // readFile = readFile.toString().split().splice(matchedLineNumber, 0, `\n\t${name}`)
      // console.log('readFile', readFile)
      // contentAfterReplacement = readFile.join('\n')
      contentAfterReplacement = readFile
      .replace(/models/, `,\n\t${name} // # import_model \n `)
      // .replace(' // # import_repository', `\nimport { ${formatClassName(snakeToCamel(name, ''))}Repository } from './${name}.repository'; // # import_repository`)
      // .replace(' // # export_repository', `\nexport const ${snakeToCamel(name, '')}Repository: ${formatClassName(snakeToCamel(name, ''))}Repository = new ${formatClassName(snakeToCamel(name, ''))}Repository(${name}); // # export_single`)
      writeFileSync('src/repositories/index.ts', contentAfterReplacement, 'utf8')
      this.log(`Created "${noteName}" ${type}`)
      break
    default:
      this.log('Somthing went wrong!')
    }
  }

  async run() {
    const {args, flags} = this.parse(Add)

    if (!flags.file) {
      this.generateFile(args.name, 'model')
      this.generateFile(args.name, 'repository')
      this.generateFile(args.name, 'service')
      this.generateFile(args.name, 'controller')
      return
    }

    const fileExtension = '.js'
    const fileName = `${args.name}${args.name.slice(-3) === fileExtension ? '' : fileExtension}`
    const noteName = fileName.slice(0, -3)

    if (existsSync(fileName)) {
      this.log(`Note "${noteName}" already exists, use "edit" or "delete" instead`)
    } else {
      writeFileSync(fileName, service(args.name))
      this.log(`Created "${noteName}" note`)
    }
  }
}
