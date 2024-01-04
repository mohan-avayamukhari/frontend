import { useState, useEffect } from 'react'
import { Box, IconButton } from '@mui/material'
import {AddOutlined, EditOutlined, DeleteOutlined,} from "@mui/icons-material"
import { ConfigProvider, Table, Badge, Form, Modal, Button, theme} from 'antd'
import expandedRowRender from './expandedRow'
import FormComponent from './Modal'

const DrPolicy = ({preferredMode, globalTheme, open}) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [form] = Form.useForm();
  const [policyNameFilters, setPolicyNameFilters] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleTableChange = (pagination, filters, sorter ) => {
    console.log(pagination);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    { title: 'ID', dataIndex: 'no', key: 'no' },
    { title: 'Policy Name', dataIndex: 'policyName', key: 'policyName',
    filters: policyNameFilters,
    onFilter: (value, record) => record.policyName.startsWith(value),
    filterSearch: true,
    sorter: (a, b) => b.policyName.length - a.policyName.length,
    sortOrder: sortedInfo.columnKey === 'clusterName' ? sortedInfo.order : null,
    },
    { title: 'Last Synced', dataIndex: 'lastSynced', key: 'lastSynced' },
    { title: 'Next Sync', dataIndex: 'nextSync', key: 'nextSync' },
    {
      title: 'Status',
      key: 'state',
      render: (record) => <Badge status= {record.status == "completed"? "success":"warning"} text={record.status == 'completed'?"Finished":'Syncing'} />,
    },
    { title: 'Action', key: 'operation', render: (record) => (
    <div>
      <IconButton><AddOutlined sx={{color:"#1668dc"}}/></IconButton>
      <IconButton><EditOutlined sx={{color:"orange"}}/></IconButton>
      <IconButton><DeleteOutlined sx={{color:"red"}}/></IconButton>
    </div>
    ) },
    { title: 'Failover', dataIndex: 'failover', key: 'failover' }
  ];

  useEffect(() => {
    setData([
      {
      id:632424255,
      no:1,
      policyName:"Test-policy1",
      lastSynced:"19/10/2023 13:21(05h:26m)",
      nextSync:"19/102023 13:21",
    },
    {
      id:632424256,
      no:2,
      policyName:"Test-policy2",
      lastSynced:"19/10/2023 13:21(05h:20m)",
      nextSync:"19/102023 13:51",
    }
  ])
    setLoading(false)
  }, [])

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    console.log(values);
  }

  return (
    <ConfigProvider
    theme={{algorithm: preferredMode ? darkAlgorithm : defaultAlgorithm,}}>
      <div style={{margin:open? "4rem 0 0 15rem": "4rem 0 0 4rem", paddingTop: "1rem", transition: "margin 0.3s ease-in-out", width: open? "89.5rem":"100rem"}}>
      <div>
      <Button onClick={() => setIsModalVisible(true)} type="primary" style={{ marginBottom: 16, marginLeft:24 }}>
        Add Policy
      </Button>
        </div>
        <Form form={form}>
          <Table
          columns={columns}
          dataSource={data}
          style={{ padding: "0rem 1.5rem" }}
          expandable={{ expandedRowRender }}
          onChange={handleTableChange}
          loading={loading}
          rowKey={(record) => {return record.id}}
          size="small"
          />
          <Modal
          title="Add New Policy"
          width={1000}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          styles={{ content: { paddingBottom: '0.5rem' }, }}
          >
            <FormComponent onFinish={handleSubmit} />
          </Modal>
        </Form>
        </div>
    </ConfigProvider>
  )
}

export default DrPolicy
