import { Request, Response } from "express";
import { prisma } from "../../prisma_Client_Orm/prismaClient";

export class FindProducts {
    async handle(req: Request, res: Response): Promise<any> {
        const listProducts = await prisma.user.findMany({})

        return res.status(200).json({msg: "Lista de usuarios cadatrados", listProducts})
    }
}