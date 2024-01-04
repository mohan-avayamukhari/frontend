import {Form, Input} from "antd";

const EditableCell = ({editing, dataIndex, title, children, ...restProps
}) => {
  const inputNode = <Input autoComplete='off'/>
  const { nameRegex, fqdnIpRegex, portRegex } = {
    nameRegex: /^[a-zA-Z0-9]+$/,
    fqdnIpRegex: /\b(?:https?|ftp):\/\/[-\w]+(?:\.\w+)*(?::\d+)?(?:\/[^\/]*)*\b|\b(?:\d{1,3}\.){3}\d{1,3}\b/,
    portRegex: /^([1-9]\d{0,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
  };
  
  const getRegexPattern = (dataIndex) => {
    switch (dataIndex) {
      case 'clusterName':
        return nameRegex;
      case 'fqdnIp':
        return fqdnIpRegex;
      case 'port':
        return portRegex;
      default:
        return null;
    }
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{required: true, message: `Please Input ${title}!`,}, () => ({
              validator(_, value) {
                const regexPattern = getRegexPattern(dataIndex);
                if (!regexPattern || !value || regexPattern.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(`Invalid ${title}!`);
              },
            }),
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}; 

export default EditableCell