import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Icon, Row, Spin, Tag } from 'antd';

import history from '../history';
import { fetchObject } from '../actions';
import ObjectEvents from '../components/events/Events';
import ObjectMainPhoto from '../components/object/ObjectMainPhoto';
import ObjectMap from '../components/object/ObjectMap';
import Gallery from '../components/Gallery';
import { getObjectType } from '../selectors';
import { authService } from '../services/auth.service';

import './ObjectShow.scss';

class ObjectShow extends Component {

    componentDidMount() {
        this.props.fetchObject(this.props.id);
    }

    render() {
        if (this.props.loading) {
            return this.renderLoading();
        }

        if (this.props.error) {
            return this.renderError();
        }

        const { id, object, hasEvents, type, isLoggedIn } = this.props;
        const images = (object.photos || []).map(photo => ({
            id: photo.fileId,
            caption: photo.description,
            source: {
                regular: photo.url,
                thumbnail: `${photo.url}/-/scale_crop/200x200/smart/`
            }
        }));

        return (
            <Fragment>
                <div className="okn-object">
                    <h1 className="okn-object__title">
                        {object.name}
                        {isLoggedIn && (
                            <div className="okn-object__title__edit-button">
                                <Button
                                    title="Редактировать"
                                    type="link"
                                    icon="edit"
                                    onClick={() => history.push(`/objects/edit/${id}`)}
                                />
                            </div>
                        )}
                    </h1>

                    <div className="okn-object__content">
                        <Row gutter={24}>
                            <Col span={12}>
                                <ObjectMainPhoto photo={object.mainPhoto} />
                                <Gallery images={images}/>
                            </Col>

                            <Col span={12}>
                                <p><Tag color={type.color}>{type.label}</Tag></p>
                                <p>{object.description}</p>
                            </Col>
                        </Row>

                        {object.coords && <ObjectMap coords={object.coords} color={type.color}/>}
                    </div>
                </div>

                <ObjectEvents isLoggedIn={this.props.isLoggedIn} objectId={id} hasEvents={hasEvents}/>
            </Fragment>
        );
    }

    renderLoading() {
        return (
            <div className="okn-empty-state">
                <Spin size="large"/>
            </div>
        );
    }

    renderError() {
        return (
            <div className="okn-empty-state">
                <h2>Что-то пошло не так <Icon type="frown"/></h2>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { model, loading, error } = state.object;

    return {
        id: ownProps.match.params.id,
        loading,
        error,
        isLoggedIn: authService.isLoggedIn(),
        object: model,
        hasEvents: model.eventsCount > 0,
        type: getObjectType(model.type) || {}
    };
};

export default connect(mapStateToProps, { fetchObject })(ObjectShow);
