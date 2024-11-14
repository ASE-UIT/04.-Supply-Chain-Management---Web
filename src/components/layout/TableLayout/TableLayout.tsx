import TabContent from "./Content/TabContent";

export const TableLayout = ({ children, title, tabButton, onClickNew }: {
    title: string;
    tabButton?: JSX.Element;
    children: JSX.Element;
    onClickNew?: () => void;
}) => {
    return (
        <div className="partner-list-layout">
            <p className="title-text">{title}</p>
            <div className="tab-layout-div">
                <TabContent
                    tabButton={tabButton}
                    onClickNew={onClickNew}
                >
                    {children}
                </TabContent>
            </div>
        </div>
    );
};