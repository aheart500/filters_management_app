import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_PENALTIES } from "../../utils/Queries/Penalties";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { PenaltyAttributes } from "../../server/Models/Penalty";
let keysTranslated = (keys: string[]) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "الكود", width: "70px" };
            case "days":
              return { title: "أيام الجزاء", width: "150px" };
            case "month":
              return { title: "الشهر", width: "50px" };
            case "year":
              return { title: "السنة", width: "50px" };
            case "notes":
              return { title: "ملاحظات", width: "200px" };
            case "price":
              return { title: "المبلغ", width: "100px" };
            case "workerId":
              return { title: "كود الموظف", width: "70px" };
            case "worker":
              return { title: "اسم الموظف", width: "150px" };
          }
        })
        .filter((key) => key)
    : [];
};

const Penalties = () => {
  const [search, setSearch] = useState("");
  const { data, loading, fetchMore } = useQuery<{
    penalties: PenaltyAttributes[];
  }>(GET_PENALTIES, { variables: { search } });

  let penalties = data?.penalties;
  const PenaltyKeys =
    penalties && penalties[0]
      ? (Object.keys(penalties[0]) as Array<keyof PenaltyAttributes>)
      : [];
  const keys = keysTranslated(PenaltyKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.penalties[data.penalties.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newPenalties = fetchMoreResult.penalties;
        if (newPenalties.length === 0) return prev;
        return {
          penalties: [...prev.penalties, ...newPenalties],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="الجزاءات"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة جزاء جديد", link: "/penalties/new" },
        ]}
      />

      {!loading && penalties && (
        <Table
          data={penalties}
          heads={keys}
          withoutId={true}
          linkBeginning="/penalties"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Penalties;
