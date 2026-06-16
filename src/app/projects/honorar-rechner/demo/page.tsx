import type { Metadata } from "next";
import HonorarDemo from "./honorar-demo";

export const metadata: Metadata = {
  title: "Honorarrechner Demo | Johannes Blank",
  description:
    "Sichere Portfolio-Demo des Honorarrechners im Stil der ursprünglichen WPF-App.",
};

export default function HonorarRechnerDemoPage() {
  return <HonorarDemo />;
}
