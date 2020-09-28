import { useMutation } from "@apollo/client";
import { useState } from "react";
import { WorkerAttributes } from "../../server/Models/Worker";
import { ADD_WORKER } from "../../utils/Queries";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
const WorkerForm = () => {
  const [data, setData] = useState<Omit<WorkerAttributes, "id">>({
    address: "",
    name: "",
    hire_date: "",
    phone: "",
    marital_status: "",
  });
  const [loading, setLoading] = useState(false);
  const [addWorker] = useMutation(ADD_WORKER, { variables: data });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    if (data.name === "") {
      alert("برجاء إدخال الأسم");
      return;
    }
    setLoading(true);
    addWorker().then(({ data }) => {
      setLoading(false);
      window.location.replace(`/workers/${data.addWorker.id}`);
    });
  };
  return (
    <main className={styles.main}>
      <Header
        title="إضافة موظف جديد"
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/workers" },
        ]}
      />
      <Form
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[{ title: "حفظ البيانات", onClick: handleSave }]}
        fields={[
          {
            label: "الأسم",
            type: "text",
            props: {
              name: "name",
            },
          },
          {
            label: "رقم الهاتف",
            type: "text",
            props: {
              name: "phone",
            },
          },
          {
            label: "العنوان",
            type: "textarea",
            props: {
              name: "address",
            },
          },
          {
            label: "الحالة الإجتماعية",
            type: "text",
            props: {
              name: "marital_status",
            },
          },
          {
            label: "تاريخ التعيين",
            type: "date",
            props: {
              name: "hire_date",
            },
          },
        ]}
      />
    </main>
  );
};

export default WorkerForm;
