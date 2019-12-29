import React from 'react';
import { connect } from 'react-redux';

class ObjectShow extends React.Component {

    render() {
        return (
            <h2>{this.props.object.name}</h2>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { object: state.objects.all.find(object => object.id === ownProps.match.params.id) };
};

export default connect(mapStateToProps)(ObjectShow);
