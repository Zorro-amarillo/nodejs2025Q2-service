import {
  Injectable,
  ConsoleLogger,
  LoggerService,
  type LogLevel,
} from '@nestjs/common';
import { dirname, join } from 'path';
import { mkdir, appendFile } from 'fs/promises';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logFile = join(__dirname, '../../../logs/all_logs.log');
  private readonly consoleLogger = new ConsoleLogger();

  private async saveToFile(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const logTime = new Date().toISOString();
    const logContext = context ?? '';
    const logTrace = trace ? `\nTRACE: ${trace}` : '';
    const log = `${logTime} - ${level} [${logContext}] ${message} ${logTrace}\n`;

    const logFolder = dirname(this.logFile);

    await mkdir(logFolder, { recursive: true });
    await appendFile(this.logFile, log);
  }

  log(message: any, context: string) {
    this.saveToFile('log', message, context);
    this.consoleLogger.log(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.saveToFile('error', message, context, trace);
    this.consoleLogger.error(message, trace, context);
  }

  warn(message: any, context: string) {
    this.saveToFile('warn', message, context);
    this.consoleLogger.warn(message, context);
  }

  debug(message: any, context: string) {
    this.saveToFile('debug', message, context);
    this.consoleLogger.debug(message, context);
  }

  verbose(message: any, context: string) {
    this.saveToFile('verbose', message, context);
    this.consoleLogger.verbose(message, context);
  }
}
