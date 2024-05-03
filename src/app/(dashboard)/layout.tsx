"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <section>
      <header className="bg-blue-500 text-white p-4 ">
        <Button onClick={() => router.push("/")}>{"<Back"}</Button>
      </header>
      <main>{children}</main>
    </section>
  );
}
