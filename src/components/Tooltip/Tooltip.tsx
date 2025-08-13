import './tooltip.css';

interface ITooltipProps {
  text: string;
}

const Tooltip = ({ text }: ITooltipProps) => {
  return <p className="tooltip">{text}</p>;
};

export default Tooltip;
