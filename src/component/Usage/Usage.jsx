import React, { useState } from 'react';
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import "../Styles/Usage.css"
import UsageStartWeb from "./UsageStartWeb";
import UsageResetPassword from "./UsageResetPassword";
import Navbar from "../Navigation/navbar";

function Usage() {
    const [activeTab, setActiveTab] = useState('tab1');
    const [activeSubItem, setActiveSubItem] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setActiveSubItem(null);
    };

    const handleSubItemClick = (subItem) => {
        if (activeSubItem === subItem) {
            setActiveSubItem(null);
        } else {
            setActiveSubItem(subItem);
        }
    };

    const renderSubItemsTab1 = () => {
        const subItems = [
            { id: 1, title: 'Cách khởi động web', content: <UsageStartWeb /> },
            { id: 2, title: 'Cách đổi mật khẩu', content: <UsageResetPassword /> },
        //     Cách sử dụng của các chức năng khác (nếu có)
        ];
        return (
            <ul className="list-group">
                {subItems.map(item => (
                    <li key={item.id} className={`list-group-item`}>
                        <div onClick={() => handleSubItemClick(item.id)} style={{ cursor: 'pointer' }}>
                            {item.title}
                        </div>
                        {activeSubItem === item.id && (
                            <ul className="list-group mt-2">
                                {item.content}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    const renderSubItemsTab2 = () => {
        const subItems = [
            { id: 1, title: 'Cách hehee', content: <UsageStartWeb /> },
            //     Cách sử dụng của các chức năng khác (nếu có)
        ];
        return (
            <ul className="list-group">
                {subItems.map(item => (
                    <li key={item.id} className={`list-group-item`}>
                        <div onClick={() => handleSubItemClick(item.id)} style={{ cursor: 'pointer' }}>
                            {item.title}
                        </div>
                        {activeSubItem === item.id && (
                            <ul className="list-group mt-2">
                                {item.content}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-5">
                <MDBTabs fill className="mb-3">
                    <MDBTabsItem>
                        <MDBTabsLink className={`custom-tab-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => handleTabClick('tab1')} active={activeTab === 'tab1'}>
                            Hướng Dẫn Sử Dụng Web
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink className={`custom-tab-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabClick('tab2')} active={activeTab === 'tab2'}>
                            Hướng Dẫn Mua Hàng
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane className={`${activeTab === 'tab1' ? 'show active' : ''}`} >
                        <p>Đây là hướng dẫn sử dụng trang web của chúng tôi. Bạn có thể tìm thấy thông tin về cách sử dụng các chức năng chính tại đây.</p>
                        {renderSubItemsTab1()}
                    </MDBTabsPane>
                    <MDBTabsPane className={`${activeTab === 'tab2' ? 'show active' : ''}`} >
                        <p>Đây là hướng dẫn mua hàng trên trang web của chúng tôi. Hãy làm theo các bước sau để thực hiện mua hàng một cách dễ dàng.</p>
                        {renderSubItemsTab2()}
                    </MDBTabsPane>
                </MDBTabsContent>
            </div>
        </div>
    );
}

export default Usage;
