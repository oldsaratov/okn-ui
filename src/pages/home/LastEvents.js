import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Card, Col, Row } from 'antd';

import history from '../../history';
import { fetchLastEvents } from '../../actions';
import { DATE_FORMAT, OBJECT_TYPES } from '../../constants';
import ColorDot from '../../components/ColorDot';
import './LastEvents.scss';

const LastEvents = ({ objects, fetchLastEvents }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const isPortrait = useMediaQuery({ orientation: 'portrait' });
    const isLandscape = useMediaQuery({ orientation: 'landscape' });

    useEffect(() => {
        fetchLastEvents();
    }, [fetchLastEvents]);

    const goToObjectShow = id => {
        history.push(`/objects/${id}`);
    };

    const getLayout = (objects = []) => {
        let columns = [];
        let colSpan = null;

        if (isMobile && isPortrait) {
            columns = [objects];
            colSpan = 24;
        } else if (isMobile && isLandscape) {
            columns = [
                objects.slice(0, 6),
                objects.slice(6, 12)
            ];
            colSpan = 12;
        } else if (isTablet) {
            columns = [
                objects.slice(0, 4),
                objects.slice(4, 8),
                objects.slice(8, 12)
            ];
            colSpan = 8;
        } else {
            columns = [
                objects.slice(0, 3),
                objects.slice(3, 6),
                objects.slice(6, 9),
                objects.slice(9, 12)
            ];
            colSpan = 6;
        }

        return { columns, colSpan };
    }

    const renderCard = (object, i) => {
        const event = object.lastEvent;
        const objectType = object && object.type && OBJECT_TYPES[object.type];

        return (
            <Card
                key={i}
                size="small"
                hoverable
                className="okn-event"
                cover={renderCoverPhoto(object.mainPhoto)}
                onClick={() => goToObjectShow(object.id)}
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

    const renderCoverPhoto = (photo) => {
        return photo && photo.url && (
            <img
                title={photo.description}
                alt={photo.description}
                src={`${photo.url}-/scale_crop/350x180/smart/`}
            />
        );
    }

    const { columns, colSpan } = getLayout(objects);

    return (
        <div className="okn-last-events">
            <h2 className="okn-last-events__title">Последние события</h2>
            <Row gutter={20}>
                {columns.map((column, i) => (
                    <Col span={colSpan} gutter={16} key={i}>
                        {column.map((object, j) => renderCard(object, j))}
                    </Col>
                ))}
            </Row>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { objects } = state.lastEvents;

    return { objects };
};

export default connect(mapStateToProps, { fetchLastEvents })(LastEvents);
