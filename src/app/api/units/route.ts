import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

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

export const POST = async (req: NextRequest) => {
  const { title, description, public: isPublic, courseId } = await req.json();

  try {
    const newUnit = await prisma.unit.create({
      data: {
        title,
        description,
        courseId,
        public: isPublic || false,
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
