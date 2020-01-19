import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { fetchObjectsByParams } from '../actions';
import { OBJECT_TYPES, PAGE_SIZE } from '../constants';
import FiltersPanel from '../components/FiltersPanel';
import './List.scss';

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
    state = { filters: { searchTerm: '', objectTypes: [] } };

    componentDidMount() {
        this.props.fetchObjectsByParams();
    }

    onPaginationChange = pagination => {
        this.props.fetchObjectsByParams({
            term: this.state.filters.searchTerm,
            types: this.state.filters.objectTypes,
            page: pagination.current
        });
    };

    onFiltersChange = filters => {
        this.setState({ filters: filters });
        this.props.fetchObjectsByParams({ term: filters.searchTerm, types: filters.objectTypes, page: 1 });
    };

    render() {
        return (
            <div className="okn-list-page">
                <FiltersPanel onChange={this.onFiltersChange}/>

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