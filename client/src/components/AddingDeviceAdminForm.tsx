import React from 'react'
import { Button, Form, Input, Select, Upload, Space } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import DeviceStore, { DeviceBrands, DeviceTypes } from '../store/DeviceStore';

const { Option } = Select;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddingDeviceAdminForm = observer(({onFinish, device} : {onFinish: (values: any)=>void, device: DeviceStore}) => {
  return (
    <Form
        name='Device'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="typeId" label="Тип" rules={[{ required: true }]}>
          <Select
            placeholder="Выберите тип"
            allowClear
          >
            {
              device.types.map((type: DeviceTypes)=><Option key={type.id} value={type.id}>{type.name}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name="brandId" label="Бренд" rules={[{ required: true }]}>
          <Select
            placeholder="Выберите бренд"
            allowClear
          >
            {
              device.brands.map((brand: DeviceBrands)=><Option key={brand.id} value={brand.id}>{brand.name}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Название" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
          <Input type='number' addonAfter='₽'/>
        </Form.Item>
        <Form.Item name="img" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
              name="logo"
              beforeUpload={(_)=>false}
              listType="picture"
            >
              <Button>
                <UploadOutlined />
              </Button>
            </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Form.List name="info">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      rules={[{ required: true, message: 'Введите параметр' }]}
                    >
                      <Input placeholder="Параметр" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      rules={[{ required: true, message: 'Введите значение' }]}
                    >
                      <Input placeholder="Значение" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Добавить параметр
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
          <Button style={{marginLeft: '20px'}} type="dashed" htmlType="reset">
            Очистить
          </Button>
        </Form.Item>
      </Form>
  )
})

export default AddingDeviceAdminForm