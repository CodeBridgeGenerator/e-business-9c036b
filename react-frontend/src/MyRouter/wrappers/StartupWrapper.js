import { useEffect } from 'react';
import { connect } from 'react-redux';

const StartupWrapper = (props) => {

    useEffect(() => {
        // runs once
        props.reAuth().catch((error) => {
            console.log('error', error);
        });
    }, []);

    return null;
};

const mapState = (state) => {
    const { isLoggedIn, user } = state.auth;
    return { isLoggedIn, user };
};
const mapDispatch = (dispatch) => ({
    reAuth: () => dispatch.auth.reAuth()
});

export default connect(mapState, mapDispatch)(StartupWrapper);
