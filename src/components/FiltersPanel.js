import React, { useState } from 'react';
import { Col, Icon, Input, Row, Select } from 'antd';

import { OBJECT_TYPES } from '../constants';

const { Option } = Select;

const FiltersPanel = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [objectTypes, setObjectTypes] = useState([]);

    const onSearchTermChange = ({ target: { value } }) => {
        setSearchTerm(value);
        props.onChange({ searchTerm: value, objectTypes });
    };

    const onTypesChange = types => {
        setObjectTypes(types);
        props.onChange({ searchTerm, objectTypes: types });
    };

    return (
        <Row gutter={16} className="okn-filters-panel">
            <Col xs={24} sm={12} lg={6}>
                <Input
                    placeholder="Поиск"
                    prefix={<Icon type="search"/>}
                    onChange={onSearchTermChange}
                    allowClear
                    className="okn-search-box"
                />
            </Col>

            <Col xs={24} sm={12} lg={12}>
                <Select
                    mode="multiple"
                    placeholder="Тип"
                    showArrow
                    onChange={onTypesChange}
                    allowClear
                    className="okn-type-select"
                >
                    {OBJECT_TYPES.map(opt => <Option key={opt.value}>{opt.label}</Option>)}
                </Select>
            </Col>
        </Row>
    );
};

export default FiltersPanel;