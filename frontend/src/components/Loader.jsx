import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Oval
        height={60}
        width={60}
        color="#8b5cf6"
        secondaryColor="#d8b4fe"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  );
}

export default Loader;