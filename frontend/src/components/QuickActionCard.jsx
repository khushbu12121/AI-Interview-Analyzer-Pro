import "./components.css";

function QuickActionCard({

  icon,
  title,
  onClick

}){

  return(

    <div
      className="quick-card"
      onClick={onClick}
    >

      <div className="quick-icon">

        {icon}

      </div>

      <h3>{title}</h3>

    </div>

  );

}

export default QuickActionCard;