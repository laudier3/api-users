import { Request, Response } from "express";
import { prisma } from "../../prisma_Client_Orm/prismaClient";

export class DelProducts {
  async handle(request: Request, response: Response):Promise<any>  {
    const id = request.params.id;

    const idExists = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (!idExists) {

      return response.status(208).json({msg: `Esse id: ${id} não existe mais no database`})

    }

    const user = await prisma.user.delete({
      where: {
        id: id
      }
    })

    return response.status(202).json({ msg: "Usuario deletado com sucesso!", user });
  }

}