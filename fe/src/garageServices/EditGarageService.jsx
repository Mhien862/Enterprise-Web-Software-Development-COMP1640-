// /* eslint-disable react/prop-types */
// import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchServices } from '../store/reducers/service';
// import '../assets/styles/editservice.css';

// const EditService = () => {
//   const [form] = Form.useForm();
//   const SubmitButton = ({ form }) => {
//     const values = Form.useWatch([], form);
//     React.useEffect(() => {}, [values, formSubmitted]);

//     return (
//       <Space>
//         <Button type="primary" block htmlType="button" onClick={handleSubmit}>
//           Edit
//         </Button>
//         <Button type="primary" block htmlType="button" onClick={handleSubmit}>
//           Cancel
//         </Button>
//       </Space>
//     );
//   };
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const handleSubmit = () => {
//     setFormSubmitted(true);
//     form
//       .validateFields()
//       .then((values) => {
//         console.log('Form values:', values);
//       })
//       .catch((error) => {
//         console.error('Form validation error:', error);
//       });
//   };
//   const validateNumber = (rule, value, callback) => {
//     if (value === '') {
//       callback();
//     } else if (isNaN(value)) {
//       callback('Please enter a valid number');
//     } else {
//       callback();
//     }
//   };

//   const dispatch = useDispatch();
//   const { manageService } = useSelector((state) => state.service);
//   const data = manageService?.items.map((value) => {
//     return value;
//   });
//   console.log(333, data);
//   const [params, setParams] = useState({
//     page: 1,
//     limit: 2,
//   });
//   useEffect(() => {
//     dispatch(fetchServices(params));
//   }, []);
//   console.log(manageService);
//   return (
//     <>
//       <div>
//         <div>
//           <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
//             <Row gutter={16}>
//               <Col className="gutter-row" span={6}>
//                 <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//                   <Input placeholder="Enter your name" defaultValue={data} />
//                 </Form.Item>
//               </Col>
//               <Col className="gutter-row" span={6}>
//                 <Form.Item
//                   name="min"
//                   label="Min price"
//                   rules={[{ required: true, message: 'Please enter the maximum price' }, { validator: validateNumber }]}
//                 >
//                   <Input placeholder="Enter min price" defaultValue="" />
//                 </Form.Item>
//               </Col>
//               <Col className="gutter-row" span={6}>
//                 <Form.Item
//                   name="max"
//                   label="Max price"
//                   rules={[{ required: true, message: 'Please enter the maximum price' }, { validator: validateNumber }]}
//                 >
//                   <Input placeholder="Enter max price" defaultValue="" />
//                 </Form.Item>
//               </Col>
//             </Row>
//             <div>
//               <Form.Item name="description" label="Description" rules={[{ required: true }]}>
//                 <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} placeholder="Enter your name" defaultValue="" />
//               </Form.Item>
//             </div>
//           </Form>
//           <SubmitButton form={form} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditService;
