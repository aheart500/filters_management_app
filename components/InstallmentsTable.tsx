interface InstallmentsTableProps {
  data: any[];
  withSelet?: {
    handleSelected: (data: any, state?: boolean) => void;
    isSelected: (id: string) => boolean;
    type?: "pay" | "select";
  };
}
const InstallmentsTable = ({ data, withSelet }: InstallmentsTableProps) => {
  const ColumnToSelect = ({ row }) => {
    return (
      <td className="centerr">
        <input
          type="checkbox"
          className="w3-check"
          checked={withSelet.isSelected(row.id)}
          onChange={(e) => withSelet.handleSelected(row, e.target.checked)}
        />
      </td>
    );
  };
  return (
    <table className="w3-table-all w3-hoverable custom-table installments-table">
      <thead>
        <tr className="w3-red">
          {withSelet && !withSelet.type && (
            <th className="centerr">قم بالتحديد</th>
          )}
          <th>اسم العميل</th>
          <th>قيمة القسط</th>
          <th>العنوان</th>
          {withSelet && withSelet.type === "pay" && (
            <th className="centerr">تم الدفع؟</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row.id}>
              {withSelet && !withSelet.type && <ColumnToSelect row={row} />}
              <td>{row.customer.name}</td>
              <td>{row.customer.installment_price}</td>
              <td>{row.customer.address}</td>
              {withSelet && withSelet.type === "pay" && (
                <ColumnToSelect row={row} />
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InstallmentsTable;
