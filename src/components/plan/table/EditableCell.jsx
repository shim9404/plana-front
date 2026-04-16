import { Form, Input } from "antd";

export const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  children,
  ...restProps
}) => {

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};