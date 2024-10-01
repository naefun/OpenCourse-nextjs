import { PrismaClient } from "@prisma/client";

class PrismaConnection {
  static instance: PrismaClient;

  constructor() {}

  public static getInstance(): PrismaClient {
    if (!this.instance) {
      this.instance = new PrismaClient();
      console.log("Creating new connection");
    } else {
      console.log("Already have a connection");
    }
    return this.instance;
  }
}

export default PrismaConnection;
