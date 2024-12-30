import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { prisma } from "../../prisma_Client_Orm/prismaClient";

export class ControllerLogin {
  async handle(request: Request, response: Response):Promise<any>  {
    const { email, password } = request.body;

    console.log(email, password)

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    //const message = { errr: "E-mail ou senha invalida" }

    if (!user) {
      return response.status(404).json({msg: "E-mail ou senha invalid!"})
    }

    const verifyPass = await bcrypt.compare(password, user.password)

    if (!verifyPass) {
      return response.status(404).json({msg: "E-mail ou senha invalido!"})
    }

    const token = jwt.sign({ id: user.id }, process.env.APP_KEY ?? '', {
      expiresIn: '8h'
    })

    const { password: _, ...userLogin } = user
    const msg = { msg: "O token é valido por até 8 horas!" }

    try {
      return response.status(202).json({msg: "Login efetuado com sucesso...",
        user: userLogin,
        token: token,
      })
    } catch (error) {
      return error
    }

  }
}
