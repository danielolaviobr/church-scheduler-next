import type { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import prisma from "../../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { date } = req.query as { [key: string]: string };

  const re = /\-/gi;

  const celula = await prisma.celula.findMany({
    where: { scheduled_to: date.replace(re, "/") },
  });

  return res.json(celula);
};
