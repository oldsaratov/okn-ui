import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Collapse, Icon, Popconfirm, Typography } from 'antd';

import { deleteObjectEvent, updateObjectEvent } from '../../actions';
import { getActionStatus } from '../../selectors';
import EventFormModal from './EventFormModal';
import FileList from '../FileList';
import Gallery from '../Gallery';

import './EventCard.scss';

const { Panel } = Collapse;
const { Paragraph } = Typography;

class EventCard extends React.Component {
    state = { modalVisible: false, formEvent: {} };

    onEditEvent = () => {
        this.setState({ formEvent: this.props.event });
        this.toggleModal(true);
    };

    onDeleteEvent = () => {
        this.props.deleteObjectEvent(this.props.objectId, this.props.event.id)
    };

    onFormChange = changedFields => {
        this.setState(({ formEvent }) => ({ formEvent: { ...formEvent, ...changedFields } }));
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

    editFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const { event } = this.props;
        const actions = this.props.editable ? this.renderActions() : null;
        const last = event.last ? 'okn-event-card--last': '';
        const position = event.position ? `okn-event-card--${event.position}` : '';

        return (
            <Card
                className={`okn-event-card ${position} ${last}`}
                size="small"
                title={this.renderTitle(event.name)}
                bordered={false}
                extra={actions}
            >
                <Paragraph ellipsis={{ rows: 5, expandable: true }}>{event.description}</Paragraph>
                {this.renderPhotos(event.photos)}
                {this.renderFiles(event.files)}
            </Card>
        );
    };

    renderTitle() {
        const { event } = this.props;

        return (
            <React.Fragment>
                <div className="okn-event-card__title">{event.name}</div>
                <span className="okn-event-card__date">{event.occuredAt.format('DD/MM/YYYY')}</span>
            </React.Fragment>
        );
    }

    renderPhotos(photos) {
        const images = (photos || []).map(photo => ({
            id: photo.fileId,
            caption: photo.description,
            source: {
                regular: photo.url,
                thumbnail: `${photo.url}-/scale_crop/180x180/smart/`
            }
        }));

        return <Gallery images={images}/>;
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
                <Button type="link" icon="edit" title="Редактировать" onClick={this.onEditEvent}/>

                <Popconfirm
                    title="Вы уверены что хотите удалить это событие?"
                    okText="Удалить"
                    okType="danger"
                    icon={<Icon type="warning" style={{ color: 'red' }}/>}
                    onConfirm={this.onDeleteEvent}
                >
                    <Button type="link" icon="delete" title="Удалить" loading={this.props.deleteStatus.loading}/>
                </Popconfirm>

                {this.renderEditModal()}
            </span>
        );
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

        return this.props.editable && modal;
    }
}

const mapStateToProps = (state, props) => {
    return {
        updateStatus: getActionStatus(state, 'update', props.event.id),
        deleteStatus: getActionStatus(state, 'delete', props.event.id)
    };
};

export default connect(mapStateToProps, { deleteObjectEvent, updateObjectEvent })(EventCard);
