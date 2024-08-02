export const checkIfError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const getURL = () => {
  let url =
    process.env?.NEXT_PUBLIC_SITE_URL ??
    process.env?.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000";

  url = url.startsWith("http") ? url : `https://${url}`;

  // 끝에 슬래시가 있으면 제거합니다.
  url = url.endsWith("/") ? url.slice(0, -1) : url;

  return url;
};

export const convertEventAtToDate = (eventAt: {
  date: string;
  time: string;
}) => {
  const date = new Date(`${eventAt.date} ${eventAt.time}`);
  return date;
};
