export const Box = (args?: { styles: React.CSSProperties }) => {
  return <div style={args ? args.styles : { width: "100px", height: "50px" }} className='box' />;
};
