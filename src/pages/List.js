import React from 'react';
import { Icon, Input, Select } from 'antd';

import { OBJECT_OPTIONS } from '../constants';
import './List.css';

const { Option } = Select;

class List extends React.Component {

    onSearchTermChange = ({ target: { value } }) => {
        console.log('onSearchTermChange: ', value); // TODO: Call service
    };

    onTypeChange = value => {
        console.log('onTypeChange: ', value); // TODO: Call service
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
                    onChange={this.onTypeChange}
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

export default List;