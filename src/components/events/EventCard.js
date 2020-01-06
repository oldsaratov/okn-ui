import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Button, Card, Collapse, Icon, Popconfirm, Typography } from 'antd';

import { deleteObjectEvent, updateObjectEvent } from '../../actions';
import { getActionStatus } from '../../selectors';
import EventFormModal from './EventFormModal';
import FileList from '../FileList';

import './EventCard.scss';

const { Panel } = Collapse;
const { Paragraph } = Typography;

class EventCard extends React.Component {
    state = {
        modalVisible: false,
        formEvent: {},
        selectedPhotoIndex: 0,
        lightboxVisible: false
    };

    onEditEvent = () => {
        this.setState({ formEvent: this.props.event });
        this.toggleModal(true);
    };

    onDeleteEvent = () => {
        this.props.deleteObjectEvent(this.props.objectId, this.props.event.id)
    };

    onFormChange = changedEventFields => {
        this.setState(({ formEvent }) => ({ formEvent: { ...formEvent, ...changedEventFields } }));
    };

    onFormSave = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, event) => {
            if (err) {
                return;
            }

            this.props.updateObjectEvent(this.props.objectId, { ...this.props.event, ...event });
        });
    };

    toggleModal = visible => {
        this.setState({ modalVisible: visible });
    };

    toggleLightbox = selectedPhotoIndex => {
        this.setState(state => ({
            lightboxVisible: !state.lightboxVisible,
            selectedPhotoIndex
        }));
    };

    editFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const { event } = this.props;
        const actions = this.props.isLoggedIn ? this.renderActions() : null;
        const last = event.last ? 'okn-event-card--last': '';
        const position = event.position ? `okn-event-card--${event.position}` : '';

        return (
            <Card
                className={`okn-event-card ${position} ${last}`}
                size="small"
                title={event.name}
                bordered={false}
                extra={<React.Fragment>{this.renderDate()} {actions}</React.Fragment>}
            >
                <Paragraph ellipsis={{ rows: 5, expandable: true }}>{event.description}</Paragraph>
                {this.renderPhotos(event.photos)}
                {this.renderFiles(event.files)}
            </Card>
        );
    };

    renderPhotos(photos) {
        const images = (photos || []).map(photo => ({
            id: photo.fileId,
            caption: photo.description,
            source: {
                regular: photo.url,
                thumbnail: `${photo.url}/-/scale_crop/180x180/smart/`
            }
        }));

        return (
            <Fragment>
                <div className="okn-event-card__gallery">
                    {images.map(({ id, source, description }, i) => (
                        <div className="okn-event-card__gallery__item" key={id} onClick={() => this.toggleLightbox(i)}>
                            <img alt={description} src={source.thumbnail}/>
                        </div>
                    ))}
                </div>

                <ModalGateway>
                    {this.state.lightboxVisible && (
                        <Modal onClose={this.toggleLightbox}>
                            <Carousel currentIndex={this.state.selectedPhotoIndex} views={images}/>
                        </Modal>
                    )}
                </ModalGateway>
            </Fragment>
        );
    }

    renderFiles(files) {
        if (Array.isArray(files) && files.length > 0) {
            return (
                <Collapse bordered={false} className="okn-event-card__files">
                    <Panel header="Файлы" key="1">
                        <FileList fileList={files}/>
                    </Panel>
                </Collapse>
            );
        }
    };

    renderActions() {
        return (
            <span className="okn-event-card__actions">
                <Button type="link" icon="edit" onClick={this.onEditEvent}/>

                <Popconfirm
                    title="Вы уверены что хотите удалить это событие?"
                    okText="Удалить"
                    okType="danger"
                    icon={<Icon type="warning" style={{ color: 'red' }}/>}
                    onConfirm={this.onDeleteEvent}
                >
                    <Button type="link" icon="delete" loading={this.props.deleteStatus.loading}/>
                </Popconfirm>

                {this.renderEditModal()}
            </span>
        );
    }

    renderDate() {
        return <span className="okn-event-card__date">{this.props.event.occuredAt.format('DD/MM/YYYY')}</span>;
    }

    renderEditModal() {
        const modal = (
            <EventFormModal
                wrappedComponentRef={this.editFormRef}
                visible={this.state.modalVisible}
                title="Редактирование события"
                okText="Сохранить"
                confirmLoading={this.props.updateStatus.loading}
                event={this.state.formEvent}
                onChange={this.onFormChange}
                onCancel={() => this.toggleModal(false)}
                onSave={this.onFormSave}
            />
        );

        return this.props.isLoggedIn && modal;
    }
}

const mapStateToProps = (state, props) => {
    return {
        updateStatus: getActionStatus(state, 'update', props.event.id),
        deleteStatus: getActionStatus(state, 'delete', props.event.id)
    };
};

export default connect(mapStateToProps, { deleteObjectEvent, updateObjectEvent })(EventCard);
