import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Basics } from "../../server/Models";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";

import { BasicsQueryOptions } from "../../server/resolvers/Basics";
import { BasicsAttributes } from "../../server/Models/Basics";
import { DELETE_BASICS, UPDATE_BASICS } from "../../utils/Queries/Basics";

const CustomerForm = ({ penalty }: { penalty: BasicsAttributes | null }) => {
  let initialState = {};
  if (penalty) {
    for (let key in penalty) {
      initialState[key] = penalty[key] || "";
    }
  } else initialState = null;
  const [data, setData] = useState<Partial<BasicsAttributes> | null>(
    initialState
  );
  const [loading, setLoading] = useState(false);

  if (!penalty) return <div>كود خطأ</div>;
  const [update] = useMutation(UPDATE_BASICS, {
    variables: {
      ...data,
      month: parseInt("" + data.month),
      year: parseInt("" + data.year),
      price: parseFloat("" + data.price),
    },
  });
  const [deleteQuery] = useMutation(DELETE_BASICS, {
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
        window.location.replace("/basics");
      });
    }
  };
  return (
    <main className={styles.main}>
      <Header
        title={`الأساسي: ${penalty.id}`}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/basics" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[
          { title: "تحديث البيانات", onClick: () => handleMutation("update") },
          {
            title: "حذف الأساسي",
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
  let penalty = await Basics.findOne({
    where: {
      id: params.id,
    },
    include: BasicsQueryOptions.include,
    raw: true,
  });
  return {
    props: {
      penalty,
    },
  };
};

export default CustomerForm;
