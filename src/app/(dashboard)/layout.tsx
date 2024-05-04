"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <section>
        <header className="bg-blue-500 text-white p-4 ">
          <Button onClick={() => router.push("/")}>{"<Back"}</Button>
        </header>
        <main>{children}</main>
      </section>
    </QueryClientProvider>
  );
}
