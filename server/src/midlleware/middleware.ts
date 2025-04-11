import { Request, Response } from "express";
const jwt = require('jsonwebtoken'); 

const isValid = (req:Request, res:Response, next:any) => {
    try {
      const token = req.headers.authorization?.split('Bearer ')[1];
      const decodedToken = jwt.verify(token, 'jahBless');
      const id = parseInt(decodedToken.id);
      
      if (!id) {
        res.status(403).json('Invalid user');
      } else {
        next();
      }
    } catch {
      res.status(401).json('Invalid request!');
    }
}

export {
  isValid,
}