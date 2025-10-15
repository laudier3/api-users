import { Request, Response } from 'express'
import { prisma } from '../../prisma_Client_Orm/prismaClient'


// Rota protegida que retorna os dados do usuário
export class FindUserMe {
  async handle(req: Request, res: Response): Promise<any> {
    const userId = (req as any).userId

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        age: true,
        email: true,
        phone: true,
        access: true,
        image: true,
        password: true,
      },
    })

    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado.' })
    res.json(user)
  }
}
