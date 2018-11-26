import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import { register } from '../actions/authentication';

class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
            route: 'Login',
            username: '',
            password: ''
        };
    }

    register (e) {
        this.props.onRegister(this.state.username, this.state.password);
        e.preventDefault();
    }

    toggleRoute (e) {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    render () {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>{this.state.route}</Text>
                <TextInput
                    placeholder='Username'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })} />
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })} />
                <View style={{margin: 7}}/>
                <Button onPress={(e) => this.register(e)} title={this.state.route}/>
                <Text style={{fontSize: 16, color: 'blue'}} onPress={(e) => this.toggleRoute(e)}>{alt}</Text>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.authentication.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); },
        onRegister: (username, password) => { dispatch(register(username, password)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);