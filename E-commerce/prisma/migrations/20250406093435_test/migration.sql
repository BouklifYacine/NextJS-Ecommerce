-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'utilisateur');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'pro');

-- CreateEnum
CREATE TYPE "PlanAbonnement" AS ENUM ('mois', 'année');

-- CreateEnum
CREATE TYPE "Categorie" AS ENUM ('ELECTRONIQUE', 'INFORMATIQUE', 'GAMING', 'MOBILIER');

-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('EN_ATTENTE', 'EN_TRAITEMENT', 'EXPEDIE', 'LIVRE', 'ANNULE');

-- CreateEnum
CREATE TYPE "ModeLivraison" AS ENUM ('STANDARD', 'EXPRESS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "image" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'utilisateur',
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "plan" "Plan" NOT NULL DEFAULT 'free',
    "clientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "Abonnement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,
    "periode" "PlanAbonnement" NOT NULL,
    "datedebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datefin" TIMESTAMP(3) NOT NULL,
    "economiesRealisees" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "codeAnniversaire" TEXT,

    CONSTRAINT "Abonnement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adresse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rue" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "pays" TEXT NOT NULL,
    "adressePrincipale" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adresse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "prixPromo" DOUBLE PRECISION,
    "quantiteStock" INTEGER NOT NULL DEFAULT 0,
    "enPromotion" BOOLEAN NOT NULL DEFAULT false,
    "categorie" "Categorie" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageProduit" (
    "id" TEXT NOT NULL,
    "produitId" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL,
    "principale" BOOLEAN NOT NULL DEFAULT false,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageProduit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "produitId" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "commentaire" TEXT,
    "achatVerifie" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favori" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "produitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "numeroCommande" TEXT NOT NULL,
    "statut" "StatutCommande" NOT NULL DEFAULT 'EN_ATTENTE',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateTraitement" TIMESTAMP(3),
    "dateExpedition" TIMESTAMP(3),
    "dateLivraison" TIMESTAMP(3),
    "dateAnnulation" TIMESTAMP(3),
    "total" DOUBLE PRECISION NOT NULL,
    "tva" DOUBLE PRECISION NOT NULL,
    "fraisLivraison" DOUBLE PRECISION NOT NULL,
    "adresseId" TEXT,
    "methodeLivraison" "ModeLivraison" NOT NULL DEFAULT 'STANDARD',
    "annulable" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dateLivraisonEstimee" TIMESTAMP(3),

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandeProduit" (
    "id" TEXT NOT NULL,
    "commandeId" TEXT NOT NULL,
    "produitId" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "prixTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommandeProduit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clientId_key" ON "User"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Abonnement_userId_key" ON "Abonnement"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favori_userId_produitId_key" ON "Favori"("userId", "produitId");

-- CreateIndex
CREATE UNIQUE INDEX "Commande_numeroCommande_key" ON "Commande"("numeroCommande");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abonnement" ADD CONSTRAINT "Abonnement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adresse" ADD CONSTRAINT "Adresse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageProduit" ADD CONSTRAINT "ImageProduit_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avis" ADD CONSTRAINT "Avis_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favori" ADD CONSTRAINT "Favori_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "Adresse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeProduit" ADD CONSTRAINT "CommandeProduit_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeProduit" ADD CONSTRAINT "CommandeProduit_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
