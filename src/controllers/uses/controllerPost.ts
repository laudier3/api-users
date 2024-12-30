import { Request, Response } from "express";
import { prisma } from "../../prisma_Client_Orm/prismaClient";
import * as bcrypt from "bcrypt"

export class CreateProducts {
    async handle(req: Request, res: Response):Promise<any> {

        const {
            name,
            age,
            email,
            phone,
            access,
            image,
            password

        } = req.body

        if (
     
            typeof password === 'number' ||
            typeof name === 'number' ||
            typeof email === 'number' ||
            typeof phone === 'number' ||
            typeof age === 'number' ||
            typeof image === 'number' ||
            typeof access === 'number'
          ){
            return ({
              msg: `Algum campo estar em número! Lembre-se que, todos os campos tem estar em string ok!`
            })
          }
      
          if (
            typeof phone === 'undefined' ||
            typeof age === 'undefined' ||
            typeof password === 'undefined' ||
            typeof name === 'undefined' ||
            typeof access === 'undefined' ||
            typeof image === 'undefined' ||
            typeof email === 'undefined'
          ) {
            return ({
              msg: `Algum campo esta faltando! Verifique novamente!`
            })
          }
      
          const userExists = await prisma.user.findUnique({
            where: {
              email
            }
          })
      

        const cryptPass = await bcrypt.hash(password, 8)

        const createProducts = await prisma.user.create({
            data: {
                name,
                age,
                email,
                phone,
                access,
                image,
                password: cryptPass

            }
        })

        console.log(createProducts.name)

        return res.status(201).json({msg: "Usuario cadastrado com sucesso!", createProducts})
    }
}