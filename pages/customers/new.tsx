import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CUSTOMER } from "../../utils/Queries/Customer";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { CustomerAttributes } from "../../server/Models/Customer";
const initialState = {
  address: "",
  city: "",
  f1Id: "",
  f2Id: "",
  f3Id: "",
  m1Id: "",
  m2Id: "",
  m3Id: "",
  forward_payment: "",
  installment_price: "",
  installments_number: "",
  load_date: "",
  name: "",
  notes: "",
  payment_type: "قسط",
  phone: "",
  state: "",
  total_price: "",
};

const CustomerForm = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [addCustomer] = useMutation(ADD_CUSTOMER, {
    variables: {
      ...data,
      forward_payment: parseFloat("" + data.forward_payment),
      installment_price: parseFloat("" + data.installment_price),
      total_price: parseFloat("" + data.total_price),
      installments_number: parseInt("" + data.installments_number),
      m1Id: parseInt("" + data.m1Id),
      m2Id: parseInt("" + data.m2Id),
      m3Id: parseInt("" + data.m3Id),
      f1Id: parseInt("" + data.f1Id),
      f2Id: parseInt("" + data.f2Id),
      f3Id: parseInt("" + data.f3Id),
    },
  });

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
    if (data.city === "") {
      alert("برجاء إدخال القرية ");
      return;
    }
    if (data.load_date === "") {
      alert("برجاء إدخال تاريخ التنزيل");
      return;
    }
    if (data.payment_type === "قسط" && data.installment_price === "") {
      alert("برجاء إدخال سعر القسط ");
      return;
    }
    if (data.payment_type === "قسط" && data.installments_number === "") {
      alert("برجاء إدخال عدد الأقساط");
      return;
    }
    setLoading(true);

    addCustomer().then(({ data }) => {
      alert("تم حفظ البيانات");
      setLoading(false);
      window.location.replace(`/customers/${data.addCustomer.id}`);
    });
  };
  return (
    <main className={styles.main + " " + styles.absolutee}>
      <Header
        title="إضافة عميل جديد"
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/customers" },
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
            label: "القرية",
            type: "text",
            props: {
              name: "city",
            },
          },
          {
            label: "المحافظة",
            type: "text",
            props: {
              name: "state",
            },
          },
          {
            label: "نوع الدفع",
            type: "select",
            props: {
              name: "payment_type",
              values: ["قسط", "كاش"],
            },
          },
          {
            label: "القسط",
            type: "number",
            props: {
              name: "installment_price",
            },
          },
          {
            label: "المقدم",
            type: "number",
            props: {
              name: "forward_payment",
            },
          },
          {
            label: "عدد الأقساط",
            type: "number",
            props: {
              name: "installments_number",
            },
          },
          {
            label: "السعر",
            type: "number",
            props: {
              name: "total_price",
            },
          },

          {
            label: "تاريخ التنزيل",
            type: "date",
            props: {
              name: "load_date",
            },
          },
          {
            label: "الملاحظات",
            type: "textarea",
            props: {
              name: "notes",
            },
          },
          {
            label: "كود المندوب 1",
            type: "worker",
            props: {
              name: "m1Id",
            },
          },
          {
            label: "كود المندوب 2",
            type: "worker",
            props: {
              name: "m2Id",
            },
          },
          {
            label: "كود المندوب 3",
            type: "worker",
            props: {
              name: "m3Id",
            },
          },
          {
            label: "كود الفني 1",
            type: "worker",
            props: {
              name: "f1Id",
            },
          },
          {
            label: "كود الفني 2",
            type: "worker",
            props: {
              name: "f2Id",
            },
          },
          {
            label: "كود الفني 3",
            type: "worker",
            props: {
              name: "f3Id",
            },
          },
        ]}
      />
    </main>
  );
};

export default CustomerForm;
