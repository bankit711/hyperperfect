interface LoggingConfig {
  enabled: boolean;
  verbose: boolean;
}

interface LogContext {
  operation: string;
  details: Record<string, any>;
}

class ErrorServiceClass {
  private componentConfigs: Map<string, LoggingConfig> = new Map();

  registerLogging(componentId: string, config: LoggingConfig): void {
    this.componentConfigs.set(componentId, config);
  }

  private isLoggingEnabled(componentId: string): boolean {
    return this.componentConfigs.get(componentId)?.enabled || false;
  }

  private isVerboseEnabled(componentId: string): boolean {
    return this.componentConfigs.get(componentId)?.verbose || false;
  }

  logInfo(message: string, context: LogContext, componentId: string, isVerbose = false): void {
    if (!this.isLoggingEnabled(componentId)) return;
    if (isVerbose && !this.isVerboseEnabled(componentId)) return;

    const logData = {
      level: "INFO",
      component: componentId,
      message,
      ...context,
      timestamp: new Date().toISOString()
    };

    // In production, this would send to a logging service
    console.log(`[INFO][${componentId}] ${message}`, logData);
  }

  logWarning(message: string, context: LogContext, componentId: string): void {
    if (!this.isLoggingEnabled(componentId)) return;

    const logData = {
      level: "WARNING",
      component: componentId,
      message,
      ...context,
      timestamp: new Date().toISOString()
    };

    console.warn(`[WARNING][${componentId}] ${message}`, logData);
  }

  logError(message: string, context: LogContext, componentId: string): void {
    if (!this.isLoggingEnabled(componentId)) return;

    const logData = {
      level: "ERROR",
      component: componentId,
      message,
      ...context,
      timestamp: new Date().toISOString()
    };

    console.error(`[ERROR][${componentId}] ${message}`, logData);
  }
}

export const ErrorService = new ErrorServiceClass();
