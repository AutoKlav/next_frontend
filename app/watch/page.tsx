"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/file";
import Head from "next/head";

// Stream type definition
type Stream = {
  name: string;
  image: string;
  type: 'iframe' | 'video';
  link: string;
};

const Player: React.FC = () => {
  const [stream, setStream] = useState<Stream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch streams list on mount
  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const res = await fetch("https://www.myjsons.com/v/autoklav");
        if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No streams available");
        }
        const first = data[0];
        setStream(first);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStreams();
  }, []);

  // on mount, set title + favicon
  useEffect(() => {
    // 1) TITLE
    document.title = "Nogomet";

    // 2) FAVICON
    const link =
      document.querySelector<HTMLLinkElement>("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = "/favicon-nogomet.ico";
    document.getElementsByTagName("head")[0].appendChild(link);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stream) return <div>No stream available</div>;
  
  return (
    <>
      <Head>
        <title>Nogomet</title>
        <link rel="icon" href="/favicon-nogomet.ico" />
      </Head>

      {stream.type === "iframe" && (
        <iframe
          id="videoIframe"
          key={stream.link}
          src={stream.link}
          width="100%"
          height="100vh"
          allowFullScreen
          allow="autoplay; fullscreen"
          style={{ height: "100vh", width: "100%" }}
        />
      )}

      {stream.type === "video" && (
        <ReactPlayer
          url={stream.link}
          playing
          width="100%"
          height="100vh"
          controls
          volume={1}
          pip
        />
      )}
    </>
  );
};

export default Player;