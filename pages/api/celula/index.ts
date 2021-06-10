import type { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";
import prisma from "../../../utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, date } = req.body;

    const timestamp = Date.now();
    const selectedDate = new Date(timestamp);

    if (selectedDate.getDay() > 4) {
      selectedDate.setDate(
        selectedDate.getDate() + (7 - selectedDate.getDay())
      );
    } else if (selectedDate.getDay() < 4) {
      selectedDate.setDate(
        selectedDate.getDate() + (4 - selectedDate.getDay())
      );
    }
    const scheduled_to = `${selectedDate.getDate()}/${
      selectedDate.getMonth() + 1
    }/${selectedDate.getFullYear()}`;

    //     const celulaRepository = getRepository(Celula);

    const data = { name, scheduled_to };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome é um campo obrigatório").max(60),
      scheduled_to: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const availability = await prisma.celula.findMany({
      where: { scheduled_to: date },
    });

    //     const maxCapacityRepository = getRepository(MaxCapacity);

    const { max_capacity } = await prisma.maxCapacity.findUnique({
      where: { event: "celula" },
    });

    if (availability.length >= max_capacity) {
      return res.status(406).json({ message: "Maximum capacity reached" });
    }

    const celula = await prisma.celula.create({ data });

    return res.status(201).json({
      id: celula.id,
      name: celula.name,
      scheduled_to: celula.scheduled_to,
    });
  } else {
    console.log(req.method);
  }
};
