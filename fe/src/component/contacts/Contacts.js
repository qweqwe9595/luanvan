import './Contacts.scss';
function Contacts() {
    return (
        <div className="contacts">
            <p>Contacts</p>
            <div className="contacts_tag">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2O0zb-Xpon0-VQfC_5QSnKzDObObyD2Tc0Q&usqp=CAU" className="contacts_tag_avt"></img>               
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