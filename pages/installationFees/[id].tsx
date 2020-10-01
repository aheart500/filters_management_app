import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { InstallingFee } from "../../server/Models";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { FeeQueryOptions } from "../../server/resolvers/Fees";
import { DELETE_FEE, UPDATE_FEE } from "../../utils/Queries/Fees";
import { InstallingFeeAttributes } from "../../server/Models/InstallingFee";

const CustomerForm = ({
  penalty,
}: {
  penalty: InstallingFeeAttributes | null;
}) => {
  let initialState = {};
  if (penalty) {
    for (let key in penalty) {
      initialState[key] = penalty[key] || "";
    }
  } else initialState = null;
  const [data, setData] = useState<Partial<InstallingFeeAttributes> | null>(
    initialState
  );
  const [loading, setLoading] = useState(false);

  if (!penalty) return <div>كود خطأ</div>;
  const [update] = useMutation(UPDATE_FEE, {
    variables: {
      type: "Installing",
      ...data,
      month: parseInt("" + data.month),
      year: parseInt("" + data.year),
      numberOfWorkers: parseInt("" + data.numberOfWorkers),
      workerRatio: parseFloat("" + data.workerRatio),
      price: parseFloat("" + data.price),
    },
  });
  const [deleteQuery] = useMutation(DELETE_FEE, {
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
        alert("برجاء إدخال كود الفني");
        return;
      }
      if (data.customerId.toString() === "") {
        alert("برجاء إدخال كود العميل");
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
        window.location.replace("/installationFees");
      });
    }
  };
  return (
    <main className={styles.main}>
      <Header
        title={`عمولة التركيب: ${penalty.id}`}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/installationFees" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[
          { title: "تحديث البيانات", onClick: () => handleMutation("update") },
          {
            title: "حذف العمولة",
            onClick: () => handleMutation("delete"),
            className: "w3-red",
          },
        ]}
        fields={[
          {
            label: "كود الفني",
            type: "worker",
            props: {
              name: "workerId",
            },
          },
          {
            label: "كود العميل",
            type: "customer",
            props: {
              name: "customerId",
            },
          },
          {
            label: "عدد الفنيين",
            type: "number",
            props: {
              name: "numberOfWorkers",
            },
          },
          {
            label: "نسبة الفني",
            type: "number",
            props: {
              name: "workerRatio",
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
  let penalty = await InstallingFee.findOne({
    where: {
      id: params.id,
    },
    include: FeeQueryOptions.include,
    raw: true,
  });
  return {
    props: {
      penalty,
    },
  };
};

export default CustomerForm;
