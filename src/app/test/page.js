"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

export default function TestPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiGet("/")
      .then(res => setData(res))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Test Backend Connection</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
