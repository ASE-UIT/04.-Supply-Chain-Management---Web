import ActionButton from "../Buttons/ButtonNew";
import "./TabContent.scss";

const TabContent = ({ tabButton, onClickNew, children }: { children: JSX.Element, onClickNew?: () => void, tabButton?: JSX.Element }) => {
  return (
    <div className="tab-content-div">
      <ActionButton onClickNew={onClickNew} />
      {tabButton && tabButton}
      {children}
    </div>
  );
};

export default TabContent;
