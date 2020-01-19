import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'antd';
import isEqual from 'lodash/isEqual';

import { fetchObjectsByParams } from '../../actions';
import { OBJECT_TYPES, PAGE_SIZE } from '../../constants';

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

class ObjectList extends React.Component {
    state = { page: 1 };

    componentDidMount() {
        this.props.fetchObjectsByParams({
            term: this.props.filters.searchTerm,
            types: this.props.filters.objectTypes,
            page: 1
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!isEqual(prevProps.filters, this.props.filters)) {
            this.props.fetchObjectsByParams({
                term: this.props.filters.searchTerm,
                types: this.props.filters.objectTypes,
                page: this.state.page
            });
        }
    }

    onPaginationChange = pagination => {
        this.setState({ page: pagination.current });

        this.props.fetchObjectsByParams({
            term: this.props.filters.searchTerm,
            types: this.props.filters.objectTypes,
            page: pagination.current
        });
    };

    render() {
        return (
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

export default connect(mapStateToProps, { fetchObjectsByParams })(ObjectList);