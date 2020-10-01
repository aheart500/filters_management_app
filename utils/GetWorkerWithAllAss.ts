import {
  Absence,
  Basics,
  Penalty,
  Reward,
  Customer,
  Worker,
  Borrow,
} from "../server/Models";
import { AbsenceAttributes } from "../server/Models/Absence";
import { BasicsAttributes } from "../server/Models/Basics";
import { BorrowAttributes } from "../server/Models/Borrow";
import { CustomerAttributes } from "../server/Models/Customer";
import InstallingFee from "../server/Models/InstallingFee";
import { PenaltyAttributes } from "../server/Models/Penalty";
import { RewardAttributes } from "../server/Models/Reward";
import SellingFee from "../server/Models/SellingFee";
import { WorkerAttributes } from "../server/Models/Worker";

export const getWorkerData = async (
  id: string | number,
  time?: { year: number; month: number }
) => {
  const worker = ((await Worker.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Absence,
        as: "absence",
        where: time,
        required: false,
      },
      {
        model: Reward,
        as: "rewards",
        where: time,
        required: false,
      },
      {
        model: Penalty,
        as: "penalties",
        where: time,
        required: false,
      },
      {
        model: Basics,
        as: "basics",
        where: time,
        required: false,
      },
      {
        model: Borrow,
        as: "borrows",
        where: time,
        required: false,
      },
      {
        model: SellingFee,
        as: "sellingFees",
        where: time,
        required: false,
      },
      {
        model: InstallingFee,
        as: "installingFees",
        where: time,
        required: false,
      },
      {
        model: Customer,
        as: "m1",
      },
      {
        model: Customer,
        as: "m2",
      },
      {
        model: Customer,
        as: "m3",
      },
      {
        model: Customer,
        as: "f1",
      },
      {
        model: Customer,
        as: "f2",
      },
      {
        model: Customer,
        as: "f3",
      },
    ],
  })) as unknown) as WorkerAttributes & { penalties: PenaltyAttributes[] } & {
    rewards: RewardAttributes[];
  } & { absence: AbsenceAttributes[] } & { basics: BasicsAttributes[] } & {
    borrows: BorrowAttributes[];
  } & { m1: CustomerAttributes[] } & { m2: CustomerAttributes[] } & {
    m3: CustomerAttributes[];
  } & { f1: CustomerAttributes[] } & { f2: CustomerAttributes[] } & {
    f3: CustomerAttributes[];
  };
  if (!worker) return null;
  const data: any = {
    id: worker.id,
    name: worker.name,
    penalties: [],
    absences: [],
    rewards: [],
    borrows: [],
    basics: [],
    customers: [],
  };
  worker.penalties.forEach((penalty) => {
    data.penalties.push({
      price: penalty.price,
    });
  });
  worker.rewards.forEach((reward) => {
    data.rewards.push({
      price: reward.price,
    });
  });
  worker.borrows.forEach((borrow) => {
    data.borrows.push({
      price: borrow.price,
    });
  });
  worker.basics.forEach((basic) => {
    data.basics.push({
      price: basic.price,
    });
  });
  worker.absence.forEach((absence) => {
    data.absences.push({
      late: absence.late_days,
      absent: absence.absence_days,
      total: absence.total_days,
      price: absence.price,
    });
  });
  worker.m1.forEach((one) => {
    data.customers.push({
      name: one.name,
      as: "m1",
    });
  });
  worker.m2.forEach((one) => {
    data.customers.push({
      name: one.name,
      as: "m2",
    });
  });
  worker.m3.forEach((one) => {
    data.customers.push({
      name: one.name,
      as: "m3",
    });
  });
  worker.f1.forEach((one) => {
    data.customers.push({
      name: one.name,
      as: "f1",
    });
  });
  worker.f2.forEach((one) => {
    data.customers.push({
      name: one.name,
      as: "f2",
    });
  });
  worker.f3.forEach((one) => {
    data.customers.push({
      name: one.name,
      as: "f3",
    });
  });
  return data;
};
