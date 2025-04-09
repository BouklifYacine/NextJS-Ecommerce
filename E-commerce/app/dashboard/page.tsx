import React from "react";
import { AdminMiddlewareClient } from "../../lib/AdminMiddlewareClient";

const DashboardServer = async () => {

  await AdminMiddlewareClient()

  return (
    <> <h1>Test de bg</h1> </>
  );
};

export default DashboardServer;
