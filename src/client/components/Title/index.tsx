interface ITitle {
  children: React.ReactNode;
}

export const Title = ({ children }: ITitle) => {
  return (
    <div className="com-titleWithfollow hlp-marginBottom-15">
      <h1 className="com-title-section-xl hlp-marginBottom-40">{children}</h1>
    </div>
  );
};
