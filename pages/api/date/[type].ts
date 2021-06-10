import type { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import prisma from "../../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const timestamp = Date.now();
  const selectedDate = new Date(timestamp);
  const { type } = req.query;
  if (type === "celula") {
    if (selectedDate.getDay() > 4) {
      selectedDate.setDate(
        selectedDate.getDate() + (7 - selectedDate.getDay())
      );
    } else if (selectedDate.getDay() < 4) {
      selectedDate.setDate(
        selectedDate.getDate() + (4 - selectedDate.getDay())
      );
    }

    const nextCelula = `${selectedDate.getDate()}/${
      selectedDate.getMonth() + 1
    }/${selectedDate.getFullYear()}`;

    return res.status(200).json({ date: nextCelula });
  } else if (type === "galeria") {
    //     const galeriaRepository = getRepository(Galeria);
    //     const galeria = await galeriaRepository.findOneOrFail({
    //       where: [{ selected: true }],
    //     });

    //     const { scheduled_to } = galeria;

    return res.status(200).json({});
  }
};
