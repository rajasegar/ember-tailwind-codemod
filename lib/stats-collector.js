class NoFilesError extends Error {}

function handleError(err, logger) {
  if (err.code === 'MODULE_NOT_FOUND') {
    logger.error('Transform plugin not found');
  } else if (err instanceof NoFilesError) {
    logger.error('No files matched');
  } else {
    logger.error(err);
    if (err.stack) {
      logger.error(err.stack);
    }
  }
}

class StatsCollector {
  constructor(logger) {
    this.logger = logger;
    this.changed = 0;
    this.unchanged = 0;
    this.skipped = 0;
    this.errors = [];
  }

  update(message) {
    switch (message.type) {
      case 'update':
        switch (message.status) {
          case 'ok':
            this.changed++;
            break;
          case 'skipped':
            this.skipped++;
            break;
          default:
            this.unchanged++;
            break;
        }
        break;

      case 'error':
        this.errors.push(message);
        break;
    }
  }

  print() {
    this.logger.info(`Ok:        ${this.changed}`);
    this.logger.info(`Unchanged: ${this.unchanged}`);

    if (this.skipped) {
      this.logger.info(`Skipped:   ${this.skipped}`);
    }

    if (this.errors.length) {
      this.logger.info(`Errored:   ${this.errors.length}`);

      this.errors.slice(0, 5).forEach(({ file, error }) => {
        this.logger.error(`${file}`);
        handleError(error, this.logger);
      });

      if (this.errors.length > 5) {
        const more = this.errors.length - 5;
        this.logger.error(`And ${more} more error${more !== 1 ? 's' : ''}`);
      }
    }
  }
}

module.exports = StatsCollector;
