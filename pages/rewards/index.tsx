import { useQuery } from "@apollo/client";
import { useState } from "react";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { RewardAttributes } from "../../server/Models/Reward";
import { GET_REWARDS } from "../../utils/Queries/Reward";

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
    rewards: RewardAttributes[];
  }>(GET_REWARDS, { variables: { search } });

  let rewards = data?.rewards;
  const PenaltyKeys =
    rewards && rewards[0]
      ? (Object.keys(rewards[0]) as Array<keyof RewardAttributes>)
      : [];
  const keys = keysTranslated(PenaltyKeys);
  const loadMore = () => {
    fetchMore({
      variables: { offset: data.rewards[data.rewards.length - 1].id },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newPenalties = fetchMoreResult.rewards;
        if (newPenalties.length === 0) return prev;
        return {
          rewards: [...prev.rewards, ...newPenalties],
        };
      },
    });
  };
  return (
    <div>
      <Header
        title="المكافآت"
        search={{
          value: search,
          placeholder: "كود او اسم الموظف",
          onChange: (e) => setSearch(e.target.value),
        }}
        buttons={[
          { title: "الصفحة الرئيسية", link: "/" },
          { title: "إضافة مكافأة جديدة", link: "/rewards/new" },
        ]}
      />

      {!loading && rewards && (
        <Table
          data={rewards}
          heads={keys}
          withoutId={true}
          linkBeginning="/rewards"
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Penalties;
