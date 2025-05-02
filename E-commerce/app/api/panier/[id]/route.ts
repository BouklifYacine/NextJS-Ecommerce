import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const userId = "cma5ilzq40000irgg8rpod0l9";

  const { id } = await params;

  if (!userId) {
    return NextResponse.json({
      message: "Vous devez etre connecté pour voir votre panier ",
    }, {status : 400});
  }

  const panier = await prisma.panier.findUnique({
    where: {
      id,
    },
    select : {userId : true}
  });

  if (!panier) {
    return NextResponse.json({
      message:
        "Pas de panier disponible et ou pas de produit dans votre panier ",
    } , {status : 404});
  }

  if (panier.userId !== userId) {
    return NextResponse.json({ message: "Ce panier ne vous appartient pas " } , {status : 403});
  }

  await prisma.panier.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Votre panier a été supprimer ",
  });
}
