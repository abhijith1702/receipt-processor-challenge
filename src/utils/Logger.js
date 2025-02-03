

class Logger {
    // Log levels
    static levels = {
      INFO: 'INFO',
      ERROR: 'ERROR',
      WARN: 'WARN',
      DEBUG: 'DEBUG',
    };
  
    // Get current timestamp
    static getTimestamp() {
      const date = new Date();
      return `${date.toISOString()}`;
    }
  
    // Format log messages
    static formatMessage(level, message) {
      return `[${this.getTimestamp()}] [${level}] ${message}`;
    }
  
    // Info level log
    static info(message) {
      console.log(this.formatMessage(this.levels.INFO, message));
    }
  
    // Error level log
    static error(message) {
      console.error(this.formatMessage(this.levels.ERROR, message));
    }
  
    // Warn level log
    static warn(message) {
      console.warn(this.formatMessage(this.levels.WARN, message));
    }
  
    // Debug level log
    static debug(message) {
      if (process.env.NODE_ENV === 'development') {
        console.log(this.formatMessage(this.levels.DEBUG, message));
      }
    }
  }
  
  export default Logger;
  