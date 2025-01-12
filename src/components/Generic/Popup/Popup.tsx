type PopupProps = {
  parentRef: React.Ref<HTMLElement>;
  children: React.ReactElement;
  timeout?: number;
};
export const Popup = ({ children, parentRef, timeout }: PopupProps) => {
  return <div className='box'>{children}</div>;
};
