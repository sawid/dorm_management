import React, { useState } from 'react';
import { useContext,  useEffect, useRef } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import { readBill } from "./function.components/bill";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const originData = [];


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {" "}
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {" "}
          {inputNode}{" "}
        </Form.Item>
      ) : (
        children
      )}{" "}
    </td>
  );
};

const EditableTable = () => {
  let { id } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  

  const edit = (record) => {
    form.setFieldsValue({
      rentalFee: "",
      ElectricUnit: "",
      waterUnit: "",
      rentalNet: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const loadData = (authtoken, values) => {
    readBill(authtoken, values)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData(user.token, id);
  }, []);


  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ค่าห้อง",
      dataIndex: "rentalFee",
      width: "15%",
      editable: true,
    },
    {
      title: "หน่วยค่าไฟ",
      dataIndex: "electricUnit",
      width: "15%",
      editable: true,
    },
    {
      title: "หน่วยค่าน้ำ",
      dataIndex: "waterUnit",
      width: "15%",
      editable: true,
    },
    {
      title: "ค่าส่วนกลาง",
      dataIndex: "rentalNet", 
      width: "15%",
      editable: true,
    },
    {
      title: "การดำเนินการ",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save{" "}
            </Typography.Link>{" "}
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a> Cancel </a>{" "}
            </Popconfirm>{" "}
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit{" "}
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />{" "}
    </Form>
  );
};

export default () => <EditableTable />;
