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
      <div className="flex flex-col">
        <div className="flex-1 flex justify-center items-center bg-gray-100">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Cartes de statistiques */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Skeleton className="h-32 w-[calc(20%-16px)] min-w-[200px] rounded-lg" />
              <Skeleton className="h-32 w-[calc(20%-16px)] min-w-[200px] rounded-lg" />
              <Skeleton className="h-32 w-[calc(20%-16px)] min-w-[200px] rounded-lg" /> 
              <Skeleton className="h-32 w-[calc(20%-16px)] min-w-[200px] rounded-lg" />
              <Skeleton className="h-32 w-[calc(20%-16px)] min-w-[200px] rounded-lg" />
            </div>
            
            {/* Contenu principal */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar - Si nécessaire dans cette vue */}
              <div className="flex flex-col w-full md:w-64 flex-shrink-0">
                <Skeleton className="h-8 w-[150px] mb-4" />
                <Skeleton className="h-6 w-[120px] mb-3" />
                <Skeleton className="h-6 w-[140px] mb-3" />
                <Skeleton className="h-6 w-[130px] mb-3" />
                <Skeleton className="h-6 w-[150px] mb-3" />
                <Skeleton className="h-6 w-[120px] mb-3" />
              </div>
              
              {/* Tableau principal */}
              <div className="flex flex-col flex-grow">
                <Skeleton className="h-10 w-[250px] mb-4 mx-auto md:mx-0" />
                <div className="flex flex-col gap-4 mb-6">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
                <div className="flex justify-center md:justify-start">
                  <Skeleton className="h-10 w-[120px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (statsError || utilisateurError || !dataStats || !dataUtilisateur) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-red-500 text-xl">
            Une erreur est survenue lors du chargement des données
          </div>
        </div>
      </div>
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
    
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <div className="flex-1 flex justify-center">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <TableauDeBordClient
            utilisateurs={utilisateurs}
            statistiques={statistiques}
            MRR={MRR}
            RevenusParUtilisateurs={RevenusParUtilisateurs}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
    
  );
};

export default ComponentPage;