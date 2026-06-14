import { useState } from "react";
import LandingPage from "@/components/landing/LandingPage";
import ManagerPanel from "@/components/manager/ManagerPanel";


const Index = () => {
  const [view, setView] = useState<"landing" | "manager">("landing");

  return (
    <div>
      {view === "landing" && <LandingPage onManagerClick={() => setView("manager")} />}
      {view === "manager" && <ManagerPanel onBack={() => setView("landing")} />}
    </div>
  );
};

export default Index;