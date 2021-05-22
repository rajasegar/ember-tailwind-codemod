'use strict';

const globby = require('globby');
const workerpool = require('workerpool');
const os = require('os');
const chalk = require('chalk');

const Logger = require('./logger');
const StatsCollector = require('./stats-collector');

module.exports = function (argv) {
  const logger = new Logger();
  const stats = new StatsCollector(logger);

  const files = globby.sync(`${argv._}/**/*.hbs`, {
    cwd: process.cwd(),
    absolute: true,
  });

  const cpus = os.cpus().length;
  const processCount = Math.min(files.length, cpus);

  console.info(`Processing ${files.length} file${files.length !== 1 ? 's' : ''}…`);
  console.info(`Spawning ${processCount} worker${processCount !== 1 ? 's' : ''}…`);

  logger.spin('Processed 0 files');

  const pool = workerpool.pool(__dirname + '/worker.js');

  const output = files.map((filename, index) => {
    return pool
      .exec('transformFile', [filename, { css: argv.css }])
      .then((result) => {
        //console.log(result);
        stats.update(result);
        logger.updateSpinner(`Processed ${index + 1} files`);
        return result;
      })
      .catch((err) => console.error(err));
  });

  Promise.all(output).then(() => {
    pool.terminate();
    logger.stopSpinner();
    stats.print();
    console.log('🎉', chalk.green('Migration completed'));
  });
};
