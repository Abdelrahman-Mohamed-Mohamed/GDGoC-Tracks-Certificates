import dynamic from "next/dynamic";
const VerifyClient = dynamic(() => import("./VerifyClient"), { ssr: false });

export default function VerifyPage() {
  return (
    <main className="min-h-screen p-8 text-gray-100 bg-neutral-950">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Verify Certificate</h1>
        <VerifyClient />
      </div>
    </main>
  );
}

