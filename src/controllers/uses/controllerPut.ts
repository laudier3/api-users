import { Request, Response } from "express";
import { prisma } from "../../prisma_Client_Orm/prismaClient";
import * as bcrypt from "bcrypt"

export class PutProducts {
  async handle(request: Request, response: Response) {
    const {
      id,
      email,
      phone,
      password,
      name,
      age,
      access,
      image
    } = request.body;

    const cryptPass = await bcrypt.hash(password, 8)

    if (
      typeof id === 'number' ||
      typeof password === 'number' ||
      typeof name === 'number' ||
      typeof email === 'number' ||
      typeof age === 'number' ||
      typeof access === 'number' ||
      typeof phone === 'number' ||
      typeof image === 'number'
    ) {
      return response.status(500).json({
        msg: `Algum campo esta faltando ou estão em números! Lembre-se que, todos os campos tem que estar em string ok!  Ou você não passo o id correto.`
      })
    }

    if (
      typeof id === 'undefined' ||
      typeof name === 'undefined' ||
      typeof email === 'undefined' ||
      typeof age === 'undefined' ||
      typeof password === 'undefined' ||
      typeof name === 'undefined' ||
      typeof access === 'undefined' ||
      typeof phone === 'undefined' ||
      typeof image === 'undefined'
    ) {
      return response.status(500).json({
        msg: `Algum campo esta faltando! E lembre-se que todos os campos tem que ser string ok!`
      })
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        age,
        access,
        phone,
        image,
        email,
        password: cryptPass
      }
    })

    try {
      return response.status(201).json(user)
    } catch (error) {
      throw new Error(`Você não pode usar esse email: ${email}! porque ele ja esta sendo usado por outro usuario, se for seu entre na conta!.`)
    }
  }
}