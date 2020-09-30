import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Penalty } from "../../server/Models";

import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { PenaltiesQueryOptions } from "../../server/resolvers/Penalties";
import { PenaltyAttributes } from "../../server/Models/Penalty";
import { DELETE_PENALTY, UPDATE_PENALTY } from "../../utils/Queries/Penalties";

const CustomerForm = ({ penalty }: { penalty: PenaltyAttributes | null }) => {
  let initialState = {};
  if (penalty) {
    for (let key in penalty) {
      initialState[key] = penalty[key] || "";
    }
  } else initialState = null;
  const [data, setData] = useState<Partial<PenaltyAttributes> | null>(
    initialState
  );
  const [loading, setLoading] = useState(false);

  if (!penalty) return <div>كود خطأ</div>;
  const [update] = useMutation(UPDATE_PENALTY, {
    variables: {
      ...data,
      days: parseInt("" + data.days),
      month: parseInt("" + data.month),
      year: parseInt("" + data.year),
      price: parseFloat("" + data.price),
    },
  });
  const [deleteQuery] = useMutation(DELETE_PENALTY, {
    variables: { id: penalty.id },
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
        window.location.replace("/penalties");
      });
    }
  };
  return (
    <main className={styles.main}>
      <Header
        title={`الجزاء: ${penalty.id}`}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/penalties" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[
          { title: "تحديث البيانات", onClick: () => handleMutation("update") },
          {
            title: "حذف الجزاء",
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
            label: "الأيام",
            type: "number",
            props: {
              name: "days",
            },
          },
          {
            label: "الشهر",
            type: "number",
            props: {
              name: "month",
            },
          },
          {
            label: "السنة",
            type: "number",
            props: {
              name: "year",
            },
          },
          {
            label: "المبلغ",
            type: "number",
            props: {
              name: "price",
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
  let penalty = await Penalty.findOne({
    where: {
      id: params.id,
    },
    include: PenaltiesQueryOptions.include,
    raw: true,
  });
  return {
    props: {
      penalty,
    },
  };
};

export default CustomerForm;
