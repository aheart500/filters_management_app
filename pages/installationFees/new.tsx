import { useMutation } from "@apollo/client";
import { useState } from "react";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { ADD_Fee } from "../../utils/Queries/Fees";
const WorkerForm = () => {
  const [data, setData] = useState({
    month: "",
    notes: "",
    price: "",
    year: "",
    workerId: "",
    customerId: "",
    numberOfWorkers: "",
    workerRatio: "",
  });
  const [loading, setLoading] = useState(false);
  const [add] = useMutation(ADD_Fee, {
    variables: {
      type: "Installing",
      ...data,
      month: parseInt(data.month),
      year: parseInt(data.year),
      price: parseFloat(data.price),
      numberOfWorkers: parseInt("" + data.numberOfWorkers),
      workerRatio: parseFloat("" + data.workerRatio),
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    if (data.workerId === "") {
      alert("برجاء إدخال كود الفني");
      return;
    }
    if (data.customerId === "") {
      alert("برجاء إدخال كود العميل");
      return;
    }
    if (data.price === "") {
      alert("برجاء إدخال المبلغ");
      return;
    }
    setLoading(true);
    add().then(({ data }) => {
      setLoading(false);
      window.location.replace(`/installationFees/${data.addFee.id}`);
    });
  };
  return (
    <main className={styles.main}>
      <Header
        title="إضافة عمولة تركيب جديدة"
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/installationFees" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[{ title: "حفظ البيانات", onClick: handleSave }]}
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

export default WorkerForm;
