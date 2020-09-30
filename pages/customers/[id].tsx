import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Customer } from "../../server/Models";
import { CustomerAttributes } from "../../server/Models/Customer";
import { DELETE_CUSTOMER, UPDATE_CUSTOMER } from "../../utils/Queries/Customer";
import styles from "../../styles/form.module.css";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { CustomerModelQuery } from "../../server/resolvers/Customers";

const CustomerForm = ({
  customer,
}: {
  customer: CustomerAttributes | null;
}) => {
  let initialState = {};
  if (customer) {
    for (let key in customer) {
      if (key === "payment_type") {
        initialState[key] = customer[key] || "قسط";
      } else if (["m1", "m2", "m3", "f1", "f2", "f3"].includes(key)) {
        continue;
      } else {
        initialState[key] = customer[key] || "";
      }
    }
  } else initialState = null;
  const [data, setData] = useState<Partial<CustomerAttributes> | null>(
    initialState
  );
  const [loading, setLoading] = useState(false);

  if (!customer) return <div>كود خطأ</div>;
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
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
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    variables: { id: customer.id },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleMutation = (type: "update" | "delete") => {
    if (data.name === "") {
      alert("برجاء إدخال الأسم");
      return;
    }
    setLoading(true);
    if (type === "update") {
      updateCustomer().then(() => {
        alert("تم تحديث البيانات");
        setLoading(false);
      });
    } else {
      deleteCustomer().then(() => {
        setLoading(false);
        window.location.replace("/customers");
      });
    }
  };
  return (
    <main className={styles.main + " " + styles.absolutee}>
      <Header
        title={`العميل: ${customer.name}`}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: " القائمة", link: "/customers" },
        ]}
      />
      <Form
        header={`كود العميل: ${customer.id}`}
        data={data}
        loading={loading}
        handleChange={handleChange}
        buttons={[
          { title: "تحديث البيانات", onClick: () => handleMutation("update") },
          {
            title: "حذف العميل",
            onClick: () => handleMutation("delete"),
            className: "w3-red",
          },
        ]}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let customer = await Customer.findOne({
    where: {
      id: params.id,
    },
    include: CustomerModelQuery.include,
    raw: true,
  });
  return {
    props: {
      customer,
    },
  };
};

export default CustomerForm;
