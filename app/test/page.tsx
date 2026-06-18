import { supabase } from "@/lib/supabaseClient";

export default async function TestPage() {
  const { data, error } = await supabase.from("products").select("*");

  return (
    <div style={{ padding: 20 }}>
      <h1>Supabase Test</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre style={{ color: "red" }}>
        {JSON.stringify(error, null, 2)}
      </pre>
    </div>
  );
}