import PrismaConnection from "@/database/PrismaConnection";
import { NextRequest, NextResponse } from "next/server";

const prisma = PrismaConnection.getInstance();

export const GET = async (request: NextRequest) => {
  let response;

  if (request.nextUrl.searchParams.get("id") != null) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);
    console.log(id);

    response = await prisma.unit.findUnique({
      where: {
        id: id,
      },
    });
  } else {
    response = await prisma.unit.findMany();
  }

  return Response.json(response);
};

export const PUT = async (request: NextRequest) => {
  const data = await request.json();
  for (let item of data) {
    await prisma.unit.update({
      where: {
        id: item.id,
      },
      data: {
        position: item.position,
      },
    });
  }
  return NextResponse.json({ message: data }, { status: 201 });
};

export const DELETE = async (request: NextRequest) => {
  let response;

  if (request.nextUrl.searchParams.get("id") != null) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);
    console.log(id);

    response = await prisma.unit.delete({
      where: {
        id: id,
      },
    });
  }

  return Response.json(response);
};

export const POST = async (req: NextRequest) => {
  const { title, description, public: isPublic, courseId } = await req.json();

  const units = await prisma.unit.findMany({
    where: {
      courseId: courseId,
    },
  });

  try {
    const newUnit = await prisma.unit.create({
      data: {
        title,
        description,
        courseId,
        public: isPublic || false,
        position: units.length,
      },
    });

    return new Response(JSON.stringify(newUnit), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating unit:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
