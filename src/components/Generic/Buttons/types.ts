export type ButtonProps = {
  children: React.ReactElement | React.ReactElement[];
  onClick: () => any;
  onHold?: () => any;
  onDrag?: () => any; // под вопросом
  disabled?: boolean;
  externalClassnames?: string | string[];
  focus?: true;
};
