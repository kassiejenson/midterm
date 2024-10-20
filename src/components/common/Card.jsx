

const Card = ({ title, children }) => {
    return(
        <div className="Card">
            {title && <h2 className="Cardtitle">{title}</h2>}
            <div className="Cardcontent">
                {children}
            </div>
        </div>
    );
}

export default Card;