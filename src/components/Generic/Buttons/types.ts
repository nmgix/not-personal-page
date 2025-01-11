export type ButtonProps = {
  children: React.ReactElement;
  onClick: () => any;
  onHold?: () => any;
  onDrag?: () => any; // под вопросом
  disabled?: boolean;
};
