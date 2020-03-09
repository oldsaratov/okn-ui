import React from 'react';
import { Col, Input, Row, Select, Switch } from 'antd';
import { connect } from 'react-redux';

import { OBJECT_TYPES, VIEW_TYPES } from '../../constants';
import { setSearchTermFilter, setObjectTypesFilter, setViewTypeFilter } from '../../actions';

const { Search } = Input;
const { Option } = Select;

const FiltersPanel = props => {
    const options = Object.values(OBJECT_TYPES);
    const mapChecked = props.viewType === VIEW_TYPES.MAP;

    const onSearchTermChange = value => {
        props.setSearchTermFilter(value);
    };

    const onObjectTypesChange = types => {
        props.setObjectTypesFilter(types);
    };

    const onViewTypeChange = checked => {
        const newViewType = checked ? VIEW_TYPES.MAP : VIEW_TYPES.LIST;

        props.setViewTypeFilter(newViewType);
    };

    return (
        <Row type="flex" justify="space-between" className="okn-filters-panel">
            <Col xs={16} sm={18} md={20} lg={20}>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={8} className="okn-filters-panel__col">
                        <Search
                            placeholder="Поиск"
                            defaultValue={props.searchTerm}
                            onSearch={onSearchTermChange}
                            enterButton
                            allowClear
                            className="okn-search-box"
                        />
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={14} className="okn-filters-panel__col">
                        <Select
                            mode="multiple"
                            placeholder="Тип"
                            defaultValue={props.objectTypes}
                            showArrow
                            onChange={onObjectTypesChange}
                            allowClear
                            className="okn-object-type-select"
                        >
                            {options.map(opt => <Option key={opt.value}>{opt.label}</Option>)}
                        </Select>
                    </Col>
                </Row>
            </Col>

            <Col className="okn-view-type-switch">
                <span className="okn-view-type-switch__label">Карта</span>
                <Switch checked={mapChecked} onChange={onViewTypeChange}/>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { objectTypes, searchTerm, viewType } = state.filters;

    return { objectTypes, searchTerm, viewType };
};

export default connect(mapStateToProps, {
    setSearchTermFilter,
    setObjectTypesFilter,
    setViewTypeFilter
})(FiltersPanel);