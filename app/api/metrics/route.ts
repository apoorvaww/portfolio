import client from "prom-client";

export const dynamic = "force-dynamic"

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

export async function GET() {
  const metrics = await register.metrics();

  return new Response(metrics, {
    status: 200,
    headers: {
      "Content-Type": register.contentType,
    },
  });
}
