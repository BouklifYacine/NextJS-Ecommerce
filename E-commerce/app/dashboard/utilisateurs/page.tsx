import { AdminMiddlewareClient } from "@/lib/AdminMiddlewareClient";
import React from "react";
import ComponentPage from "../components/componentspage";

const DashboardServer = async () => {
 
  await AdminMiddlewareClient()

  return (
    <> <ComponentPage></ComponentPage> </>
  );
};

export default DashboardServer;
