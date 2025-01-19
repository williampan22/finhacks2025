const creditCard = ({cardNumber, name, expiration, card} : {cardNumber: string, name: string, expiration: string, card: string}) => (
  <div className={`credit-card card-${card}`}>
    <div className="card-chip"></div>
    <div className="card-details">
      <div className="card-number">{cardNumber}</div>
      <div className="card-holder">
        <span>Card Holder</span>
        <span>{name}</span>
      </div>
      <div className="card-expiry">
        <span>Expiry</span>
        <span>{expiration}</span>
      </div>
    </div>
  </div>
);

export default creditCard;
