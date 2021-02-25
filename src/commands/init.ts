import {Command, flags} from '@oclif/command'
import * as chalk from 'chalk'
import * as figlet from 'figlet'

export default class Init extends Command {
  async run() {
    const {args, flags} = this.parse(Init)

    console.log(
      chalk.yellow(
        figlet.textSync('Tallneck.js', {horizontalLayout: 'full'})
      ))

      console.log(chalk.red('Already a Git repository!'));

  }
}
