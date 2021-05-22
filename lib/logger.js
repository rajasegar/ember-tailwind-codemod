const chalk = require('chalk');
const ora = require('ora');

class Logger {
  constructor() {
    this.spinner = undefined;
    this.log = console.log;
  }

  info(message) {
    this.log(message);
  }

  warning(message) {
    this.log(chalk.bgYellow(' WARN '), message);
  }

  error(message) {
    this.log(chalk.bgRed(' ERR '), message);
  }

  spin(message) {
    this.spinner = ora(message).start();
  }

  updateSpinner(message) {
    if (this.spinner) {
      this.spinner.text = message;
    }
  }

  stopSpinner() {
    this.spinner && this.spinner.stop();
  }
}

module.exports = Logger;
