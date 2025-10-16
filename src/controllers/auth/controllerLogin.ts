import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { prisma } from "../../prisma_Client_Orm/prismaClient";

export class ControllerLogin {
  async handle(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    // Valida dados recebidos
    if (!email || !password) {
      return res.status(400).json({ msg: "E-mail e senha são obrigatórios!" });
    }

    // Busca usuário no banco
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ msg: "E-mail ou senha inválidos!" });
    }

    // Verifica senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "E-mail ou senha inválidos!" });
    }

    // Gera token JWT
    const token = jwt.sign({ id: user.id }, process.env.APP_KEY ?? "", {
      expiresIn: "8h",
    });

    // Remove a senha do objeto retornado
    const { password: _, ...userWithoutPassword } = user;

    try {
      // Envia token como cookie HTTP-only
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          maxAge: 8 * 60 * 60 * 1000, // 8 horas
        })
        .status(200)
        .json({
          msg: "Login efetuado com sucesso!",
          user: userWithoutPassword,
        });
    } catch (err) {
      console.error("Erro ao criar sessão:", err);
      res.status(500).json({ msg: "Erro ao criar sessão", error: err });
    }
  }
}
