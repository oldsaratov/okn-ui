import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Icon, Input, Row, Select, Table } from 'antd';

import { fetchObjectsByParams } from '../actions';
import { OBJECT_OPTIONS, PAGE_SIZE } from '../constants';
import './List.css';

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
        render: type => OBJECT_OPTIONS.find(obj => obj.value === type).label,
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
            <div>
                <Row gutter={16} className="okn-filters-panel">
                    <Col className="gutter-row" xs={24} sm={12} lg={6}>
                        <Input
                            placeholder="Поиск"
                            prefix={<Icon type="search"/>}
                            onChange={this.onSearchTermChange}
                            allowClear
                            className="okn-search-box"
                        />
                    </Col>

                    <Col className="gutter-row" xs={24} sm={12} lg={12}>
                        <Select
                            mode="multiple"
                            placeholder="Тип"
                            showArrow={true}
                            onChange={this.onTypesChange}
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
                    size="middle"
                    scroll={{ y: 'calc(100vh - 210px)' }}
                    className="okn-objects-table"
                    onChange={this.onPaginationChange}
                />
            </div>
        );
    }

    renderSelectOptions() {
        return OBJECT_OPTIONS.map(opt => <Option key={opt.value}>{opt.label}</Option>);
    }
}

const mapStateToProps = state => {
    const { perPage, page, total } = state.objects;

    return {
        objects: perPage,
        pagination: { current: page, total, pageSize: PAGE_SIZE }
    };
};

export default connect(mapStateToProps, { fetchObjectsByParams })(List);