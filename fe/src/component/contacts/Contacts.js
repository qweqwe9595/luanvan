import './Contacts.scss';
function Contacts() {
    return (
        <div className="contacts">
            <p>Contacts</p>
            <div className="contacts_tag">
                <img src="https://chiase24.com/wp-content/uploads/2022/01/Tong-hop-nhung-hinh-anh-Icon-dang-yeu-cute-nhat-6.png" className="contacts_tag_avt"/>               
                <span>Nguyễn Trung Toàn</span>
                <div className="notifications">
                    <span>3</span>
                </div>
                <div className="signal"></div>
            </div>
            <div className="contacts_tag">
                <img src="https://chiase24.com/wp-content/uploads/2022/01/Tong-hop-nhung-hinh-anh-Icon-dang-yeu-cute-nhat-6.png" className="contacts_tag_avt"/>               
                <span>Nguyễn Trung Toàn</span>
                <div className="notifications">
                    <span>3</span>
                </div>
                <div className="signal"></div>
            </div>
        </div>
    );
}
export default Contacts;