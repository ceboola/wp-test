import React, { Component } from 'react';
import { connect } from 'react-redux';

class Rehydrated extends Component {
    render() {
        return (
            <div className="rehydrated">
                {this.props.rehydrated ? this.props.children : <h2>load</h2>}
            </div>
        );
    }
}

export const Rehydrate =  connect(state => {
    return {
        rehydrated: state.rehydrate
    };
})(Rehydrated);
