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
  private isClient: boolean = typeof window !== 'undefined';

  registerLogging(componentId: string, config: LoggingConfig): void {
    if (!this.isClient) return; // Only register on client-side
    this.componentConfigs.set(componentId, config);
  }

  private isLoggingEnabled(componentId: string): boolean {
    if (!this.isClient) return false; // Don't log on server-side
    return this.componentConfigs.get(componentId)?.enabled || false;
  }

  private isVerboseEnabled(componentId: string): boolean {
    if (!this.isClient) return false; // Don't log on server-side
    return this.componentConfigs.get(componentId)?.verbose || false;
  }

  logInfo(message: string, context: LogContext, componentId: string, isVerbose = false): void {
    if (!this.isClient) return; // Don't log on server-side
    if (!this.isLoggingEnabled(componentId)) return;
    if (isVerbose && !this.isVerboseEnabled(componentId)) return;

    try {
      const logData = {
        level: "INFO",
        component: componentId,
        message,
        ...context,
        timestamp: new Date().toISOString()
      };

      // In production, this would send to a logging service
      console.log(`[INFO][${componentId}] ${message}`, logData);
    } catch (error) {
      // Silently fail if there's an error in logging
      console.log(`[ERROR] Failed to log info: ${error}`);
    }
  }

  logWarning(message: string, context: LogContext, componentId: string): void {
    if (!this.isClient) return; // Don't log on server-side
    if (!this.isLoggingEnabled(componentId)) return;

    try {
      const logData = {
        level: "WARNING",
        component: componentId,
        message,
        ...context,
        timestamp: new Date().toISOString()
      };

      console.warn(`[WARNING][${componentId}] ${message}`, logData);
    } catch (error) {
      // Silently fail if there's an error in logging
      console.log(`[ERROR] Failed to log warning: ${error}`);
    }
  }

  logError(message: string, context: LogContext, componentId: string): void {
    if (!this.isClient) return; // Don't log on server-side
    if (!this.isLoggingEnabled(componentId)) return;

    try {
      const logData = {
        level: "ERROR",
        component: componentId,
        message,
        ...context,
        timestamp: new Date().toISOString()
      };

      console.error(`[ERROR][${componentId}] ${message}`, logData);
    } catch (error) {
      // Silently fail if there's an error in logging
      console.log(`[ERROR] Failed to log error: ${error}`);
    }
  }
}

export const ErrorService = new ErrorServiceClass();
