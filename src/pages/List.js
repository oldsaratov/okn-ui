import React from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Select } from 'antd';

import { fetchObjectsByParams } from '../actions';
import { OBJECT_OPTIONS } from '../constants';
import './List.css';

const { Option } = Select;

class List extends React.Component {

    componentDidMount() {
        this.props.fetchObjectsByParams();
    }

    onSearchTermChange = ({ target: { value } }) => {
        console.log('onSearchTermChange: ', value); // TODO: Call service
    };

    onTypesChange = types => {
        this.props.fetchObjectsByParams({ page: 1, types });
    };

    render() {
        return (
            <div>
                <Input
                    placeholder="Поиск"
                    prefix={<Icon type="search"/>}
                    onPressEnter={this.onSearchTermChange}
                    allowClear
                    className="okn-search-box"
                />

                <Select
                    mode="multiple"
                    placeholder="Тип"
                    showArrow={true}
                    onChange={this.onTypesChange}
                    className="okn-type-select"
                >
                    {this.renderSelectOptions()}
                </Select>
            </div>
        );
    }

    renderSelectOptions() {
        return OBJECT_OPTIONS.map(opt => <Option key={opt.value}>{opt.label}</Option>);
    }
}

const mapStateToProps = state => {
    const { objects, page, total } = state.list;

    return { objects, page, total };
};

export default connect(mapStateToProps, { fetchObjectsByParams })(List);