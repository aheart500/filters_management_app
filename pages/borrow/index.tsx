import { useQuery } from "@apollo/client";
import { useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { BorrowAttributes } from "../../server/Models/Borrow";
import { GET_BORROWS } from "../../utils/Queries/Borrow";
let keysTranslated = (keys: string[]) => {
  return keys
    ? keys
        .map((key) => {
          switch (key) {
            case "id":
              return { title: "الكود", width: "70px" };
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
    borrows: BorrowAttributes[];
  }>(GET_BORROWS, { variables: { search } });

  let borrows = data?.borrows;
  const PenaltyKeys =
    borrows && borrows[0]
      ? (Object.keys(borrows[0]) as Array<keyof BorrowAttributes>)
      : [];
  const keys = keysTranslated(PenaltyKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.borrows[data.borrows.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newPenalties = fetchMoreResult.borrows;
        if (newPenalties.length === 0) return prev;
        return {
          borrows: [...prev.borrows, ...newPenalties],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="السلف"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة سلف جديد", link: "/borrow/new" },
        ]}
      />

      {!loading && borrows && (
        <Table
          data={borrows}
          heads={keys}
          withoutId={true}
          linkBeginning="/borrow"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Penalties;
