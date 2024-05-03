/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OMDB_API_URL: "https://www.omdbapi.com/",
    COINCAP_API_URL: "https://api.coincap.io/v2",
    WEBSOCKET_URL: "wss://ws.coincap.io/prices?assets=bitcoin,ethereum",
    OMDB_API_KEY: "3c843d14",
  },
};

export default nextConfig;
