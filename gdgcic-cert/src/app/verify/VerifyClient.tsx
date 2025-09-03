"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyClient() {
  const params = useSearchParams();
  const serial = params.get("serial");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serial) return;
    fetch(`/api/verify?serial=${encodeURIComponent(serial)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, [serial]);

  if (!serial) return null;

  return (
    <div className="mt-4 rounded-lg border border-neutral-800 p-4 bg-neutral-900">
      {error && <p className="text-red-400">{error}</p>}
      {!error && !data && <p className="text-neutral-400">Checking...</p>}
      {data && data.valid && (
        <div className="space-y-1">
          <p className="text-neutral-400">Serial</p>
          <p className="text-lg font-mono">{data.serial}</p>
          <p className="text-neutral-400 mt-4">Recipient</p>
          <p>{data.recipient} ({data.recipientEmail})</p>
          <p className="text-neutral-400 mt-4">Track</p>
          <p>{data.track} • {data.year}</p>
          <p className="text-neutral-400 mt-4">Status</p>
          <p>{data.status}</p>
        </div>
      )}
      {data && !data.valid && <p className="text-red-400">Invalid serial</p>}
    </div>
  );
}

