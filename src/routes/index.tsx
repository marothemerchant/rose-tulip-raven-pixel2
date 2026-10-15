import { createFileRoute } from "@tanstack/react-router";
import { OrbitProvider } from "@/lib/orbit/store";
import { Shell } from "@/components/studio/Shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <OrbitProvider>
      <Shell />
    </OrbitProvider>
  );
}
