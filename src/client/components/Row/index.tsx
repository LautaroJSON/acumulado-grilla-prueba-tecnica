interface IRow {
  children: React.ReactNode;
}

export const Row = ({ children }: IRow) => {
  return <div className="row">{children}</div>;
};
