import { Spin } from "antd";
import { icons } from "lucide-react";



const LoadingOverlay = ({ loading, children, tip = "Loading..." }) => {
    const {  LoadingOutlined  } = icons;

    return (
    <div style={{ position: "relative", display: "flex", flex: 1}}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin tip={tip} />
        </div>
      )}
      {children}
    </div>
  );
};


export default LoadingOverlay;