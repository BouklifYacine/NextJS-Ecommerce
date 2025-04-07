import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function SessionAdmin() {
    const session = await auth();
    const userId = session?.user?.id;
  
    if (!userId) throw new Error("Authentification requise");
    
    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: { role: true }
    });
  
    if (user?.role !== "Admin") throw new Error("Privilèges insuffisants");
  }

  export async function AccesAdmin(){
    const IdUtilisateur = "cm95g4yuq000girjgiaapylb0";
    
      const Utilisateur = await prisma.user.findUnique({
        where: { id: IdUtilisateur },
        select: { role: true },
      });
    
      if (!Utilisateur)
        return NextResponse.json(
          { message: "Vous devez vous connectez " },
          { status: 401 }
        );
    
      const admin = Utilisateur.role === "Admin";
    
      if (!admin)
        return NextResponse.json(
          { message: "Vous n'etes pas autorisé a faire cela " },
          { status: 403 }
        );

        return true;
  }
  