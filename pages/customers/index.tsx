import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CUSTOMERS } from "../../utils/Queries/Customer";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { CustomerAttributes } from "../../server/Models/Customer";
let keysTranslated = (keys: Array<keyof CustomerAttributes>) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "الكود", width: "70px" };
            case "name":
              return { title: "الأسم", width: "150px" };
            case "phone":
              return { title: "الرقم", width: "150px" };
            case "load_date":
              return { title: "تاريخ التنزيل", width: "150px" };
            case "city":
              return { title: "القرية", width: "150px" };
            case "address":
              return { title: "العنوان", width: "500px" };
            case "state":
              return { title: "المحافظة", width: "150px" };
            case "payment_type":
              return { title: "نوع الدفع", width: "150px" };
            case "installments_number":
              return { title: "عدد الأقساط", width: "150px" };
            case "forward_payment":
              return { title: "المقدم", width: "150px" };
            case "installment_price":
              return { title: "القسط", width: "150px" };
            case "total_price":
              return { title: "السعر", width: "150px" };
            case "notes":
              return { title: "الملاحظات", width: "150px" };
            case "m1Id":
            case "m2Id":
            case "m3Id":
              return { title: "كود المندوب", width: "100px" };
            case "m1":
            case "m2":
            case "m3":
              return { title: "المندوب", width: "150px" };
            case "f1Id":
            case "f2Id":
            case "f3Id":
              return { title: "كود الفني", width: "100px" };
            case "f1":
            case "f2":
            case "f3":
              return { title: "الفني", width: "150px" };
          }
        })
        .filter((key) => key)
    : [];
};

const Customers = () => {
  const [search, setSearch] = useState("");
  const { data, loading, fetchMore } = useQuery<{
    customers: CustomerAttributes[];
  }>(GET_CUSTOMERS, { variables: { search } });

  let customers = data?.customers;
  const customerKeys =
    customers && customers[0]
      ? (Object.keys(customers[0]) as Array<keyof CustomerAttributes>)
      : [];
  const keys = keysTranslated(customerKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.customers[data.customers.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newCustomers = fetchMoreResult.customers;
        if (newCustomers.length === 0) return prev;
        return {
          customers: [...prev.customers, ...newCustomers],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="العملاء"
        search={{
          value: search,
          placeholder: "كود او اسم العميل",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة عميل جديد", link: "/customers/new" },
        ]}
      />

      {!loading && customers && (
        <Table
          data={customers}
          heads={keys}
          linkBeginning="/customers"
          loadMore={loadMore}
          noWrap={true}
        />
      )}
    </div>
  );
};

export default Customers;
