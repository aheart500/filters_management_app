import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { FeeQueryOptions } from "../../server/resolvers/Fees";
import { DELETE_FEE, UPDATE_FEE } from "../../utils/Queries/Fees";
import SellingFee, {
  SellingFeeAttributes,
} from "../../server/Models/SellingFee";

const CustomerForm = ({
  penalty,
}: {
  penalty: SellingFeeAttributes | null;
}) => {
  let initialState = {};
  if (penalty) {
    for (let key in penalty) {
      initialState[key] = penalty[key] || "";
    }
  } else initialState = null;
  const [data, setData] = useState<Partial<SellingFeeAttributes> | null>(
    initialState
  );
  const [loading, setLoading] = useState(false);

  if (!penalty) return <div>كود خطأ</div>;
  const [update] = useMutation(UPDATE_FEE, {
    variables: {
      type: "Selling",
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
        alert("برجاء إدخال كود المندوب");
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
        window.location.replace("/sellingFees");
      });
    }
  };
  return (
    <main className={styles.main}>
      <Header
        title={`عمولة البيع: ${penalty.id}`}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/sellingFees" },
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
            label: "كود المندوب",
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
            label: "عدد المناديب",
            type: "number",
            props: {
              name: "numberOfWorkers",
            },
          },
          {
            label: "نسبة المندوب",
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
  let penalty = await SellingFee.findOne({
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
