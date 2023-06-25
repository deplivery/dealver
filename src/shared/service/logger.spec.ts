import { logger } from './logger.service';

describe('LoggerService 테스트', () => {
  let errorSpy: jest.SpyInstance;
  let infoSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let debugSpy: jest.SpyInstance;
  let traceSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(logger['logger'], 'error').mockImplementation();
    infoSpy = jest.spyOn(logger['logger'], 'info').mockImplementation();
    warnSpy = jest.spyOn(logger['logger'], 'warn').mockImplementation();
    debugSpy = jest.spyOn(logger['logger'], 'debug').mockImplementation();
    traceSpy = jest.spyOn(logger['logger'], 'trace').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log error message', () => {
    logger.error('Error', { key: 'value' });
    expect(errorSpy).toHaveBeenCalledWith({ message: 'Error', context: { key: 'value' } });
  });

  it('should log log message', () => {
    logger.log('Log', { key: 'value' });
    expect(infoSpy).toHaveBeenCalledWith({ message: 'Log', context: { key: 'value' } });
  });

  it('should log warning message', () => {
    logger.warn('Warning', { key: 'value' });
    expect(warnSpy).toHaveBeenCalledWith({ message: 'Warning', context: { key: 'value' } });
  });

  it('should log debug message', () => {
    logger.debug('Debug', { key: 'value' });
    expect(debugSpy).toHaveBeenCalledWith({ message: 'Debug', context: { key: 'value' } });
  });

  it('should log verbose message', () => {
    logger.verbose('Verbose', { key: 'value' });
    expect(traceSpy).toHaveBeenCalledWith({ message: 'Verbose', context: { key: 'value' } });
  });
});
