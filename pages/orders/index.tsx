import { useQuery } from "@apollo/client";
import { useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { OrderAttributes } from "../../server/Models/Order";
import { GET_ORDERS } from "../../utils/Queries/Order";
let keysTranslated = (keys: string[]) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "كود الأوردر", width: "70px" };
            case "day":
              return { title: "اليوم", width: "50px" };
            case "month":
              return { title: "الشهر", width: "50px" };
            case "year":
              return { title: "السنة", width: "50px" };
            case "notes":
              return { title: "ملاحظات", width: "200px" };
            case "city":
              return { title: "القرية", width: "70px" };
            case "installments":
              return { title: "عدد الوصولات", width: "70px" };
            case "workerId":
              return { title: "كود الموظف", width: "70px" };
            case "worker":
              return { title: "اسم الموظف", width: "100px" };
          }
        })
        .filter((key) => key)
    : [];
};

const Penalties = () => {
  const [search, setSearch] = useState("");
  const { data, loading, fetchMore } = useQuery<{
    orders: OrderAttributes[];
  }>(GET_ORDERS, { variables: { search } });

  let orders = data?.orders;
  const PenaltyKeys =
    orders && orders[0]
      ? (Object.keys(orders[0]) as Array<keyof OrderAttributes>)
      : [];
  const keys = keysTranslated(PenaltyKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.orders[data.orders.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newPenalties = fetchMoreResult.orders;
        if (newPenalties.length === 0) return prev;
        return {
          orders: [...prev.orders, ...newPenalties],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="الأوردرات"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة اوردر جديد", link: "/orders/new" },
        ]}
      />

      {!loading && orders && (
        <Table
          data={orders.map((order) => ({
            ...order,
            installments: order.installments.length,
          }))}
          heads={keys}
          linkBeginning="/orders"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Penalties;
