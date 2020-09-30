import { useMutation } from "@apollo/client";
import { useState } from "react";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { ADD_REWARD } from "../../utils/Queries/Reward";
const WorkerForm = () => {
  const [data, setData] = useState({
    month: "",
    notes: "",
    price: "",
    year: "",
    workerId: "",
  });
  const [loading, setLoading] = useState(false);
  const [add] = useMutation(ADD_REWARD, {
    variables: {
      ...data,
      month: parseInt(data.month),
      year: parseInt(data.year),
      price: parseFloat(data.price),
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    if (data.workerId === "") {
      alert("برجاء إدخال كود الموظف");
      return;
    }
    if (data.price === "") {
      alert("برجاء إدخال المبلغ");
      return;
    }
    setLoading(true);
    add().then(({ data }) => {
      setLoading(false);
      window.location.replace(`/rewards/${data.addReward.id}`);
    });
  };
  return (
    <main className={styles.main}>
      <Header
        title="إضافة مكافأة جديدة"
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/rewards" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[{ title: "حفظ البيانات", onClick: handleSave }]}
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

export default WorkerForm;
