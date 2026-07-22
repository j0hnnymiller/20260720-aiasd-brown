import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { isEnabled } from "@/lib/featureFlags";

type CalculationLogPayload = {
  expression: string;
  result: string;
};

const MAX_EXPRESSION_LENGTH = 200;
const MAX_RESULT_LENGTH = 100;
const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = process.env.CALCULATION_LOG_FILE
  ? path.resolve(process.env.CALCULATION_LOG_FILE)
  : path.join(LOG_DIR, "calculations.log");
const RESOLVED_LOG_DIR = path.dirname(LOG_FILE);

function isValidPayload(payload: unknown): payload is CalculationLogPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const { expression, result } = payload as Record<string, unknown>;

  return (
    typeof expression === "string" &&
    expression.trim().length > 0 &&
    expression.length <= MAX_EXPRESSION_LENGTH &&
    typeof result === "string" &&
    result.trim().length > 0 &&
    result.length <= MAX_RESULT_LENGTH
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
    await mkdir(RESOLVED_LOG_DIR, { recursive: true });
    await appendFile(LOG_FILE, line, "utf8");
  } catch (error) {
    console.error("Failed to write calculation log entry.", error);
    return Response.json(
      { error: "Failed to persist calculation log entry." },
      { status: 500 },
    );
  }

  return new Response(null, { status: 204 });
}
