// app/api/favoris/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const sessionId = session?.user?.id;

  const favoriId = await params.id;


  if (!session || !sessionId) {
    return NextResponse.json(
      { message: "Vous devez être connecté" },
      { status: 401 }
    );
  }

if (!favoriId || typeof favoriId !== "string") {
    return NextResponse.json(
      { message: "ID du favori invalide" },
      { status: 400 }
    );
  }

  try {

    const favori = await prisma.favori.findUnique({
      where: {
        id: favoriId,
        userId: sessionId
      }
    });

    if (!favori) {
      return NextResponse.json(
        { message: "Favori non trouvé ou non autorisé" },
        { status: 404 }
      );
    }

    if (favori.userId !== sessionId) {
        return NextResponse.json(
          { message: "Non autorisé - Ce favori ne vous appartient pas" },
          { status: 403 }
        );
      }

    await prisma.favori.delete({
      where: {
        id: favoriId
      }
    });

    const nombrefavoris = await prisma.favori.count({
      where: { userId: sessionId }
    });

    return NextResponse.json({
      message: "Favori supprimé avec succès",
      nombrefavoris
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la suppression du favori" },
      { status: 500 }
    );
  }
}