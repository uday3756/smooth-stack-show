import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Overview } from "@/components/Overview";
import { ServicesExplorer } from "@/components/ServicesExplorer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteBackground } from "@/components/SiteBackground";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <ThemeProvider>
      <SiteBackground />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <Overview />
          <ServicesExplorer />
        </main>
        <Footer />
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}
