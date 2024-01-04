import { Table, Badge, Space } from "antd";

const expandedRowRender = () => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      key: 'state',
      render: (record) => <Badge status= {record.status == "completed"? "success":"warning"} text={record.status == 'completed'?"Finished":'Syncing'} />,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Space size="middle">
          <a>Pause</a>
          <a>Cancel</a>
          <a>start</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      date: '19/10/23 23:12:00',
      name: 'Test Namespace1',
    },
    {
      key: 2,
      date: '19/10/23 23:12:00',
      name: 'Test Namespace2',
      status: "completed"
    },
    {
      key: 3,
      date: '19/10/23 23:12:00',
      name: 'Test Namespace3',
    }
  ];
    return <Table columns={columns} dataSource={data} pagination={false} />;
};


  export default expandedRowRender;