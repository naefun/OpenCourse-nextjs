import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const allCourses = await prisma.course.findMany();

  return Response.json(allCourses);
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
