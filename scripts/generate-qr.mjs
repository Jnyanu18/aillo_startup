import QRCode from "qrcode";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const url = process.argv[2] || "https://accelerationlogics.com";
const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(outDir, { recursive: true });

const brandOptions = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: { dark: "#0a0a0f", light: "#ffffff" },
};

await QRCode.toFile(path.join(outDir, "qr-code.png"), url, { ...brandOptions, width: 1200 });
await QRCode.toFile(path.join(outDir, "qr-code.svg"), url, brandOptions);

console.log(`QR code generated for: ${url}`);
console.log(`  public/qr-code.png (1200x1200, for print)`);
console.log(`  public/qr-code.svg (vector, for scaling)`);
