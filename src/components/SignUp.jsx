import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {firebaseApp} from '../firebase';

class SignUp extends Component {
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

  signUp() {
    console.log('this.state SIGN UP===', this.state);
    const {email, password} = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log('ERROR===', error);
      this.setState({error});
    })
  }

  render(){
      return(
        <div className="form-imline sign-in-container">
          <h2>Sign Up</h2>
          <div className="form-group">
            <input
              className="form-coontrol"
              type="email"
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
              className="btn btn-primary"
              type="button"
              onClick={() => this.signUp()}>Sign Up</button>
          </div>
          <div>{this.state.error.message}</div>
          <div>
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
      )
    }
}

export default SignUp;
