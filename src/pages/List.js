import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Icon, Input, Row, Select, Table } from 'antd';

import { fetchObjectsByParams } from '../actions';
import { OBJECT_TYPES, PAGE_SIZE } from '../constants';
import './List.scss';

const { Option } = Select;

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: (name, obj) => <Link to={`/objects/${obj.id}`}>{name}</Link>,
        ellipsis: true
    },
    {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
        render: type => OBJECT_TYPES.find(obj => obj.value === type).label,
        width: '140px'
    }
];

class List extends React.Component {
    state = { searchTerm: '', selectedTypes: [] };

    componentDidMount() {
        this.props.fetchObjectsByParams();
    }

    onSearchTermChange = ({ target: { value } }) => {
        this.setState({ searchTerm: value } );
        this.props.fetchObjectsByParams({ term: value, types: this.state.selectedTypes, page: 1 });
    };

    onTypesChange = types => {
        this.setState({ selectedTypes: types } );
        this.props.fetchObjectsByParams({ term: this.state.searchTerm, types, page: 1 });
    };

    onPaginationChange = pagination => {
        this.props.fetchObjectsByParams({
            term: this.state.searchTerm,
            types: this.state.selectedTypes,
            page: pagination.current
        });
    };

    render() {
        return (
            <div className="okn-list-page">
                <Row gutter={16} className="okn-filters-panel">
                    <Col xs={24} sm={12} lg={6}>
                        <Input
                            placeholder="Поиск"
                            prefix={<Icon type="search"/>}
                            onChange={this.onSearchTermChange}
                            allowClear
                            className="okn-search-box"
                        />
                    </Col>

                    <Col xs={24} sm={12} lg={12}>
                        <Select
                            mode="multiple"
                            placeholder="Тип"
                            showArrow={true}
                            onChange={this.onTypesChange}
                            allowClear
                            className="okn-type-select"
                        >
                            {this.renderSelectOptions()}
                        </Select>
                    </Col>
                </Row>

                <Table
                    dataSource={this.props.objects}
                    columns={columns}
                    rowKey={object => object.id}
                    pagination={this.props.pagination}
                    loading={this.props.loading}
                    size="middle"
                    scroll={{ y: "calc(100vh - 240px)" }}
                    className="okn-objects-table"
                    onChange={this.onPaginationChange}
                />
            </div>
        );
    }

    renderSelectOptions() {
        return OBJECT_TYPES.map(opt => <Option key={opt.value}>{opt.label}</Option>);
    }
}

const mapStateToProps = state => {
    const { perPage, page, total, loading } = state.objects;

    return {
        objects: perPage,
        pagination: { current: page, total, pageSize: PAGE_SIZE },
        loading
    };
};

export default connect(mapStateToProps, { fetchObjectsByParams })(List);