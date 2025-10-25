import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ReusableTooltip = ({
  tooltipText,
  placement = "bottom",
  children,
  ...restProps
}) => {
  const renderTooltip = (props) => (
    <Tooltip id={`tooltip-${tooltipText.replace(/\s/g, "-")}`} {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <OverlayTrigger overlay={renderTooltip} {...restProps}>
      {children}
    </OverlayTrigger>
  );
};
export default ReusableTooltip;
