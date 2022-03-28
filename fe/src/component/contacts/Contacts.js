import './Contacts.scss';
function Contacts() {
    return (
        <div className="contacts">
            <p>Bạn bè</p>
            <div className="contacts_tag">
                <img src="https://texturegen.com/wp-content/uploads/2018/01/anh-dep-cho-facebook-271x300.jpg" className="contacts_tag_avt"/>               
                <span>Nguyễn Trung Toàn</span>
                <div className="notifications">
                    <span>3</span>
                </div>
                <div className="signal"></div>
            </div>
            <div className="contacts_tag">
                <img src="https://texturegen.com/wp-content/uploads/2018/01/anh-dep-cho-facebook-271x300.jpg" className="contacts_tag_avt"/>               
                <span>Nguyễn Đức Long</span>
                <div className="notifications">
                    <span>2</span>
                </div>
                <div className="signal"></div>
            </div>
        </div>
    );
}
export default Contacts;