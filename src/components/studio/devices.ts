import type { ViewportId } from "@/lib/orbit/types";

export type DeviceSpec = {
  id: ViewportId;
  label: string;
  detail: string;
  screenW: number;
  screenH: number;
  bezel: number;
  radius: number;
  island: boolean;
  kind: "phone" | "tablet" | "desktop" | "full";
};

export const DEVICES: DeviceSpec[] = [
  { id: "se", label: "iPhone SE", detail: "375 × 667", screenW: 375, screenH: 667, bezel: 12, radius: 32, island: false, kind: "phone" },
  { id: "iphone", label: "iPhone", detail: "393 × 852", screenW: 393, screenH: 852, bezel: 12, radius: 46, island: true, kind: "phone" },
  { id: "max", label: "iPhone Pro Max", detail: "430 × 932", screenW: 430, screenH: 932, bezel: 12, radius: 48, island: true, kind: "phone" },
  { id: "ipad-mini", label: "iPad mini", detail: "744 × 1024", screenW: 744, screenH: 1024, bezel: 18, radius: 28, island: false, kind: "tablet" },
  { id: "ipad", label: "iPad Pro", detail: "834 × 1112", screenW: 834, screenH: 1112, bezel: 18, radius: 26, island: false, kind: "tablet" },
  { id: "tablet", label: "Tablet", detail: "1024 × 768", screenW: 1024, screenH: 768, bezel: 16, radius: 20, island: false, kind: "tablet" },
  { id: "desktop", label: "Desktop", detail: "1280 × 800", screenW: 1280, screenH: 800, bezel: 0, radius: 12, island: false, kind: "desktop" },
  { id: "full", label: "Full screen", detail: "Edge to edge", screenW: 0, screenH: 0, bezel: 0, radius: 0, island: false, kind: "full" },
];

export function deviceById(id: ViewportId): DeviceSpec {
  return DEVICES.find((item) => item.id === id) ?? DEVICES[1];
}
