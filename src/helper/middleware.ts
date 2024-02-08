import { TokenPayloadSchema } from "@/schemas/auth";

const base64UrlDecode = (str: string) => {
  // Base64 URL 인코딩을 표준 Base64 인코딩으로 변환합니다.
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");

  // 패딩 문자("="), 필요한 경우 추가합니다.
  // Base64 인코딩이 4의 배수가 되도록 "=" 문자를 추가합니다.
  const padLength = 4 - (base64.length % 4);
  if (padLength < 4) {
    for (let i = 0; i < padLength; i++) {
      base64 += "=";
    }
  }

  // 'atob'를 사용하여, 표준 Base64 인코딩된 문자열을 디코딩합니다.
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  return jsonPayload;
};

export const decodeJwt = (token: string) => {
  // JWT의 각 부분을 분리합니다. (header, payload, signature)
  const [headerB64, payloadB64] = token.split(".");

  // Base64 URL 디코딩을 통해, payload를 JSON 문자열로 변환합니다.
  const headerJson = base64UrlDecode(headerB64);
  const payloadJson = base64UrlDecode(payloadB64);

  // JSON 문자열을 JSON 객체로 변환합니다.
  const header = JSON.parse(headerJson);
  const payload = TokenPayloadSchema.parse(JSON.parse(payloadJson));

  console.log("decodeJwt", header, payload);

  return { header, payload };
};

export const verifyJwt = async (token: string, secret: string) => {
  const [headerBase64, payloadBase64, signatureHex] = token.split(".");
  const data = `${headerBase64}.${payloadBase64}`;

  // Web Crypto API를 사용하여 서명을 확인합니다.
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const secretBuffer = encoder.encode(secret);
  const signatureBuffer = new Uint8Array(
    Array.from(atob(signatureHex), c => c.charCodeAt(0)),
  );

  // HS256 알고리즘을 사용하여 서명을 확인합니다.
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    secretBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );

  const isValid = await crypto.subtle.verify(
    "HMAC",
    cryptoKey,
    signatureBuffer,
    dataBuffer,
  );

  return isValid;
};
