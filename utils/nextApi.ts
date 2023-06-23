import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";

export function allowMethods(methods: string[], next: NextApiHandler): NextApiHandler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && !methods.includes(req.method)) {
      res.status(405).end();
      return;
    }
    next(req, res);
  }
}