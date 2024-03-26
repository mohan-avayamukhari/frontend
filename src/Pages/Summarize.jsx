import { ConfigProvider } from "antd";
const Summarize = ({preferredMode, globalTheme, open}) => {
  const { defaultAlgorithm, darkAlgorithm } = globalTheme;  
  return (
    <ConfigProvider
    theme={{algorithm: preferredMode ? darkAlgorithm : defaultAlgorithm,}}>
      <div style={{margin:open? "4rem 0 0 15rem": "4rem 0 0 4rem",
       paddingTop: "1rem",
       transition: "margin 0.3s ease-in-out", width: open? "89.5rem":"100rem"
       }}>
        <div>Hello</div>
      </div>
    </ConfigProvider>
  );
};

export default Summarize;