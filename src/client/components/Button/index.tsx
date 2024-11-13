interface IButton {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: IButton) => {
  return (
    <div className="col-12 hlp-text-center hlp-margintop-40">
      <button className="--btn --secondary" type="button" onClick={onClick}>
        {label || "Boton"}
      </button>
    </div>
  );
};

export default Button;
