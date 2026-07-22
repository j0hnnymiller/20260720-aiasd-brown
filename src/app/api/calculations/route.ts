import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { isEnabled } from "@/lib/featureFlags";

type CalculationLogPayload = {
  expression: string;
  result: string;
};

const MAX_EXPRESSION_LENGTH = 200;
const MAX_RESULT_LENGTH = 100;
const APP_ROOT = process.cwd();
const DEFAULT_LOG_FILE = path.join(APP_ROOT, "logs", "calculations.log");

function normalizePathForComparison(inputPath: string) {
  const normalized = path.normalize(inputPath);
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

function resolveLogFilePath() {
  const configuredPath = process.env.CALCULATION_LOG_FILE;
  if (!configuredPath) {
    return DEFAULT_LOG_FILE;
  }

  const resolvedPath = path.resolve(APP_ROOT, configuredPath);
  const normalizedRoot = normalizePathForComparison(APP_ROOT);
  const normalizedResolved = normalizePathForComparison(resolvedPath);
  const isWithinAppRoot =
    normalizedResolved === normalizedRoot ||
    normalizedResolved.startsWith(`${normalizedRoot}${path.sep}`);

  return isWithinAppRoot ? resolvedPath : DEFAULT_LOG_FILE;
}

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
  const logFile = resolveLogFilePath();
  const logDir = path.dirname(logFile);

  try {
    await mkdir(logDir, { recursive: true });
    await appendFile(logFile, line, "utf8");
  } catch (error) {
    console.error("Failed to write calculation log entry.", {
      file: path.basename(logFile),
      error,
    });
    return Response.json(
      { error: "Failed to persist calculation log entry." },
      { status: 500 },
    );
  }

  return new Response(null, { status: 204 });
}
