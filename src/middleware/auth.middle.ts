import { NextFunction, Request, Response } from "express";
import { extractToken } from "../services/token.service";





export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        role_id: string;
    };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        
        if (!token) {
            return res.status(400).json({ error: "Token not provided" });
        }
        
        const verificationResponse = await extractToken(token);
        
        if (typeof verificationResponse === 'string') {
            return res.status(401).json({ error: verificationResponse });
        }
        
        if ('error' in verificationResponse) {
            return res.status(500).json({ error: verificationResponse.error });
        }
        
        req.user = {
            id: verificationResponse.id,
            role_id: verificationResponse.role_id
        };
        
        next();
    } catch (error: any) {
        console.error('Error in authMiddleware:', error);
        return res.status(500).json({ error: error.message });
    }
};
