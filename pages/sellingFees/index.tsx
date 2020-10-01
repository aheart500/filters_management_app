import { useQuery } from "@apollo/client";
import { useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { InstallingFeeAttributes } from "../../server/Models/InstallingFee";
import { GET_FEES } from "../../utils/Queries/Fees";

let keysTranslated = (keys: string[]) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "الكود", width: "70px" };
            case "month":
              return { title: "الشهر", width: "50px" };
            case "year":
              return { title: "السنة", width: "50px" };
            case "notes":
              return { title: "ملاحظات", width: "200px" };
            case "price":
              return { title: "المبلغ", width: "100px" };
            case "workerId":
              return { title: "كود المندوب", width: "70px" };
            case "worker":
              return { title: "اسم المندوب", width: "150px" };
            case "customerId":
              return { title: "كود العميل", width: "70px" };
            case "customer":
              return { title: "اسم العميل", width: "150px" };
            case "numberOfWorkers":
              return { title: "عدد المناديب المشتركين", width: "200px" };
            case "workerRatio":
              return { title: "نسبة المندوب", width: "150px" };
          }
        })
        .filter((key) => key)
    : [];
};

const Penalties = () => {
  const [search, setSearch] = useState("");
  const { data, loading, fetchMore } = useQuery<{
    fees: InstallingFeeAttributes[];
  }>(GET_FEES, { variables: { search, type: "Selling" } });

  let fees = data?.fees;
  const PenaltyKeys =
    fees && fees[0]
      ? (Object.keys(fees[0]) as Array<keyof InstallingFeeAttributes>)
      : [];
  const keys = keysTranslated(PenaltyKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.fees[data.fees.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newPenalties = fetchMoreResult.fees;
        if (newPenalties.length === 0) return prev;
        return {
          fees: [...prev.fees, ...newPenalties],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="عمولات البيع"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة عمولة بيع جديدة", link: "/sellingFees/new" },
        ]}
      />

      {!loading && fees && (
        <Table
          data={fees}
          heads={keys}
          withoutId={true}
          linkBeginning="/sellingFees"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Penalties;
