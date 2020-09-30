import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Absence } from "../../server/Models";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { AbsenceQueryOptions } from "../../server/resolvers/Absence";
import { AbsenceAttributes } from "../../server/Models/Absence";
import { DELETE_ABSENCE, UPDATE_ABSENCE } from "../../utils/Queries/Absence";

const CustomerForm = ({ penalty }: { penalty: AbsenceAttributes | null }) => {
  let initialState = {};
  if (penalty) {
    for (let key in penalty) {
      initialState[key] = penalty[key] || "";
    }
  } else initialState = null;
  const [data, setData] = useState<Partial<AbsenceAttributes> | null>(
    initialState
  );
  const [loading, setLoading] = useState(false);

  if (!penalty) return <div>كود خطأ</div>;
  const [update] = useMutation(UPDATE_ABSENCE, {
    variables: {
      ...data,
      absence_days: parseInt("" + data.absence_days),
      total_days: parseInt("" + data.total_days),
      late_days: parseInt("" + data.late_days),
      month: parseInt("" + data.month),
      year: parseInt("" + data.year),
      price: parseFloat("" + data.price),
    },
  });
  const [deleteQuery] = useMutation(DELETE_ABSENCE, {
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
        window.location.replace("/absence");
      });
    }
  };
  return (
    <main className={styles.main}>
      <Header
        title={`الغياب: ${penalty.id}`}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/absence" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[
          { title: "تحديث البيانات", onClick: () => handleMutation("update") },
          {
            title: "حذف الغياب",
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
            label: "أيام الغياب",
            type: "number",
            props: {
              name: "absence_days",
            },
          },
          {
            label: "ايام التأخير",
            type: "number",
            props: {
              name: "late_days",
            },
          },
          {
            label: "إجمالي الأيام",
            type: "number",
            props: {
              name: "total_days",
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
  let penalty = await Absence.findOne({
    where: {
      id: params.id,
    },
    include: AbsenceQueryOptions.include,
    raw: true,
  });
  return {
    props: {
      penalty,
    },
  };
};

export default CustomerForm;
