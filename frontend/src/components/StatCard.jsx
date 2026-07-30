import "./components.css";
import { motion } from "framer-motion";

function StatCard({
  icon,
  title,
  value,
  color
}) {

  return (

    <motion.div
      className="stat-box"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35 }}
    >

      <div className="stat-top">

        <div
          className="stat-icon"
          style={{
            background: `${color}18`,
            color: color
          }}
        >
          {icon}
        </div>

      </div>

      <div className="stat-content">

        <h2 className="stat-value">
          {value}
        </h2>

        <p className="stat-title">
          {title}
        </p>

      </div>

    </motion.div>

  );

}

export default StatCard;