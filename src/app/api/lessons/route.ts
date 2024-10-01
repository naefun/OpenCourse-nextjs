import PrismaConnection from "@/database/PrismaConnection";
import { NextRequest } from "next/server";

const prisma = PrismaConnection.getInstance();

export const GET = async (request: NextRequest) => {
  let response;

  if (request.nextUrl.searchParams.get("id") != null) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);
    console.log(id);

    response = await prisma.lesson.findUnique({
      where: {
        id: id,
      },
    });
  } else {
    response = await prisma.lesson.findMany();
  }

  return Response.json(response);
};

export const DELETE = async (request: NextRequest) => {
  let response;

  if (request.nextUrl.searchParams.get("id") != null) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);
    console.log(id);

    response = await prisma.lesson.delete({
      where: {
        id: id,
      },
    });
  } else if (request.nextUrl.searchParams.get("unitId") != null) {
    const unitId = parseInt(request.nextUrl.searchParams.get("unitId")!);
    response = await prisma.lesson.deleteMany({
      where: {
        unitId: unitId,
      },
    });
  }

  return Response.json(response);
};

export const POST = async (req: NextRequest) => {
  const {
    title,
    description,
    videoId,
    public: isPublic,
    unitId,
  } = await req.json();

  try {
    const newLesson = await prisma.lesson.create({
      data: {
        title,
        description,
        videoId,
        public: isPublic || false,
        unitId,
      },
    });

    return new Response(JSON.stringify(newLesson), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating lesson:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
