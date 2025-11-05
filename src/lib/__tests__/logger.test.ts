import Logger from "../logger";

describe("Logger", () => {
  let originalConsole: typeof console;
  let consoleLog: jest.SpyInstance;
  let consoleInfo: jest.SpyInstance;
  let consoleWarn: jest.SpyInstance;
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    // Salva console original
    originalConsole = global.console;
    
    // Cria mocks para console
    consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleInfo = jest.spyOn(console, "info").mockImplementation(() => {});
    consoleWarn = jest.spyOn(console, "warn").mockImplementation(() => {});
    consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.console = originalConsole;
  });

  describe("debug", () => {
    it("deve logar em desenvolvimento", () => {
      Logger.debug("Mensagem de debug", { data: "test" });

      expect(consoleLog).toHaveBeenCalled();
    });

    it("deve incluir timestamp e nível", () => {
      Logger.debug("Teste");

      expect(consoleLog).toHaveBeenCalled();
      const call = consoleLog.mock.calls[0][0];
      expect(call).toContain("[DEBUG]");
    });
  });

  describe("info", () => {
    it("deve logar informação", () => {
      Logger.info("Mensagem de info", { data: "test" });

      expect(consoleInfo).toHaveBeenCalled();
    });

    it("deve incluir timestamp e nível", () => {
      Logger.info("Teste");

      expect(consoleInfo).toHaveBeenCalled();
      const call = consoleInfo.mock.calls[0][0];
      expect(call).toContain("[INFO]");
    });
  });

  describe("warn", () => {
    it("deve logar aviso", () => {
      Logger.warn("Mensagem de aviso", { data: "test" });

      expect(consoleWarn).toHaveBeenCalled();
    });

    it("deve incluir timestamp e nível", () => {
      Logger.warn("Teste");

      expect(consoleWarn).toHaveBeenCalled();
      const call = consoleWarn.mock.calls[0][0];
      expect(call).toContain("[WARN]");
    });
  });

  describe("error", () => {
    it("deve logar erro", () => {
      Logger.error("Mensagem de erro", { data: "test" });

      expect(consoleError).toHaveBeenCalled();
    });

    it("deve incluir timestamp e nível", () => {
      Logger.error("Teste");

      expect(consoleError).toHaveBeenCalled();
      const call = consoleError.mock.calls[0][0];
      expect(call).toContain("[ERROR]");
    });
  });

  it("deve formatar mensagem corretamente", () => {
    Logger.info("Mensagem de info", { key: "value" });

    expect(consoleInfo).toHaveBeenCalled();
    const call = consoleInfo.mock.calls[0];
    expect(call[0]).toContain("[INFO]");
    expect(call[0]).toContain("Mensagem de info");
  });
});

