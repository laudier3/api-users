import { Request, Response } from 'express'

export class Logout {
    async handle(request: Request, response: Response): Promise<any> {
        try {
            
            // Limpa o cookie HttpOnly
            response.clearCookie('token', {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            })
            response.status(200).json({ msg: 'Logout realizado com sucesso!' })
          } catch (err) {
            response.status(500).json({ msg: 'Erro ao deslogar', error: err })
          }
    }
}