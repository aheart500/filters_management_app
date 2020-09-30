import { useMutation } from "@apollo/client";
import { useState } from "react";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { ADD_BORROW } from "../../utils/Queries/Borrow";
const WorkerForm = () => {
  const [data, setData] = useState({
    month: "",
    notes: "",
    price: "",
    year: "",
    workerId: "",
  });
  const [loading, setLoading] = useState(false);
  const [add] = useMutation(ADD_BORROW, {
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
      window.location.replace(`/borrow/${data.addBorrow.id}`);
    });
  };
  return (
    <main className={styles.main}>
      <Header
        title="إضافة سلف جديد"
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/borrow" },
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
