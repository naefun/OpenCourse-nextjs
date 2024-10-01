import PrismaConnection from "@/database/PrismaConnection";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = PrismaConnection.getInstance();

export const GET = async (request: NextRequest) => {
  let response;

  if (request.nextUrl.searchParams.get("id") != null) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);
    console.log(id);

    response = await prisma.course.findUnique({
      where: {
        id: id,
      },
      include: {
        units: {
          include: {
            lessons: true,
          },
        },
      },
    });
  } else {
    response = await prisma.course.findMany();
  }

  return Response.json(response);
};

export const DELETE = async (request: NextRequest) => {
  let response;

  if (request.nextUrl.searchParams.get("id") != null) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);

    // get units for the to be deleted course
    const units = await prisma.unit.findMany({
      where: {
        courseId: id,
      },
    });

    // get the unit ids
    const unitIds = units.map((unit) => unit.id);

    // delete the lessons within the to be deleted course
    await prisma.lesson.deleteMany({
      where: {
        unitId: {
          in: unitIds,
        },
      },
    });

    await prisma.unit.deleteMany({
      where: {
        courseId: id,
      },
    });

    response = await prisma.course.delete({
      where: {
        id: id,
      },
    });
  }

  return Response.json(response);
};

export const POST = async (req: NextRequest) => {
  const { title, description, public: isPublic } = await req.json();

  try {
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        public: isPublic || false,
      },
    });

    return new Response(JSON.stringify(newCourse), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating course:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
