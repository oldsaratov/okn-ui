import React, { useState } from 'react';
import { Col, Input, Row, Select, Switch } from 'antd';

import { DEFAULT_FILTERS, OBJECT_TYPES } from '../constants';

const { Search } = Input;
const { Option } = Select;

const FiltersPanel = props => {
    const [searchTerm, setSearchTerm] = useState(DEFAULT_FILTERS.searchTerm);
    const [objectTypes, setObjectTypes] = useState(DEFAULT_FILTERS.objectTypes);
    const [viewType, setViewType] = useState(DEFAULT_FILTERS.viewType);

    const onSearchTermChange = value => {
        setSearchTerm(value);
        props.onChange({ searchTerm: value, objectTypes, viewType });
    };

    const onObjectTypesChange = types => {
        setObjectTypes(types);
        props.onChange({ searchTerm, objectTypes: types, viewType });
    };

    const onViewTypeChange = checked => {
        const newViewType = checked ? 'map' : 'list';

        setViewType(newViewType);
        props.onChange({ searchTerm, objectTypes, viewType: newViewType });
    };

    return (
        <Row gutter={16} type="flex" justify="space-between" className="okn-filters-panel">
            <Col xs={24} sm={12} md={8} lg={8}>
                <Search
                    placeholder="Поиск"
                    onSearch={onSearchTermChange}
                    enterButton
                    allowClear
                    className="okn-search-box"
                />
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
                <Select
                    mode="multiple"
                    placeholder="Тип"
                    showArrow
                    onChange={onObjectTypesChange}
                    allowClear
                    className="okn-object-type-select"
                >
                    {OBJECT_TYPES.map(opt => <Option key={opt.value}>{opt.label}</Option>)}
                </Select>
            </Col>

            <Col className="okn-view-type-switch">
                <span className="okn-view-type-switch__label">Карта</span>
                <Switch defaultChecked onChange={onViewTypeChange}/>
            </Col>
        </Row>
    );
};

export default FiltersPanel;