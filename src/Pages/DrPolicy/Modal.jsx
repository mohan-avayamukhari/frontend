/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Select, Typography, Radio } from "antd";
import { useEffect, useState } from "react";
import {getAllClusters} from "../../Services/Discovery.js"
import {Namespaces} from "../../Services/k8s.js"



const FormComponent = ({ onFinish }) => {
  const [cluster, setCluster] = useState([])
  const [namespaces, setNameSpaces] = useState([])
  const [namespace, setNamespace] = useState()
  const [isNamespaces, setIsNamespaces] = useState(true)
  const [selectedResource, setSelectedResource] = useState('');
  const workLoads = ["Pods", "Deployments", "StatefulSets", "DaemonSets", "Jobs", "CronJobs", "Services", "ConfigMaps", "Secrets", "Ingress", "Persistent Volumes (PV)", "Persistent Volume Claims (PVC)", "Resource Quotas", "Limit Ranges"]
  const storageClass = ["gp2", "io1", "standard", "sc1", "st1", "Standard_LRS", "Premium_LRS", "StandardSSD_LRS", "UltraSSD_LRS", "pd-standard", "pd-ssd", "pd-balanced", "local-ssd"]

  useEffect(() => {
    getAllClusters().then(response => {
      const clusterNames = response.map(data => ({clusterName: data.clusterName, id: data.id}));
        setCluster(clusterNames);
      }).catch(error => {
        console.error('Error fetching user profile:', error);
      });
  },[])

  const getNameSpaces = (id) => {
    try{
      Namespaces(id).then(response => {
        setNameSpaces(response.data)
        setIsNamespaces(false)
      })
    }catch(error) {
      console.error('Error fetching user profile:', error);
    }
  }

  const onFinishHandler = (values) => {
    onFinish(values);
  };

  return (
    <Form onFinish={onFinishHandler}>
      <div style={{display:"flex", justifyContent:"space-between", width:"54rem"}}>
        <div>
        <Typography.Title level={4} style={{paddingLeft:"10rem"}}>Source Cluster</Typography.Title>
        <Form.Item label="Cluster Name" style={{width:"10rem"}}>
          <Select style={{width:"20rem"}} onSelect={(id) => getNameSpaces(id)}>
            {cluster.map(data => <Select.Option key={data.id} value={data.id}>{data.clusterName}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Namespace" style={{width:"10rem", paddingLeft:'0.75rem'}}>
          <Select style={{width:"20rem"}} disabled={isNamespaces} onSelect={(data) => setNamespace(data)}>
          {namespaces.map(data => <Select.Option key={data} value={data}>{data}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Resource" style={{paddingLeft:"1.8rem"}}>
          <Radio.Group onChange={(event)=> setSelectedResource(event.target.value)} disabled={!namespace}>
            <Radio value="all"> All </Radio>
            <Radio value="selective"> Selective </Radio>
          </Radio.Group>
          </Form.Item>
          <Form.Item label="Workload" style={{width:"10rem", paddingLeft:'1.75rem'}}>
          <Select style={{width:"20rem"}} disabled={selectedResource !== "selective"}>
          {workLoads.map(data => <Select.Option key={data} value={data}>{data}</Select.Option>)}
          </Select>
        </Form.Item>
        </div>
        <div>
        <Typography.Title level={4} style={{paddingLeft:"10rem"}}>Destination Cluster</Typography.Title>
        <Form.Item label="Cluster Name" style={{width:"10rem"}}>
          <Select style={{width:"20rem"}}>
            {cluster.map(data => <Select.Option key={data.id} value={data.id}>{data.clusterName}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Namespace" style={{width:"10rem", paddingLeft:"0.75rem"}}>
          <Select style={{width:"20rem"}}>
            {namespaces.map(data => <Select.Option key={data} value={data}>{data.clusterName}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Storage Class" style={{width:"10rem"}}>
          <Select style={{width:"20rem"}}>
            {storageClass.map(data => <Select.Option key={data} value={data}>{data}</Select.Option>)}
          </Select>
        </Form.Item>
        </div>
        </div>
    </Form>
  );
};

export default FormComponent