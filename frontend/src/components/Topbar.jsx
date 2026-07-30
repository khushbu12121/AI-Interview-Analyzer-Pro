import ThemeToggle from "./ThemeToggle";
import "./components.css";

function Topbar() {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12)
    greeting = "Good Morning";

  else if (hour < 18)
    greeting = "Good Afternoon";

  return (

    <div className="topbar">

      <div>

        <h1>

          {greeting},

          Khushbu 👋

        </h1>

        <p>

          Ready for today's AI Interview?

        </p>
        <p className="topbar-date">

  {new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  })}

</p>

      </div>

     <div className="topbar-right">
  <ThemeToggle />

  <div className="avatar">
    KB
  </div>
</div>

    </div>

  );

}

export default Topbar;