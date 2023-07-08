import { logger } from './logger.service';

describe('LogBehavior decorator', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should call console.log when logger.error is called', () => {
    logger.error('Test error message');
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it('should call console.log when logger.log is called', () => {
    logger.log('Test log message');
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it('should call console.log when logger.warn is called', () => {
    logger.warn('Test log message');
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it('should not call console.log when logger.debug is called', () => {
    logger.debug('Test log message');
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  it('should not call console.log when logger.verbose is called', () => {
    logger.verbose('Test log message');
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});
