import './Contacts.scss';
function Contacts() {
    return (
        <div className="contacts">
            <p style={{ 'textAlign': 'center' }}>Contacts</p>
            <div className="contacts_tag">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O0zb-Xpon0-VQfC_5QSnKzDObObyD2Tc0Q&usqp=CAU" className="contacts_tag_avt"></img>               
                <p style={{ 'textAlign': 'center' }}>Nguyễn Trung Toàn</p>
                <div className="notifications">
                    <p style={{ 'textAlign': 'center' }}>3</p>
                </div>
                <div className="signal"></div>
            </div>
            <div className="contacts_tag">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O0zb-Xpon0-VQfC_5QSnKzDObObyD2Tc0Q&usqp=CAU" className="contacts_tag_avt"></img>               
                <p style={{ 'textAlign': 'center' }}>Nguyễn Trung Toàn</p>
                <div className="notifications">
                    <p style={{ 'textAlign': 'center' }}>3</p>
                </div>
                <div className="signal"></div>
            </div>
        </div>
    );
}
export default Contacts;