import { useState } from "react";
import LandingPage from "@/components/landing/LandingPage";
import ManagerPanel from "@/components/manager/ManagerPanel";
import ManagerLogin from "@/components/manager/ManagerLogin";

type View = "landing" | "login" | "manager";

const Index = () => {
  const [view, setView] = useState<View>("landing");

  return (
    <div>
      {view === "landing" && (
        <LandingPage onManagerClick={() => setView("login")} />
      )}
      {view === "login" && (
        <ManagerLogin
          onSuccess={() => setView("manager")}
          onBack={() => setView("landing")}
        />
      )}
      {view === "manager" && (
        <ManagerPanel onBack={() => setView("landing")} />
      )}
    </div>
  );
};

export default Index;
