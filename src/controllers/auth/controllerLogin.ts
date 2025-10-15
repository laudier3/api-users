import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { prisma } from "../../prisma_Client_Orm/prismaClient";

export class ControllerLogin {
  async handle(request: Request, response: Response): Promise<any> {
    const { email, password } = request.body;

    // Busca usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return response.status(404).json({ msg: "E-mail ou senha inválidos!" });
    }

    // Verifica senha
    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      return response.status(404).json({ msg: "E-mail ou senha inválidos!" });
    }

    // Gera token JWT
    const token = jwt.sign({ id: user.id }, process.env.APP_KEY ?? '', {
      expiresIn: '8h',
    });

    const { password: _, ...userLogin } = user;

    try {
      // Envia token como cookie HTTP-only
      response
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict', // <-- minúsculo
          maxAge: 8 * 60 * 60 * 1000, // 8 horas
        })
        .status(202)
        .json({
          msg: "Login efetuado com sucesso!",
          user: userLogin,
        });
    } catch (error) {
      return response.status(500).json({ msg: "Erro ao criar sessão", error });
    }
  }
}
