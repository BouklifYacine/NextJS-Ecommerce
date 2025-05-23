"use client";

import Image from "next/image";
import React from "react";
import LogoLiverpool from "@/app/public/Logo_FC_Liverpool.svg.png";
import Link from "next/link";
import { CreditCard, DoorOpen, Settings, ShoppingBasket, Star, Table } from "lucide-react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Deconnexion } from "./BoutonDéconnexion";
import { BoutonConnexion } from "./BoutonConnexion";
import { MenuDeroulant } from "@/components/MenuDeroulant";
import { useQuery } from "@tanstack/react-query";
import { UtilisateurAbonner } from "@/app/(actions)/UserAbonnementAction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminAction } from "@/app/(actions)/AdminAction";
import LogoPanier from "./panier/LogoPanier";
import FavoriCoeur from "./FavoriCoeur/FavoriCoeur";
import { Input } from "./ui/input";
import { useGetPanier } from "@/app/panier/(hook)/useGetPanier";
import { useFavoris } from "@/app/favoris/(hooks)/useFavoris";

const Header = () => {
  const { data: session } = useSession();
  const {data : donnees} = useGetPanier()
  const {data : favoris , isLoading} = useFavoris()

  const nombreFavoris = favoris?.nombrefavoris || 0

  const nombreArticle = donnees?.panier?.items?.reduce((total, item) => total + (item?.quantite || 0), 0) || 0;


  const { data } = useQuery({
    queryKey: ["userStatus"],
    queryFn: async () => {
      const [abonnement, admin] = await Promise.all([
        UtilisateurAbonner(),
        AdminAction(),
      ]);
      return { abonnement, admin };
    },
  });

  const utilisateurabonner = data?.abonnement.abonner;
  const utilisateurAdmin = data?.admin.Admin;

  return (
    <header className="sticky top-0 z-50 pt-4 px-4 bg-sky-500">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={LogoLiverpool}
              alt="Logo Liverpool FC"
              height={50}
              width={50}
              className="hover:scale-110 transition-transform"
              priority
            />
          </Link>

          <div className="md:hidden">
            <MenuDeroulant nombreArticle={nombreArticle} nombreFavoris={nombreFavoris} />
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center mx-4">

  <div className="relative w-full max-w-md">
    <Input
      className="w-full pl-10 pr-4 py-2 placeholder:text-white placeholder:opacity-80"
      placeholder="Chercher un article"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white opacity-80" />
  </div>
</div>

    
          <div className="hidden md:flex items-center gap-8 text-lg tracking-tight">
            {!session ? (
              <div className="flex items-center gap-6">
                <BoutonConnexion />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="border border-purple-600 cursor-pointer hover:scale-125 transition-transform">
                      <AvatarImage
                        src="https://cdn.vox-cdn.com/thumbor/r0U59Lx7DOSI2Z_F7WLnzcbQfuU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24953495/1698708349.jpg"
                        alt="Logo"
                      />
                      <AvatarFallback>LFC</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src="https://cdn.vox-cdn.com/thumbor/r0U59Lx7DOSI2Z_F7WLnzcbQfuU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24953495/1698708349.jpg"
                          alt="Logo"
                        />
                        <AvatarFallback>LFC</AvatarFallback>
                      </Avatar>
                      <DropdownMenuLabel className="px-0">
                        Mon compte
                      </DropdownMenuLabel>
                    </div>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <DoorOpen className="mr-2 h-4 w-4" />
                      <Link href="connexion" className="cursor-pointer">
                        Connexion
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Deconnexion />
              
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="border border-purple-600 cursor-pointer hover:scale-125 transition-transform">
                      <AvatarImage
                        src={session.user?.image ?? ""}
                        alt={session.user?.name ?? "User avatar"}
                      />
                      <AvatarFallback>
                        {session.user?.name?.[0]?.toUpperCase() ?? ""}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={session.user?.image ?? ""}
                          alt={session.user?.name ?? "User avatar"}
                        />
                        <AvatarFallback>
                          {session.user?.name?.[0]?.toUpperCase() ?? ""}
                        </AvatarFallback>
                      </Avatar>
                      <DropdownMenuLabel className="px-0">
                        Mon compte
                      </DropdownMenuLabel>
                    </div>
                    <DropdownMenuSeparator />

                    {utilisateurabonner && (
                      <Link
                        href={
                          process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!
                        }
                      >
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4 cursor-pointer" />
                          <span className="cursor-pointer">Abonnement</span>
                        </DropdownMenuItem>
                      </Link>
                    )}

                    {utilisateurAdmin && (
                      <Link href="/dashboard" className="cursor-pointer">
                        <DropdownMenuItem>
                          <Table className="mr-2 h-4 w-4 text-black" />
                          <span className="cursor-pointer">Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                    )}

                    <DropdownMenuGroup>
                    <DropdownMenuItem>
                <ShoppingBasket className="mr-2 h-4 w-4" />
                <span>Panier ({nombreArticle})</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              <span>Favoris ({nombreFavoris})</span>
                            </DropdownMenuItem>
              
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4 cursor-pointer" />
                        <Link
                          href={`/parametres/${session.user?.id}`}
                          className="cursor-pointer"
                        >
                          Paramètres
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <FavoriCoeur nombreFavoris={nombreFavoris} isLoading={isLoading}></FavoriCoeur>
                <LogoPanier nombreArticle={nombreArticle}  />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;