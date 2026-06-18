import type { Metadata } from "next";
import EscDemo from "./esc-demo";

export const metadata: Metadata = {
  title: "ESC Voting System Demo | Johannes Blank",
  description:
    "Statische Portfolio-Demo für ein ESC Voting System mit lokalem Browser-Speicher.",
};

export default function EscDemoPage() {
  return <EscDemo />;
}
