"use client";

import { SyntheticEvent, useRef, useState } from "react";
import { Loading } from "../Loading";

const URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const IFRAME_URL = `${URL}/sample`;

const SampleView = () => {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoadIframe = (e: SyntheticEvent<HTMLIFrameElement>) => {
    const iframeElement = iframeRef.current;
    setLoading(false);
    if (!iframeElement) {
      return;
    }

    iframeElement.style.height = "100%";
  };

  return (
    <div className="sticky top-0 inset-x-0 h-full overflow-hidden">
      {loading && (
        <div className="w-full flex items-center justify-center p-10">
          <Loading />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={IFRAME_URL}
        className="w-full h-full"
        title="샘플 청첩장"
        onLoad={handleLoadIframe}
      />
    </div>
  );
};

export default SampleView;
