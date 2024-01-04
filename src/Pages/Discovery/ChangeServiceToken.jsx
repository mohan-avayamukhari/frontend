import {Form, Input, Button} from "antd"
import { updateToken } from "../../Services/Discovery";

const ChangeServiceToken = ({changeToken, setChangeToken}) => {
  const [form] = Form.useForm();

  const onFinish = async(values, changeToken) => {
    try{
      await updateToken(changeToken.record, values.token)
      form.resetFields();
      setChangeToken({
        isOpen:false,
        record: null
      })
    }catch(error){
      console.log(error);
    }
  };

  const handleClose = () => {
    console.log("hello");
    setChangeToken({
      isOpen:false,
      record: null
    })
  }

  return(
    <Form
    form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 24 }}
    style={{ maxWidth: 800 }}
    onFinish={(values) => onFinish(values, changeToken)}
    autoComplete="off"
  >
    <Form.Item
      label="New Token"
      name="token"
      rules={[{ required: true, message: 'Please enter new token!' }]}
    >
      <Input type="password"/>
    </Form.Item>
    <div style={{display:"flex", justifyContent:"space-between"}}>
    <Form.Item >
      <Button onClick={() => handleClose()}>
        Cancel
      </Button>
    </Form.Item>
    <Form.Item >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    </div>
  </Form>
  )
}

export default ChangeServiceToken