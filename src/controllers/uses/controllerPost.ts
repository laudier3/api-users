import { Request, Response } from "express";
import { prisma } from "../../prisma_Client_Orm/prismaClient";
import * as bcrypt from "bcrypt";

export class CreateUsers {
  async handle(req: Request, res: Response): Promise<any> {
    const { name, age, email, phone, access, image, password } = req.body;

    // Verifica se algum campo está ausente
    const requiredFields = { name, age, email, phone, access, image, password };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => value === undefined || value === null)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        msg: `Algum campo está faltando: ${missingFields.join(", ")}`
      });
    }

    // Verifica se algum campo está vazio
    const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => value.toString().trim() === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      return res.status(400).json({
        msg: `Os seguintes campos estão vazios: ${emptyFields.join(", ")}`
      });
    }

    // Verifica se algum campo é número (todos devem ser string)
    const numericFields = Object.entries(requiredFields)
      .filter(([_, value]) => typeof value === "number")
      .map(([key]) => key);

    if (numericFields.length > 0) {
      return res.status(400).json({
        msg: `Os seguintes campos estão em número, mas devem ser string: ${numericFields.join(", ")}`
      });
    }

    // Verifica se o e-mail já existe
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return res.status(409).json({
        msg: `O e-mail ${email} já está cadastrado. Tente outro!`
      });
    }

    // Criptografa a senha
    const cryptPass = await bcrypt.hash(password, 8);

    // Cria o usuário
    const createUser = await prisma.user.create({
      data: {
        name,
        age,
        email,
        phone,
        access,
        image,
        password: cryptPass
      }
    });

    return res.status(201).json({
      msg: "Usuário cadastrado com sucesso!",
      user: createUser
    });
  }
}
