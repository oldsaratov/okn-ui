import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';

import history from '../../history';
import { fetchLastEvents } from '../../actions';
import { DATE_FORMAT, OBJECT_TYPES } from '../../constants';
import ColorDot from '../../components/ColorDot';
import './LastEvents.scss';

class LastEvents extends Component {

    componentDidMount() {
        this.props.fetchLastEvents();
    }

    goToObjectShow = id => {
        history.push(`/objects/${id}`);
    };

    render() {
        const { objects } = this.props;
        const columns = [
            objects.slice(0, 3),
            objects.slice(3, 6),
            objects.slice(6, 9),
            objects.slice(9, 12)
        ];

        return (
            <div className="okn-last-events">
                <h2 className="okn-last-events__title">Последние события</h2>
                <Row gutter={20}>
                    {columns.map((column, i) => (
                        <Col span={6} gutter={16} key={i}>
                            {column.map((object, j) => this.renderCard(object, j))}
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }

    renderCard(object, i) {
        const event = object.lastEvent;
        const objectType = object && object.type && OBJECT_TYPES[object.type];

        return (
            <Card
                key={i}
                size="small"
                hoverable
                className="okn-event"
                cover={this.renderCoverPhoto(object.mainPhoto)}
                onClick={() => this.goToObjectShow(object.id)}
            >
                <div className="okn-event__title">
                    <ColorDot color={objectType.colorCode} tooltip={objectType.label}/>
                    <Link className="okn-event__object-name" to={`/objects/${object.id}`}>
                        {object.name}
                    </Link>
                </div>
                <div className="okn-event__name">{event.name}</div>
                <div className="okn-event__date">{event.occuredAt.format(DATE_FORMAT)}</div>
            </Card>
        );
    }

    renderCoverPhoto(photo) {
        return photo && photo.url && (
            <img
                title={photo.description}
                alt={photo.description}
                src={`${photo.url}-/scale_crop/350x180/smart/`}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { objects } = state.lastEvents;

    return { objects };
};

export default connect(mapStateToProps, { fetchLastEvents })(LastEvents);
