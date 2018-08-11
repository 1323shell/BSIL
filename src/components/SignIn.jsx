import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {firebaseApp} from '../firebase';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signIn() {
    console.log('this.state SIGN IN===', this.state);
    const {email, password} = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.log('ERROR===', error);
      this.setState({error});
    })
  }

  render(){
      return(
        <div className="form-imline sign-in-container">
          <h2>Sign In</h2>
          <div className="form-group">
            <input
              className="form-coontrol"
              type="email"
              autoComplete="true"
              placeholder="Email"
              onChange={e => {this.setState({email: e.target.value})}} />
          </div>
           <div className="form-group">
            <input
              className="form-coontrol"
              type="password"
              placeholder="password"
              onChange={e => {this.setState({password: e.target.value})}} />
           </div>
           <div className="form-group">
            <button
              className="btn btn-success"
              type="button"
              onClick={() => this.signIn()}>Sign In</button>
          </div>
          <div>{this.state.error.message}</div>
          <div>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )
    }
}

export default SignIn;
