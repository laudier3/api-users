import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.cookies?.token

    if (!token) {
      res.status(401).json({ msg: 'Token não encontrado. Faça login novamente.' })
      return
    }

    const decoded = jwt.verify(token, process.env.APP_KEY ?? '') as { id: string }
    ;(req as any).userId = decoded.id

    // 🔹 Opcional: log bonito no terminal
    console.log(`✅ Token verificado com sucesso → userId: ${decoded.id}`)

    next()
  } catch (err) {
    console.error('❌ Erro ao verificar token:', err)
    res.status(401).json({ msg: 'Token inválido ou expirado.' })
  }
}
