/* eslint-disable no-console */

const isProduction = process.env.NODE_ENV === "production";

const logger = {
  log: (...args: unknown[]) => {
    if (!isProduction) {
      console.log(...args);
    }

    console.log(...args);
    // 외부 서비스로 로그를 전송하는 코드
  },
  error: (...args: unknown[]) => {
    if (!isProduction) {
      console.error(...args);
    }

    console.error(...args);
    // 외부 서비스로 로그를 전송하는 코드
  },
};

export default logger;
