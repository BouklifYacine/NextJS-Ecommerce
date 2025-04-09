"use client";

import React, { useState } from "react";
import Header from "@/components/header";
import { TableauDeBordClient } from "../TableauDeBordClient";
import { useStats, useUtilisateurs } from "../(hooks)/UseDashboard";
import { Skeleton } from "@/components/ui/skeleton"


const ComponentPage = () => {
  const [page, setPage] = useState(0);

  const {
    data: dataStats,
    isLoading: isLoadingStats,
    error: statsError,
  } = useStats();

  const {
    data: dataUtilisateur,
    isLoading: isLoadingUtilisateur,
    error: utilisateurError,
  } = useUtilisateurs(page);

  if (isLoadingStats || isLoadingUtilisateur) {
    return (
      <>
        <Header />
        <div className="flex justify-center min-h-screen bg-gray-100">
  <div className="flex flex-col w-full max-w-7xl p-6">

    <div className="flex flex-wrap gap-4 mb-8">
      <Skeleton className="h-32 w-[12%] flex-grow rounded-lg" />
      <Skeleton className="h-32 w-[12%] flex-grow rounded-lg" />
      <Skeleton className="h-32 w-[12%] flex-grow rounded-lg" /> 
      <Skeleton className="h-32 w-[12%] flex-grow rounded-lg" />
      <Skeleton className="h-32 w-[12%] flex-grow rounded-lg" />
    </div>
    
    <div className="flex flex-col md:flex-row gap-6 flex-grow">

      <div className="flex flex-col w-64 flex-shrink-0">
        <Skeleton className="h-8 w-[150px] mb-4" />
        <Skeleton className="h-6 w-[120px] mb-3" />
        <Skeleton className="h-6 w-[140px] mb-3" />
        <Skeleton className="h-6 w-[130px] mb-3" />
        <Skeleton className="h-6 w-[150px] mb-3" />
        <Skeleton className="h-6 w-[120px] mb-3" />
      </div>
      
      <div className="flex flex-col flex-grow">
        <Skeleton className="h-10 w-[250px] mb-4" />
        <div className="flex flex-col gap-4 mb-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
        <Skeleton className="h-10 w-[120px] mt-auto" />
      </div>
    </div>
  </div>
</div>
      </>
    );
  }

  if (statsError || utilisateurError || !dataStats || !dataUtilisateur) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen text-red-500">
          Une erreur est survenue lors du chargement des données
        </div>
      </>
    );
  }

  const utilisateurs = dataUtilisateur.data;
  const totalPages = dataUtilisateur.totalPages;
  const totalUtilisateurs = dataStats.data.users.total;
  const totalAbonnements = dataStats.data.users.pro;
  const statsAbonnements = {
    annuels: dataStats.data.abonnements.annuels,
    mensuels: dataStats.data.abonnements.mensuels,
  };
  const totalRevenus = Number(dataStats.data.abonnements.total.revenus);
  const MRR = Number(dataStats.data.abonnements.total.mrr);

  const RevenusParUtilisateurs = totalUtilisateurs > 0
    ? Number((totalRevenus / totalUtilisateurs).toFixed(2))
    : 0;

  const statistiques = {
    totalUtilisateurs,
    totalAbonnements,
    totalRevenus,
    statsAbonnements,
  };

  return (
    <>
      <Header />
      <TableauDeBordClient
        utilisateurs={utilisateurs}
        statistiques={statistiques}
        MRR={MRR}
        RevenusParUtilisateurs={RevenusParUtilisateurs}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default ComponentPage;