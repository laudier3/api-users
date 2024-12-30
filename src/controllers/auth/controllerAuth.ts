import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { prisma } from "../../prisma_Client_Orm/prismaClient";

type JwtPayload = {
  id: string
}

export class ControllerAuth {
  async handle(request: Request, response: Response, next: NextFunction):Promise<any>  {
    //const { password } = request.body;
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({ message: `Token invalido, você não esta autorizado para realizar essa operação, faça login e retorne aquii novamente!` })
      //return console.log("Token invalido, você não esta autorizado")
    }

    
    try {
      const token = authorization.split(' ')[1]
      //const token = request.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
      if (!token) {
        throw new Error('Authentication failed!');
      }
      const { id } = jwt.verify(token, process.env.APP_KEY ?? '') as JwtPayload
      //const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      const user = await prisma.user.findFirst({
        where: {
          id
        }
      })

      //return response.status(201).json({ message: `Usuario autorizado, acesso liberado`, user})
      next()
      
    } catch (err) {
      response.status(401).send({error: 'Token invalido!', err});
    }
    next()

    /*const user = await prisma.user.findFirst({
      where: {
        id
      }
    })

    if (!user) {
      return response.status(401).json({error: "Houve um erro"})
    }

    const { password: _, ...userLogin } = user

    return response.status(201).json({ message: `Usuario autorizado, acesso liberado`, userLogin })

    next()*/
  }
}
