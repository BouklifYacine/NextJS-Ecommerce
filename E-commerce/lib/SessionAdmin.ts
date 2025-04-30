import { auth } from "@/auth";
import { prisma } from "@/prisma";

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

export async function AccesAdmin() {
  const session = await auth();
  const IdUtilisateur = session?.user?.id;

  if (!IdUtilisateur) {
    return false;
  }

  const Utilisateur = await prisma.user.findUnique({
    where: { id: IdUtilisateur },
    select: { role: true },
  });

  if (!Utilisateur) {
    return false;
  }
  
  return Utilisateur.role === "Admin";
}


  