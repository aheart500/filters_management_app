import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import Order, { OrderAttributes } from "../../server/Models/Order";
import { DELETE_ORDER, UPDATE_ORDER } from "../../utils/Queries/Order";
import { Customer, Fix, Installment, Worker } from "../../server/Models";
import InstallmentsTable from "../../components/InstallmentsTable";
import FixesTable from "../../components/FixesTable";

import {
  UPDATE_FIXES,
  UPDATE_INSTALLMENTS,
} from "../../utils/Queries/Customer";

const CustomerForm = ({ order }: { order: OrderAttributes | null }) => {
  let initialState = {};
  if (order) {
    for (let key in order) {
      initialState[key] = order[key] || "";
    }
  } else initialState = null;
  const [data, setData] = useState<Partial<OrderAttributes> | null>(
    initialState
  );
  const [loading, setLoading] = useState(false);
  if (!order) return <div>كود خطأ</div>;
  const [update] = useMutation(UPDATE_ORDER, {
    variables: {
      ...data,
      year: parseInt("" + data.year),
    },
  });
  const [deleteQuery] = useMutation(DELETE_ORDER, {
    variables: { id: order.id },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleMutation = (type: "update" | "delete") => {
    if (type === "update") {
      if (data.workerId.toString() === "") {
        alert("برجاء إدخال كود الموظف");
        return;
      }
      setLoading(true);
      update().then(() => {
        alert("تم تحديث البيانات");
        setLoading(false);
      });
    } else {
      setLoading(true);
      deleteQuery().then(() => {
        setLoading(false);
        window.location.replace("/orders");
      });
    }
  };
  const [paidInstallments, setPaidInstallments] = useState(
    order.installments
      ?.filter((installment) => installment.paid)
      .map((installment) => installment.id.toString())
  );
  const [doneFixes, setDoneFixes] = useState(
    order.fixes?.filter((fix) => fix.done).map((fix) => fix.id.toString())
  );
  const isSelectedFix = (id: any) => doneFixes.includes(id.toString());
  const [updateFixes] = useMutation(UPDATE_FIXES);
  const handleSelectFix = (fix: any, done: boolean) => {
    updateFixes({ variables: { ids: [fix.id], done } }).then(() => {
      if (done) {
        setDoneFixes(doneFixes.concat(fix.id.toString()));
      } else {
        setDoneFixes(doneFixes.filter((id) => id !== fix.id.toString()));
      }
    });
  };
  const isSelectedInst = (id: any) => paidInstallments.includes(id.toString());
  const [updateInstallments] = useMutation(UPDATE_INSTALLMENTS);
  const handleSelectInst = (installment: any, paid: boolean) => {
    updateInstallments({ variables: { ids: [installment.id], paid } }).then(
      () => {
        if (paid) {
          setPaidInstallments(
            paidInstallments.concat(installment.id.toString())
          );
        } else {
          setPaidInstallments(
            paidInstallments.filter((id) => id !== installment.id.toString())
          );
        }
      }
    );
  };
  const payAll = () => {
    updateInstallments({
      variables: {
        ids: order.installments.map((installment) => installment.id),
        paid: true,
      },
    }).then(() => {
      setPaidInstallments(
        order.installments.map((installment) => installment.id.toString())
      );
    });
  };
  const doAll = () => {
    updateFixes({
      variables: {
        ids: order.fixes.map((fix) => fix.id),
        done: true,
      },
    }).then(() => {
      setDoneFixes(order.fixes.map((fix) => fix.id.toString()));
    });
  };
  const RenderedInstTable = () => {
    if (order.installments.length === 0) return <label>لا توجد أقساط</label>;
    return (
      <>
        <InstallmentsTable
          data={order.installments || []}
          withSelet={{
            type: "pay",
            handleSelectedInst: handleSelectInst,
            isSelectedInst,
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>
            مجموع تحصيل الأقساط: {"    "}
            {order.installments.reduce(
              (t, n) => t + n.customer.installment_price,
              0
            )}
            {"   "}
            جنيه
          </h3>
          <button
            className="w3-button w3-round-large w3-hover-teal w3-green"
            style={{ margin: "0 1rem", padding: "0 10px" }}
            onClick={payAll}
          >
            <h4>إتمام جميع الأقساط</h4>
          </button>
        </div>
      </>
    );
  };
  const RenderedFixTable = () => {
    if (order.fixes.length === 0) return <label>لا توجد صيانات</label>;
    return (
      <>
        <FixesTable
          data={order.fixes || []}
          withSelet={{
            type: "pay",
            handleSelectedFix: handleSelectFix,
            isSelectedFix,
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>
            مجموع تحصيل الصيانات: {"    "}
            {order.fixes.reduce((t, n) => t + n.price, 0)}
            {"   "}
            جنيه
          </h3>
          <button
            className="w3-button w3-round-large w3-hover-teal w3-green"
            style={{ margin: "0 1rem", padding: "0 10px" }}
            onClick={doAll}
          >
            <h4>إتمام جميع الصيانات</h4>
          </button>
        </div>
      </>
    );
  };
  return (
    <main className={styles.main}>
      <Header
        title={`الطلب: ${order.id}`}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/orders" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[
          { title: "تحديث البيانات", onClick: () => handleMutation("update") },
          {
            title: "حذف الطلب",
            onClick: () => handleMutation("delete"),
            className: "w3-red",
          },
        ]}
        fields={[
          {
            label: "كود الموظف",
            type: "worker",
            props: {
              name: "workerId",
            },
          },
          {
            label: "القرية",
            type: "text",
            props: {
              name: "city",
              disabled: true,
            },
          },
          {
            label: "اليوم",
            type: "number",
            props: {
              name: "day",
              disabled: true,
            },
          },
          {
            label: "الشهر",
            type: "number",
            props: {
              name: "month",
              disabled: true,
            },
          },
          {
            label: "السنة",
            type: "number",
            props: {
              name: "year",
              disabled: true,
            },
          },
          {
            label: "الأقساط",
            type: "component",
            props: {
              value: RenderedInstTable(),
            },
          },
          {
            label: "الصيانات",
            type: "component",
            props: {
              value: RenderedFixTable(),
            },
          },
          {
            label: "ملاحظات",
            type: "textarea",
            props: {
              name: "notes",
            },
          },
        ]}
      />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let order: any = await Order.findOne({
    where: {
      id: params.id,
    },
    include: [
      {
        model: Worker,
        as: "worker",
      },
      {
        model: Fix,
        as: "fixes",
        include: [
          {
            model: Customer,
            as: "customer",
            include: [
              {
                model: Fix,
                as: "fixes",
              },
            ],
          },
        ],
      },
      {
        model: Installment,
        as: "installments",
        include: [
          {
            model: Customer,
            as: "customer",
            include: [
              {
                model: Installment,
                as: "installments",
              },
            ],
          },
        ],
      },
    ],
  }).then((response) => response.toJSON());

  return {
    props: {
      order,
    },
  };
};

export default CustomerForm;
