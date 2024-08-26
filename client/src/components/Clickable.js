const Clickable = props => {
  const {
    children,
    sounds,
    onClick,
    ...rest
  } = props;

  const click = (e) => {
    onClick && onClick(e);
  };

  return (
    <span {...rest} onClick={click}>
      {children}
    </span>
  );
};

export default Clickable;
