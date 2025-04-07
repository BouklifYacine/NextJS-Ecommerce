import React from "react";
import ComponentPage from "./components/componentspage";

import { AdminMiddlewareClient } from "../../lib/AdminMiddlewareClient";

const DashboardServer = async () => {
 
  await AdminMiddlewareClient()

  return (
    <> <ComponentPage></ComponentPage> </>
  );
};

export default DashboardServer;
