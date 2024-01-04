import { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Typography, Modal, Popover } from 'antd';
import { ConfigProvider,Button, theme} from 'antd'
import Toast from '../../components/Toast.jsx';
import EditableCell from './components/Edit.jsx';
import { getAllClusters, addCluster, updateCluster, deleteCluster } from '../../Services/Discovery.js';
import TestButton from '../Discovery/components/TestButton.jsx';
import ChangeServiceToken from './ChangeServiceToken.jsx';

const Discovery = ({preferredMode, globalTheme, open}) => {
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState('');
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [clusterNameFilters, setClusterNameFilters] = useState();
  const [sortedInfo, setSortedInfo] = useState({});
  const [isTostVisible, setIsTostVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState("success")
  const [changeToken, setChangeToken] = useState({
    isOpen:false,
    record: null
  });


  const handleTableChange = (pagination, filters, sorter ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };


  useEffect(() => {
    getAllClusters().then(data => {
      const rowsWithId = data.map((row, index) => ({ ...row, no: index + 1,}));
        setData(rowsWithId);
        setClusterNameFilters(data.map(value => {return {text: value.clusterName,value: value.clusterName};}))
        setLoading(false)
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
  },[])

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
      values.port = values.port === undefined|| values.port === ""? "6443": values.port 
      addCluster(values).then(statusCode => {
        if(statusCode === 201){
          setIsModalVisible(false)
          setMessage(`Added ${values.clusterName} cluster successfully`)
          setSeverity("success")
          setIsTostVisible(true)
          getAllClusters().then(response => {
            const rowsWithId = response.map((value, index) => ({ ...value, no: index + 1, }));
            setData(rowsWithId);
          }).catch(error => {
            console.error('Error fetching user profile:', error);
          });
        }
      })
  };

  const YourFormComponent = ({ onFinish }) => {
    const onFinishHandler = (values) => {
      onFinish(values);
    };
    return (
      <Form onFinish={onFinishHandler} labelCol={{ span: 6 }} wrapperCol={{ span: 17}} >
        <Form.Item 
        label="Cluster Name" 
        name="clusterName" 
        rules={[
          { required: true, message: 'Please enter the Cluster friendly name!' },
          { pattern: /^[A-Za-z0-9]+$/, message: 'Only letters and numbers are allowed!' },
        ]}
        >
          <Input autoComplete='off'/>
        </Form.Item>
        <Form.Item 
        label="FQDN/IP" 
        name="fqdnIp" 
        rules={[
          { required: true, message: 'FQDN or IP address is required !' },
          { pattern: /\b(?:https?|ftp):\/\/[-\w]+(?:\.\w+)*(?::\d+)?(?:\/[^\/]*)*\b|\b(?:\d{1,3}\.){3}\d{1,3}\b/, message: 'Not a valid FQDN or IP address' },
        ]}
        >
          <Input autoComplete='off' />
        </Form.Item>
        <Form.Item 
        label="Port" 
        name="port" 
        rules={[
          { required: false },
          { pattern: /^([1-9]\d{0,4}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: 'Not a valid Port' },
        ]}
        >
          <Input autoComplete='off' placeholder='6443'/>
        </Form.Item>
        <Form.Item 
        label="Service Token" 
        name="serviceToken" 
        rules={[
          { required: true, message: 'Please enter the Service Token!' },
        ]}
        >
          <Input autoComplete='off' type='password'/>
        </Form.Item>
        <div style={{display:"flex", justifyContent:"right"}}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add cluster
          </Button>
        </Form.Item>
        </div>
      </Form>
    );
  };


  const isEditing = (record) => record.id == editingId;

  const edit = (record) => {
    form.setFieldsValue({ clusterName: record.clusterName, fqdnIp: record.fqdnIp, port: record.port});
    setEditingId(record.id);
  };

  const cancel = () => {
    setEditingId('');
  };

  const handleDelete = (id, clusterName) =>{
    deleteCluster(id).then(statusCode => {
      if(statusCode === 200){
        getAllClusters().then(response => {
          const rowsWithId = response.map((value, index) => ({ ...value, no: index + 1 }));
          setData(rowsWithId);
          setMessage(`Deleted ${clusterName} cluster`);
          setSeverity("info");
          setIsTostVisible(true);
        }).catch(error => {
          console.error('Error fetching user profile:', error);
        });
      }
    })
  }

  const save = async (id) => {
      const row = (await form.validateFields());
      updateCluster(id, row).then(statusCode => {
        if(statusCode === 200){
          getAllClusters().then(response => {
            const rowsWithId = response.map((value, index) => ({ ...value, no: index + 1 }));
            setData(rowsWithId);
            setMessage(`Updated ${row.clusterName} cluster`);
            setSeverity("info");
            setIsTostVisible(true);
          }).catch(error => {
            console.error('Error fetching user profile:', error);
          });
        }
      })
      setEditingId('');
  };

  const columns = [
    { title: 'ID', dataIndex: 'no', key: 'no' },
    { title: 'Cluster Name', dataIndex: 'clusterName', key: 'clusterName',
    filters: clusterNameFilters,
    onFilter: (value, record) => record.clusterName.startsWith(value),
    filterSearch: true,
    sorter: (a, b) => b.clusterName.length - a.clusterName.length,
    sortOrder: sortedInfo.columnKey === 'clusterName' ? sortedInfo.order : null,
    editable: true,
    },
    { title: 'FQDN/IP', dataIndex: 'fqdnIp', key: 'fqdnIp', editable: true, },
    { title: 'Port', dataIndex: 'port', key: 'port', editable: true, },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div style={{display:'flex', justifyContent:'space-evenly'}}>
          <Typography.Link disabled={editingId !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
          <Popconfirm title={`Sure to delete ${record.clusterName}?`} onConfirm={() => handleDelete(record.id, record.clusterName)}>
              <a>Delete</a>
          </Popconfirm>
          <Popover placement='bottom' content={<ChangeServiceToken changeToken={changeToken} setChangeToken={setChangeToken} />} trigger="click" open={changeToken.isOpen} >
          <Typography.Link onClick={() => setChangeToken({ isOpen: !changeToken.isOpen, record: record.id })}>
            Change token
            </Typography.Link>
          </Popover>
        </div>
        );
        
      },
      
    },
    { title: 'Test', key: 'operation', render: (record) => (
      <TestButton setMessage={setMessage} setSeverity={setSeverity} setIsTostVisible={setIsTostVisible} id={record.id} 
      severity={record.severity} theme={globalTheme} preferredMode={preferredMode}/>
    ) },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <ConfigProvider
    theme={{algorithm: preferredMode ? darkAlgorithm : defaultAlgorithm,}}>
      <div style={{margin:open? "4rem 0 0 15rem": "4rem 0 0 4rem",
       paddingTop: "1rem",
       transition: "margin 0.3s ease-in-out", width: open? "89.5rem":"100rem"
       }}>
        <div>
        <Button onClick={() => setIsModalVisible(true)} type="primary" style={{ marginBottom: 16, marginLeft:24 }}>
        Add cluster
        </Button>
        </div>
        <Form form={form}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        onChange={handleTableChange}
        columns={mergedColumns}
        size='small'
        style={{ padding: "0rem 1.5rem" }}
        rowClassName="editable-row"
        rowKey={(record) => {return record.id}}
      />
      <Modal
        title="Add New Cluster"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        styles={{ content: { paddingBottom: '0.5rem' } }}
      >
        <YourFormComponent onFinish={handleSubmit} />
      </Modal>
      </Form>
      </div>
      <Toast message={message} severity={severity} isToastVisible={isTostVisible} setIsToastVisible={setIsTostVisible}/>
    </ConfigProvider>
  );
};

export default Discovery;