import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { isEnabled } from "@/lib/featureFlags";

type CalculationLogPayload = {
  expression: string;
  result: string;
};

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "calculations.log");

function isValidPayload(payload: unknown): payload is CalculationLogPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const { expression, result } = payload as Record<string, unknown>;

  return (
    typeof expression === "string" &&
    expression.trim().length > 0 &&
    expression.length <= 200 &&
    typeof result === "string" &&
    result.trim().length > 0 &&
    result.length <= 100
  );
}

export async function POST(request: Request) {
  if (!isEnabled("calculationLoggingFeature")) {
    return new Response(null, { status: 204 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isValidPayload(payload)) {
    return Response.json(
      { error: "Invalid payload. Expected non-empty expression and result." },
      { status: 400 },
    );
  }

  const line = `${JSON.stringify({
    timestamp: new Date().toISOString(),
    expression: payload.expression,
    result: payload.result,
  })}\n`;

  try {
    await mkdir(LOG_DIR, { recursive: true });
    await appendFile(LOG_FILE, line, "utf8");
  } catch {
    return Response.json(
      { error: "Failed to persist calculation log entry." },
      { status: 500 },
    );
  }

  return new Response(null, { status: 204 });
}
