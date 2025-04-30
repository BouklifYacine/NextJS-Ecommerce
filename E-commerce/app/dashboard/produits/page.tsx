import React from "react";
import ComposantPrincipal from "./(components)/ComposantPrincipal";
import { auth } from "@/auth";
import { AccesAdmin } from "@/lib/SessionAdmin";
import { redirect } from "next/navigation";

const DashboardProduits = async () => {
  const session = await auth();
  const sessionId = session?.user?.id;
  const admin = await AccesAdmin();

  if (!session || !sessionId || !admin) return redirect("/");

  return (
    <>
      <ComposantPrincipal />
    </>
  );
};

export default DashboardProduits;
