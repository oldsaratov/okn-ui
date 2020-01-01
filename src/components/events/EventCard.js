import React from 'react';
import { Button, Card, Icon, Typography, Popconfirm } from 'antd';

const { Paragraph } = Typography;

class EventCard extends React.Component {

    render() {
        const { event } = this.props;

        return (
            <Card
                size="small"
                title={event.name}
                extra={this.props.isLoggedIn ? this.renderActions() : null}
                style={{ width: 400 }}
            >
                <Paragraph ellipsis={{ rows: 5, expandable: true }}>{event.description}</Paragraph>
            </Card>
        );
    };

    renderActions() {
        return (
            <div className="okn-event-card__actions">
                <Button type="link" icon="edit" onClick={() => this.props.onEdit()}/>

                <Popconfirm
                    title="Вы уверены что хотите удалить это событие?"
                    okText="Удалить"
                    okType="danger"
                    icon={<Icon type="warning" style={{ color: 'red' }}/>}
                    onConfirm={() => this.props.onDelete()}
                >
                    <Button type="link" icon="delete"/>
                </Popconfirm>
            </div>
        );
    }
}

export default EventCard;
