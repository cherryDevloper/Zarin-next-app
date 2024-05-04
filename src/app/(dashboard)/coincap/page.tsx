"use client";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import { Table } from "antd";

const RECONNECT_DELAY = 3000; // 3 seconds
const MAX_RECONNECT_ATTEMPTS = 5;

interface Coin {
  key: string;
  name: string;
  price: string;
}

interface ParsedData {
  bitcoin?: string;
  ethereum?: string;
}

const initialCoinData: Coin[] = [
  { key: "bitcoin", name: "Bitcoin", price: "0" },
  { key: "ethereum", name: "Ethereum", price: "0" },
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Price", dataIndex: "price", key: "price" },
];

const Page = () => {
  const [coinData, setCoinData] = useState<Coin[]>(initialCoinData);
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const websocketUrl = "wss://ws.coincap.io/prices?assets=bitcoin,ethereum";

  const handleMessage = (message: string) => {
    try {
      const parsedData: ParsedData = JSON.parse(message);

      setCoinData((prevData) =>
        prevData.map((coin) => {
          if (coin.name.toLowerCase() in parsedData) {
            const price =
              parsedData[coin.name.toLowerCase() as keyof ParsedData];
            return { ...coin, price: price ?? coin.price };
          }
          return coin;
        })
      );
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  const initializeWebSocket = () => {
    if (!websocketUrl) {
      console.error("WebSocket URL is not defined in the environment.");
      return;
    }

    ws.current = new WebSocket(websocketUrl);

    ws.current.onopen = () => {
      console.log("WebSocket established.");
      setIsConnected(true);
      setReconnectAttempts(0);
    };

    ws.current.onmessage = (event: MessageEvent) => {
      handleMessage(event.data);
    };

    ws.current.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed.");
      setIsConnected(false);

      reconnectAfterDelay();
    };
  };

  const reconnectAfterDelay = () => {
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectTimeout.current = setTimeout(() => {
        console.log(" reconnect...");
        setReconnectAttempts(reconnectAttempts + 1);
        initializeWebSocket();
      }, RECONNECT_DELAY);
    } else {
      console.warn("Maximum reconnection attempts reached.");
    }
  };

  useEffect(() => {
    initializeWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close(); // Clean up WebSocket
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current); // Clean up timeout
      }
    };
  }, []);

  return (
    <div>
      {isConnected ? (
        <Table columns={columns} dataSource={coinData} pagination={false} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
